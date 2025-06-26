<template>
  <dashboard :selected-item="menuElements[5]">
    <div :class="baseClass">
      <h1>
        {{
          isFormUser
            ? itemId
              ? t('dashboard.users.title.form.edit')
              : t('dashboard.users.title.form.create')
            : t('dashboard.users.title.list')
        }}
      </h1>
      <ui-button
        v-if="!isFormUser"
        @click="addUser"
        :text="t('dashboard.users.action.add')"
        icon="plus"
        :class="`${baseClass}__button`"
      />
      <ui-loading v-if="isLoading" />
      <ui-users-list v-else-if="!isFormUser" @edit="editUser" @delete="confirmDeleteUser" :users="users" />
      <ui-user-form @action="isFormUser = false" v-if="isFormUser" :item-to-edit="itemToEdit" />
      <ui-modal @close="showDeleteModal = false" :is-open="showDeleteModal">
        <div :class="`${baseClass}__modal`">
          <p :class="`${baseClass}__text ${baseClass}__text--title`">¿Estás seguro de que quieres eliminar este usuario?</p>
          <p :class="`${baseClass}__text ${baseClass}__text--warning`">Esta acción no se puede deshacer.</p>
          <div :class="`${baseClass}__actions`">
            <ui-button text="Confirmar" @click="deleteUser" />
            <ui-button text="Cancelar" @click="showDeleteModal = false" transparent />
          </div>
        </div>
      </ui-modal>
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import UiUserForm from '../../components/dashboard/users/ui-user-form.component.vue';
  import UiUsersList from '../../components/dashboard/users/ui-users-list.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';
  import UiLoading from '../../components/shared/ui-loading.component.vue';
  import UiModal from '../../components/shared/ui-modal.component.vue';

  import { useUserMenu, useUsers } from '../../composables';
  import { User } from '../../interfaces';
  import { userService } from '../../services';

  import Dashboard from './base-dashboard.view.vue';
  import { useI18n } from 'vue-i18n';

  const { menuElements } = useUserMenu();
  const { getUsers } = useUsers();
  const { t } = useI18n();
  const router = useRouter();

  const baseClass = 'users-management';

  const props = defineProps({
    action: {
      type: String,
      default: undefined
    },
    itemId: {
      type: String,
      default: undefined
    }
  });

  const users = ref<User[]>([]);
  const isLoading = ref(false);

  const showDeleteModal = ref(false);
  const userToDelete = ref<User | null>(null);

  const isFormUser = ref(!!props.action && !props.itemId);

  const itemToEdit = computed(() => users.value.find((user: User) => user._id === props.itemId));

  const addUser = () => {
    isFormUser.value = true;
    router.push({
      name: 'UsersManagement',
      params: { action: 'add' }
    });
  };

  const editUser = (item: User) => {
    isFormUser.value = true;
    router.push({
      name: 'UsersManagement',
      params: { action: 'edit', itemId: item._id }
    });
  };

  const confirmDeleteUser = (item: User) => {
    userToDelete.value = item;
    showDeleteModal.value = true;
  };

  const deleteUser = async () => {
    if (!userToDelete.value) return;
    isLoading.value = true;
    await userService.deleteUser(userToDelete.value._id ?? '');
    users.value = await getUsers();
    isLoading.value = false;
    showDeleteModal.value = false;
    userToDelete.value = null;
  };

  watch(
    () => [props.action, props.itemId],
    () => {
      if (!props.action && !props.itemId) {
        isFormUser.value = false;
      }
    },
    { immediate: true }
  );

  onMounted(async () => {
    isLoading.value = true;
    users.value = await getUsers();
    isLoading.value = false;
  });
</script>

<style lang="scss" scoped>
  .users-management {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    width: 100%;

    &__button {
      align-self: flex-end;
      width: fit-content;
      margin: 1rem 0;
    }

    &__modal {
      padding: 4rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }

    &__text {
      &--title { 
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      &--warning {  
        color: #555;
        font-size: 1rem;
        margin-bottom: 1rem;
      }
    }

    &__actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      width: 100%;
    }
  }
</style>
