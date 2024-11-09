import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { MenuItem, User } from '../interfaces';

export function useUserMenu() {
  const { t } = useI18n();

  const userStore = localStorage.getItem('user');

  const user = ref<User>(userStore ? JSON.parse(userStore) : undefined);

  const menuElements: MenuItem[] =
    user.value.type !== 'admin'
      ? [
          {
            id: 1,
            label: t('asides.user.menu.items.general.personalData.label'),
            description: t('asides.user.menu..items.general.personalData.description')
          },
          {
            id: 2,
            label: t('asides.user.menu.items.client.cart.label'),
            description: t('asides.user.menu.items.client.cart.description')
          },
          {
            id: 3,
            label: t('asides.user.menu.items.client.orders.label'),
            description: t('asides.user.menu.items.client.orders.description')
          },
          {
            id: 4,
            label: t('asides.user.menu.items.client.whistList.label'),
            description: t('asides.user.menu.items.client.whistList.description')
          }
        ]
      : [
          {
            id: 1,
            label: t('asides.user.menu.items.general.personalData.label'),
            description: t('asides.user.menu.items.general.personalData.description')
          },
          {
            id: 2,
            label: t('asides.user.menu.items.admin.productsManagement.label'),
            description: t('asides.user.menu.items.admin.productsManagement.description')
          },
          {
            id: 3,
            label: t('asides.user.menu.items.admin.stockManagement.label'),
            description: t('asides.user.menu.items.admin.stockManagement.description')
          },
          {
            id: 4,
            label: t('asides.user.menu.items.admin.ordersManagement.label'),
            description: t('asides.user.menu.items.admin.ordersManagement.description')
          },
          {
            id: 5,
            label: t('asides.user.menu.items.admin.personalization.label'),
            description: t('asides.user.menu.items.admin.personalization.description')
          },
          {
            id: 6,
            label: t('asides.user.menu.items.admin.dataAnalytics.label'),
            description: t('asides.user.menu.items.admin.dataAnalytics.description')
          }
        ];

  return {
    user,
    menuElements
  };
}
