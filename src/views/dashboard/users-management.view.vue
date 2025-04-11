<template>
  <dashboard :selected-item="menuElements[3]">
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
      <ui-users-list v-else-if="!isFormUser" @edit="editUser" @delete="deleteUser" :users="users" />
      <ui-user-form @action="isFormUser = false" v-if="isFormUser" :item-to-edit="itemToEdit" />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import UiUserForm from '../../components/dashboard/users/ui-user-form.component.vue';
  import UiUsersList from '../../components/dashboard/users/ui-users-list.component.vue';
  import UiButton from '../../components/shared/ui-button.component.vue';
  import UiLoading from '../../components/shared/ui-loading.vue';

  import { useUserMenu, useUsers } from '../../composables';
  import { User } from '../../interfaces';
  import { userService } from '../../services';

  import Dashboard from './dashboard.view.vue';
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

  const deleteUser = async (item: User) => {
    isLoading.value = true;
    await userService.deleteUser(item._id ?? '');
    users.value = await getUsers();
    isLoading.value = false;
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
  }
</style>
