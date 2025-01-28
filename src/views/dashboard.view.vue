<template>
  <div :class="baseClass" v-if="user">
    <div :class="`${baseClass}__aside`">
      <dashboard-menu-aside @clickItem="changeSection($event)" :selected-item="selectedItem" />
    </div>
    <div :class="`${baseClass}__content`">
      <personal-data v-if="selectedItem.id === 0" />
      <empty-product-view
        v-else-if="user.type !== 'admin' && (selectedItem.id === 1 || selectedItem.id === 2)"
        :selected-item="selectedItem"
        :class="`${baseClass}__wrapper`"
      />
      <base-wrapper v-else :class="`${baseClass}__wrapper`">
        <products-management v-if="user.type === 'admin' && selectedItem.id === 1" />
      </base-wrapper>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { BaseWrapper, DashboardMenuAside, EmptyProductView, PersonalData } from '../components';
  import { useCurrentUser, useUserMenu } from '../composables';

  import { ProductsManagement } from './dashboard';

  const props = defineProps({
    index: {
      type: String,
      default: undefined
    }
  });

  const baseClass = 'dashboard';

  const { user } = useCurrentUser();
  const { menuElements, changeMenuSection } = useUserMenu();

  const selectedItem = ref(
    props.index ? menuElements[Number.parseInt(props.index)] : menuElements[0]
  );

  const changeSection = (event: any) => {
    selectedItem.value = event;
    changeMenuSection(selectedItem.value);
  };
</script>

<style lang="scss" scoped>
  .dashboard {
    display: flex;
    justify-content: flex-end;
    background-color: var(--color-border-primary);
    height: 100vh;

    &__content {
      height: 100vh;
      width: calc(100% - 400px);
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1rem;
      height: 95vh;
    }
  }
</style>
