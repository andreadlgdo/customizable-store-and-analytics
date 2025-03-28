<template>
  <dashboard :selected-item="menuElements[2]">
    <div :class="baseClass">
      <h1 v-if="!itemId" :class="`${baseClass}__title`">{{ t('dashboard.orders.title') }}</h1>
      <ui-orders-list v-if="!itemId" @seeDetails="seeOrderDetails" :orders="orders" />
      <ui-orders-details
        v-else
        @cancel="closeDetails"
        :item="orders.find((o: Order) => o._id === itemId)"
      />
    </div>
  </dashboard>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import UiOrdersDetails from '../../components/dashboard/orders/ui-orders-details.component.vue';
  import UiOrdersList from '../../components/dashboard/orders/ui-orders-list.component.vue';

  import { useUserMenu, useUsers } from '../../composables';
  import { Order } from '../../interfaces';
  import { orderService } from '../../services';

  import Dashboard from './dashboard.view.vue';

  const baseClass = 'orders-management';

  defineProps({
    itemId: {
      type: String,
      default: undefined
    }
  });

  const { menuElements } = useUserMenu();
  const { user } = useUsers();
  const { t } = useI18n();
  const router = useRouter();

  const orders = ref<Order[]>([]);

  const seeOrderDetails = (item: Order) => {
    router.push({
      name: 'OrdersManagement',
      params: { itemId: item._id }
    });
  };

  const closeDetails = () => {
    router.push({
      name: 'OrdersManagement'
    });
  };

  onMounted(async () => {
    if (user.value && user.value.type === 'admin') {
      orders.value = await orderService.getOrders();
    } else {
      orders.value = await orderService.findOrderByUserId(user.value?._id ?? '');
    }
  });
</script>

<style lang="scss" scoped>
  .orders-management {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    width: 100%;

    &__title {
      margin: 1rem 0;
    }
  }
</style>
