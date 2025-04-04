import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { MenuItem } from '../interfaces';

import { useCurrentUser } from './use-current-user';

export function useUserMenu() {
  const { t } = useI18n();

  const { user } = useCurrentUser();

  const router = useRouter();

  const menuElements: MenuItem[] =
    user.value?.type !== 'admin'
      ? [
          {
            id: 0,
            label: t('menus.user.items.general.personalData'),
            icon: 'edit_user',
            route: {
              name: 'PersonalData'
            }
          },
          {
            id: 1,
            label: t('menus.user.items.client.cart'),
            icon: 'shoppingCart',
            route: {
              name: 'UserCart'
            }
          },
          {
            id: 2,
            label: t('menus.user.items.client.whistList'),
            icon: 'heart',
            route: {
              name: 'UserWhistList'
            }
          },
          {
            id: 3,
            label: t('menus.user.items.client.orders'),
            icon: 'pack',
            route: {
              name: 'OrdersManagement'
            }
          }
        ]
      : [
          {
            id: 0,
            label: t('menus.user.items.general.personalData'),
            icon: 'edit_user',
            route: {
              name: 'PersonalData'
            }
          },
          {
            id: 1,
            label: t('menus.user.items.admin.productsManagement'),
            icon: 'shoppingCart',
            route: {
              name: 'ProductsManagement'
            }
          },
          {
            id: 2,
            label: t('menus.user.items.admin.ordersManagement'),
            icon: 'pack',
            route: {
              name: 'OrdersManagement'
            }
          },
          {
            id: 3,
            label: t('menus.user.items.admin.userManagement'),
            icon: 'user',
            route: {
              name: 'UsersManagement'
            }
          },
          {
            id: 4,
            label: t('menus.user.items.admin.personalization'),
            icon: 'personalization',
            route: {
              name: 'Personalization'
            }
          },
          {
            id: 5,
            label: t('menus.user.items.admin.dataAnalytics'),
            icon: 'analytics',
            route: {
              name: 'Analytics'
            }
          }
        ];

  const changeMenuSection = (itemMenu: MenuItem) => {
    const dahsboardRoute = router.resolve({
      name: itemMenu.route?.name ?? 'Dashboard'
    });
    window.open(dahsboardRoute.href, '_blank');
  };

  return {
    menuElements,
    changeMenuSection
  };
}
