<template>
  <section :class="baseClass">
    <div :class="`${baseClass}__wrapper`">
      <h1>{{ t('dashboard.personalData.address.title') }}</h1>
      <UiButton
        v-if="!updateMode"
        @click="updateMode = true"
        :text="t('dashboard.personalData.address.action.add')"
        icon="plus"
        :class="`${baseClass}__button`"
      />
    </div>
    <UiAddressForm
      v-if="updateMode"
      @add="add"
      @edit="edit"
      @cancel="cancel"
      :user-id="userId"
      :address="addressToEdit"
    />
    <UiAddress
      v-if="addresses.length"
      @edit="editAddress"
      @delete="deleteAddress"
      @setDefault="setDefault"
      :addresses="addresses"
    />
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { Address } from '../../../interfaces';
  import { addressService } from '../../../services';

  import UiAddressForm from '../../dashboard/personal-data/ui-address-form.component.vue';
  import UiAddress from '../../dashboard/personal-data/ui-address.component.vue';

  import UiButton from '../../shared/ui-button.component.vue';

  const baseClass = 'ui-address-section';

  const { t } = useI18n();

  const props = defineProps({
    userId: {
      type: String,
      required: true
    }
  });

  const updateMode = ref(false);

  const addresses = ref<Address[]>([]);
  const addressToEdit = ref<Address | undefined>(undefined);

  const add = async (newAddress: Address) => {
    if (!addresses.value.length) {
      newAddress.isDefault = true;
    }
    const address = await addressService.createAddress(newAddress);
    addresses.value.push(address);
    updateMode.value = false;
  };

  const edit = async (newAddress: Address) => {
    const address = await addressService.updateAddress(newAddress);
    const index = addresses.value.findIndex(a => a._id === address._id);
    if (index !== -1) {
      addresses.value.splice(index, 1, address);
    }
    updateMode.value = false;
  };

  const cancel = async () => {
    if (addressToEdit.value) {
      addresses.value = await addressService.findAddressByUserId(props.userId);
      addressToEdit.value = undefined;
    }
    updateMode.value = false;
  };

  const setDefault = async (defaultAddress: Address) => {
    addresses.value = addresses.value.map(address => {
      const updateAdress = {
        ...address,
        isDefault: address._id === defaultAddress._id
      };

      addressService.updateAddress(updateAdress);

      return updateAdress;
    });
  };

  const editAddress = async (address: Address) => {
    addressToEdit.value = address;
    updateMode.value = true;
  };

  const deleteAddress = async (address: Address) => {
    await addressService.deleteAddress(address._id ?? '');
    addresses.value = await addressService.findAddressByUserId(props.userId);
    if (addresses.value.length && !addresses.value.some(a => a.isDefault)) {
      addresses.value[0].isDefault = true;
      await addressService.updateAddress(addresses.value[0]);
    }
  };

  onMounted(async () => (addresses.value = await addressService.findAddressByUserId(props.userId)));
</script>

<style lang="scss" scoped>
  .ui-address-section {
    &__wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    &__button {
      display: flex;
      gap: 1rem;
      justify-self: flex-end;
    }
  }
</style>
