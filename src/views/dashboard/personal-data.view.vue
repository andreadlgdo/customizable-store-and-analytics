<template>
  <dashboard :selected-item="menuElements[0]">
    <div :class="baseClass">
      <section :class="`${baseClass}__section`">
        <h1 :class="`${baseClass}__text ${baseClass}__text--title`">
          {{ t('dashboard.personalData.user.title') }}
        </h1>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
          <ui-image
            @upload="changeImage"
            :image="newUser.imageUrl"
            :upload-mode="updateMode"
            size="small"
          />
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--user`">
            <p :class="`${baseClass}__text ${baseClass}__text--name`">
              {{ user.name + ' ' + user.surname }}
            </p>
            <p :class="`${baseClass}__text ${baseClass}__text--email`">{{ user.email }}</p>
          </div>
        </div>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--form`">
          <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--header`">
            <ui-textbox
              @input="value => (newUser.name = value)"
              :label="t('dashboard.personalData.user.label.name')"
              :value="newUser.name"
              :disabled="!updateMode"
            />
            <ui-textbox
              @input="value => (newUser.surname = value)"
              :label="t('dashboard.personalData.user.label.surname')"
              :value="newUser.surname"
              :disabled="!updateMode"
            />
          </div>
          <ui-textbox
            @input="value => (newUser.email = value)"
            :label="t('dashboard.personalData.user.label.email')"
            :value="newUser.email"
            :disabled="!updateMode"
          />
        </div>
        <div :class="`${baseClass}__button`">
          <ui-button
            v-if="updateMode"
            @click="updateData"
            :text="t('dashboard.action.save')"
            icon="edit"
            :disabled="!isValid"
          />
          <ui-button
            @click="action"
            :text="updateMode ? t('dashboard.action.cancel') : t('dashboard.action.edit')"
            :icon="updateMode ? 'close' : 'edit'"
            transparent
          />
        </div>
      </section>
      <section>
        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--address`">
          <h1>{{ t('dashboard.personalData.address.title') }}</h1>
          <ui-button
            v-if="!updateModeAddress"
            @click="updateModeAddress = true"
            :text="t('dashboard.personalData.address.action.add')"
            icon="plus"
            :class="`${baseClass}__button`"
          />
        </div>
        <ui-address-form
          v-if="updateModeAddress"
          @add="add"
          @edit="edit"
          @cancel="cancel"
          :user-id="user._id ?? ''"
          :address="addressToEdit"
        />
        <ui-address
          v-if="addresses.length"
          @edit="editAddress"
          @delete="deleteAddress"
          @setDefault="setDefault"
          :addresses="addresses"
        />
      </section>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  import UiAddress from '../../components/dashboard/personal-data/ui-address.component.vue';
  import UiAddressForm from '../../components/dashboard/personal-data/ui-address-form.component.vue';

  import UiImage from '../../components/shared/ui-image.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';
  import UiTextbox from '../../components/shared/ui-textbox.component.vue';

  import { Address } from '../../interfaces/address';

  import { useCurrentUser, useUserMenu, useValidations } from '../../composables';
  import { addressService, imageService, userService } from '../../services';

  import Dashboard from './dashboard.view.vue';

  const { menuElements } = useUserMenu();
  const { user } = useCurrentUser();
  const { validEmail } = useValidations();
  const { t } = useI18n();

  const baseClass = 'personal-data';

  const updateMode = ref(false);
  const updateModeAddress = ref(false);

  const isValid = computed(() => validEmail(user.value.email));

  const newUser = ref({ ...user.value });
  const addressToEdit = ref<Address | undefined>(undefined);

  const addresses = ref<Address[]>([]);

  const action = () => {
    if (updateMode.value) {
      newUser.value = { ...user.value };
    }
    updateMode.value = !updateMode.value;
  };

  const changeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      return alert('Por favor selecciona una imagen primero');
    }

    try {
      const date = new Date();
      const formData = new FormData();
      const imageName = newUser.value._id ? newUser.value._id + date.getTime() : 'undefined';

      formData.append('image', selectedFile);
      formData.append('routeImage', `profiles/${imageName}`);

      const imageUrl = await imageService.addImage(formData);

      if (imageUrl) {
        newUser.value.imageUrl = imageUrl;
      }
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
    }
  };

  const updateData = async () => {
    const response = await userService.updateUser(newUser.value);
    localStorage.setItem('user', JSON.stringify(response.user));
    window.location.reload();
  };

  const add = async (newAddress: Address) => {
    if (!addresses.value.length) {
      newAddress.isDefault = true;
    }
    const address = await addressService.createAddress(newAddress);
    addresses.value.push(address);
    updateModeAddress.value = false;
  };

  const edit = async (newAddress: Address) => {
    const address = await addressService.updateAddress(newAddress);
    const index = addresses.value.findIndex(a => a._id === address._id);
    if (index !== -1) {
      addresses.value.splice(index, 1, address);
    }
    updateModeAddress.value = false;
  };

  const cancel = async () => {
    if (addressToEdit.value) {
      addresses.value = await addressService.findAddressByUserId(user.value._id ?? '');
      addressToEdit.value = undefined;
    }
    updateModeAddress.value = false;
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
    updateModeAddress.value = true;
  };

  const deleteAddress = async (address: Address) => {
    await addressService.deleteAddress(address._id ?? '');
    addresses.value = await addressService.findAddressByUserId(user.value._id ?? '');
  };

  onMounted(
    async () => (addresses.value = await addressService.findAddressByUserId(user.value._id ?? ''))
  );
</script>

<style lang="scss" scoped>
  .personal-data {
    margin: 2rem;
    width: 100%;
    overflow-y: scroll;

    &__section {
      border: 1px solid var(--color-dark-primary);
      border-radius: 16px;
      padding: 2rem;
      height: fit-content;
      margin-bottom: 1rem;
    }

    &__wrapper {
      display: flex;

      &--header {
        align-items: center;
        gap: 1rem;
      }

      &--user {
        flex-direction: column;
        gap: 0.5rem;
      }

      &--form {
        flex-direction: column;
        gap: 1rem;
        margin: 24px 0;
      }

      &--address {
        justify-content: space-between;
        margin-bottom: 1rem;
      }
    }

    &__text {
      &--title {
        margin: 0 0 16px 0;
      }

      &--name {
        font-weight: bold;
        font-size: 18px;
      }

      &--email {
        font-size: 16px;
      }
    }

    &__button {
      display: flex;
      gap: 1rem;
      justify-self: flex-end;
    }
  }
</style>
