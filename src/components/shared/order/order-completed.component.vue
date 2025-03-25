<template>
  <div :class="baseClass">
    <h1>{{ t('order.completed.title') }}</h1>
    <div>
      <UiButton
        @click="router.push('/')"
        :text="t('order.completed.action.shop')"
        :class="`${baseClass}__button`"
      />
      <UiButton
        v-if="user"
        @click="router.push({ name: 'OrdersManagement' })"
        :text="t('order.completed.action.orders')"
        :class="`${baseClass}__button`"
        transparent
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  import { useUsers } from '../../../composables';

  import UiButton from '../ui-button.component.vue';

  const baseClass = 'order-completed';

  const { t } = useI18n();
  const router = useRouter();
  const { user } = useUsers();
</script>

<style lang="scss" scoped>
  .order-completed {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    height: 100%;

    &__button {
      width: 250px;
      margin-bottom: 1rem;
    }
  }
</style>
