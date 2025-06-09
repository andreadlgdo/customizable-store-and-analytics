import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { MenuItem } from '../interfaces';

import { useUsers } from './use-users';

const getCommonMenuItems = (t: (key: string) => string): MenuItem[] => [
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
  }
];

const getAdminMenuItems = (t: (key: string) => string): MenuItem[] => [
  {
    id: 3,
    label: t('menus.user.items.admin.productsManagement'),
    icon: 'products',
    route: {
      name: 'ProductsManagement'
    }
  },
  {
    id: 4,
    label: t('menus.user.items.admin.ordersManagement'),
    icon: 'pack',
    route: {
      name: 'OrdersManagement'
    }
  },
  {
    id: 5,
    label: t('menus.user.items.admin.userManagement'),
    icon: 'user',
    route: {
      name: 'UsersManagement'
    }
  },
  {
    id: 6,
    label: t('menus.user.items.admin.personalization'),
    icon: 'personalization',
    route: {
      name: 'Personalization'
    }
  },
  {
    id: 7,
    label: t('menus.user.items.admin.dataAnalytics'),
    icon: 'analytics',
    route: {
      name: 'Analytics'
    }
  }
];

export function useUserMenu() {
  const { t } = useI18n();

  const { user } = useUsers();

  const router = useRouter();

  const menuElements: MenuItem[] = [
    ...getCommonMenuItems(t),
    ...(user.value?.type === 'client' ? [{
      id: 3,
      label: 'Mis pedidos',
      icon: 'pack',
      route: {
        name: 'OrdersManagement'
      }
    }] : []),
    ...(user.value?.type === 'admin' ? getAdminMenuItems(t) : [])
  ];

  const navigateToMenuSection = (menuItem: MenuItem): void => {
    if (!menuItem.route?.name) return;
    
    const route = router.resolve({
      name: menuItem.route.name
    });
    window.open(route.href, '_blank');
  };

  return {
    menuElements,
    navigateToMenuSection
  };
}
