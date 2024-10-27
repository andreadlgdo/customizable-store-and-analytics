import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { MenuItem } from '../interfaces';

export function useUserMenu() {
  const { t } = useI18n();

  const userStore = localStorage.getItem('user');

  const user = ref(userStore ? JSON.parse(userStore) : undefined);

  const menuElements: MenuItem[] =
    user.value.type !== 'admin'
      ? [
          {
            label: t('userAsides.userMenu.items.general.personalData.label'),
            description: t('userAsides.userMenu.items.general.personalData.description')
          },
          {
            label: t('userAsides.userMenu.items.client.cart.label'),
            description: t('userAsides.userMenu.items.client.cart.description')
          },
          {
            label: t('userAsides.userMenu.items.client.orders.label'),
            description: t('userAsides.userMenu.items.client.orders.description')
          },
          {
            label: t('userAsides.userMenu.items.client.whistList.label'),
            description: t('userAsides.userMenu.items.client.whistList.description')
          }
        ]
      : [
          {
            label: t('userAsides.userMenu.items.general.personalData.label'),
            description: t('userAsides.userMenu.items.general.personalData.description')
          },
          {
            label: t('userAsides.userMenu.items.admin.productsManagement.label'),
            description: t('userAsides.userMenu.items.admin.productsManagement.description')
          },
          {
            label: t('userAsides.userMenu.items.admin.stockManagement.label'),
            description: t('userAsides.userMenu.items.admin.stockManagement.description')
          },
          {
            label: t('userAsides.userMenu.items.admin.ordersManagement.label'),
            description: t('userAsides.userMenu.items.admin.ordersManagement.description')
          },
          {
            label: t('userAsides.userMenu.items.admin.personalization.label'),
            description: t('userAsides.userMenu.items.admin.personalization.description')
          },
          {
            label: t('userAsides.userMenu.items.admin.dataAnalytics.label'),
            description: t('userAsides.userMenu.items.admin.dataAnalytics.description')
          }
        ];

  return {
    menuElements
  };
}
