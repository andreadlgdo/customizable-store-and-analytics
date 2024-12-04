import { useI18n } from 'vue-i18n';

import { MenuItem } from '../interfaces';

import { useCurrentUser } from './use-current-user';

export function useUserMenu() {
  const { t } = useI18n();

  const { user } = useCurrentUser();

  const menuElements: MenuItem[] =
    user.value.type !== 'admin'
      ? [
          {
            id: 1,
            label: t('asides.user.menu.items.general.personalData'),
            icon: 'edit_user'
          },
          {
            id: 2,
            label: t('asides.user.menu.items.client.cart'),
            icon: 'shoppingCart'
          },
          {
            id: 3,
            label: t('asides.user.menu.items.client.whistList'),
            icon: 'heart'
          },
          {
            id: 4,
            label: t('asides.user.menu.items.client.orders'),
            icon: 'pack'
          }
        ]
      : [
          {
            id: 1,
            label: t('asides.user.menu.items.general.personalData'),
            icon: 'edit_user'
          },
          {
            id: 2,
            label: t('asides.user.menu.items.admin.productsManagement'),
            icon: 'shoppingCart'
          },
          {
            id: 3,
            label: t('asides.user.menu.items.admin.ordersManagement'),
            icon: 'pack'
          },
          {
            id: 3,
            label: t('asides.user.menu.items.admin.userManagement'),
            icon: 'user'
          },
          {
            id: 5,
            label: t('asides.user.menu.items.admin.personalization'),
            icon: 'personalization'
          },
          {
            id: 6,
            label: t('asides.user.menu.items.admin.dataAnalytics'),
            icon: 'analytics'
          }
        ];

  return {
    menuElements
  };
}
