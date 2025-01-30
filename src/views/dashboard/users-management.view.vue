<template>
  <dashboard :class="baseClass" index="3">
    <base-text tag="h3">
      {{
        formProduct
          ? userToEdit
            ? t('dashboard.users.title.form.edit')
            : t('dashboard.users.title.form.create')
          : t('dashboard.users.title.list')
      }}
    </base-text>
    <section :class="`${baseClass}__section`">
      <div v-if="!formProduct" :class="`${baseClass}__wrapper ${baseClass}__wrapper--list`">
        <base-button
          @click="addUser"
          icon="plus"
          :text="t('dashboard.users.action.add')"
          color="primary"
          :class="`${baseClass}__button`"
        />
        <users-table
          @delete="item => deleteUser(item)"
          @edit="item => editUser(item)"
          :users="users"
        />
      </div>
      <div v-else :class="`${baseClass}__wrapper ${baseClass}__wrapper--add`">
        <user-form @action="closeForm" :item-to-edit="userToEdit" />
      </div>
    </section>
  </dashboard>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import { BaseButton, BaseText, UserForm, UsersTable } from '../../components';
  import { useUsers } from '../../composables';
  import { User } from '../../interfaces';

  import Dashboard from '../dashboard.view.vue';

  const { t } = useI18n();
  const router = useRouter();

  const { getUsers } = useUsers();

  const baseClass = 'products-management';

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

  const formProduct = ref(!!props.action && !props.itemId);

  const users = ref<User[]>([]);
  const userToEdit = ref<User | undefined>(undefined);

  const addUser = () => {
    formProduct.value = true;
    userToEdit.value = undefined;
    router.push({
      name: 'UserDashboard',
      params: { action: 'add' }
    });
  };

  const editUser = (item: User) => {
    userToEdit.value = item;
    formProduct.value = true;
    router.push({
      name: 'UserDashboard',
      params: { action: 'edit', itemId: item._id }
    });
  };

  const deleteUser = async (item: User) => {
    console.log('item', item);
    users.value = await getUsers();
  };

  const closeForm = async () => {
    await router.push({
      name: 'UserDashboard'
    });
    formProduct.value = false;
    window.location.reload();
  };

  watch(
    () => props.itemId,
    async () => {
      users.value = await getUsers();
      formProduct.value = !!props.action;
      userToEdit.value = props.itemId
        ? users.value.find((product: User) => product._id === props.itemId)
        : undefined;
    },
    { immediate: true }
  );

  onMounted(async () => {
    users.value = await getUsers();
  });
</script>

<style lang="scss" scoped>
  .products-management {
    position: relative;

    &__section {
      height: 100%;
      overflow: hidden;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;

      &--add {
        position: relative;
        gap: 1rem;
      }
    }

    &__button {
      margin-bottom: 1rem;
      align-self: flex-end;
    }
  }
</style>
