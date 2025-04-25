<template>
  <div :class="baseClass">
    <div v-if="user && addresses?.length">
      <UiToggle @click="selectToggle" :options="options" :class="`${baseClass}__toggle`" />
      <UiAddress
        v-if="options[0].selected"
        @select="selectAddress"
        @setDefault="setDefault"
        :addresses="addresses"
        selectable
        :editable="false"
      />
    </div>
    <div v-if="options[1].selected" :class="`${baseClass}__wrapper ${baseClass}__wrapper--column`">
      <UiTextbox
        @input="value => (newAddress.street = value)"
        :label="t('dashboard.personalData.address.label.street')"
        :value="newAddress.street"
      />
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <UiTextbox
          @input="value => (newAddress.number = value)"
          :label="t('dashboard.personalData.address.label.number')"
          :value="newAddress.number"
        />
        <UiTextbox
          @input="value => (newAddress.letter = value)"
          :label="t('dashboard.personalData.address.label.letter')"
          :value="newAddress.letter"
        />
        <UiTextbox
          @input="value => (newAddress.zipCode = value)"
          :label="t('dashboard.personalData.address.label.zipCode')"
          :value="newAddress.zipCode"
        />
      </div>
      <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--row`">
        <UiTextbox
          @input="value => (newAddress.city = value)"
          :label="t('dashboard.personalData.address.label.city')"
          :value="newAddress.city"
        />
        <UiTextbox
          @input="value => (newAddress.country = value)"
          :label="t('dashboard.personalData.address.label.country')"
          :value="newAddress.country"
        />
      </div>
    </div>
  </div>
  <div :class="`${baseClass}__footer`">
    <UiButton
      @click="$emit('back')"
      :text="t('order.action.back')"
      :class="`${baseClass}__button`"
      transparent
    />
    <UiButton
      @click="$emit('continue', options[1].selected ? newAddress : addresses.find(a => a.selected))"
      :text="t('order.action.continue')"
      :class="`${baseClass}__button`"
      :disabled="!isValid"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import UiAddress from '../../dashboard/personal-data/ui-address.component.vue';

  import { useUsers } from '../../../composables';
  import { Address } from '../../../interfaces';
  import { addressService } from '../../../services';

  import UiButton from '../ui-button.component.vue';
  import UiTextbox from '../ui-textbox.component.vue';
  import UiToggle from '../ui-toggle.component.vue';

  const baseClass = 'order-shipping';

  const props = defineProps({
    address: {
      type: Object as () => Address,
      default: undefined
    },
    isFirstSelected: {
      type: Boolean,
      default: true
    }
  });

  defineEmits(['back', 'continue']);

  const { user } = useUsers();
  const { t } = useI18n();

  const addresses = ref();
  const newAddress = ref<Address>(
    props.address && !props.address._id
      ? props.address
      : {
          userId: user.value?._id ?? '',
          street: '',
          number: '',
          letter: '',
          zipCode: '',
          city: '',
          country: '',
          label: '',
          isDefault: false
        }
  );

  const options = ref([
    {
      label: t('order.address.toggle.first'),
      selected: props.isFirstSelected && !!user.value && !!addresses.value?.length
    },
    {
      label: t('order.address.toggle.second'),
      selected: !props.isFirstSelected || !user.value || !addresses.value?.length
    }
  ]);

  const isValid = computed(() => {
    return (
      (options.value[1].selected &&
        newAddress.value.street &&
        newAddress.value.number &&
        newAddress.value.zipCode &&
        newAddress.value.city &&
        newAddress.value.country) ||
      (options.value[0].selected && addresses.value?.length)
    );
  });

  const selectToggle = (option: { label: string; selected: boolean }) => {
    options.value = options.value.map(item => ({ ...item, selected: item.label === option.label }));
  };

  const selectAddress = (selectedAddress: Address) => {
    addresses.value = addresses.value.map((address: Address) => {
      return {
        ...address,
        selected: address._id === selectedAddress._id
      };
    });
  };

  const setDefault = async (defaultAddress: Address) => {
    addresses.value = addresses.value.map((address: Address) => {
      const updateAdress = {
        ...address,
        isDefault: address._id === defaultAddress._id
      };

      addressService.updateAddress(updateAdress);

      return updateAdress;
    });
  };

  onMounted(async () => {
    if (user.value?._id) {
      const userAdresses = await addressService.findAddressByUserId(user.value._id);
      addresses.value = userAdresses?.map((address: Address, index: number) => ({
        ...address,
        selected:
          props.address && props.address._id ? props.address._id === address._id : index === 0
      }));
      options.value = [
        {
          label: t('order.address.toggle.first'),
          selected: props.isFirstSelected && !!user.value && !!addresses.value?.length
        },
        {
          label: t('order.address.toggle.second'),
          selected: !props.isFirstSelected || !user.value || !addresses.value?.length
        }
      ];
    }
  });
</script>

<style lang="scss" scoped>
  .order-shipping {
    position: relative;
    max-height: 32rem;
    overflow-y: scroll;

    &__footer {
      position: absolute;
      bottom: 24px;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      width: 100%;
    }

    &__text {
      font-weight: bold;
      margin-bottom: 1rem;
    }

    &__toggle {
      margin-bottom: 1rem;
    }

    &__wrapper {
      display: flex;
      gap: 1rem;

      &--column {
        flex-direction: column;
        margin: 24px 0;
      }

      &--row {
        align-items: center;
      }
    }

    &__button {
      width: 134px;
    }
  }
</style>
