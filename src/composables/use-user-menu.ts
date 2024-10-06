import { useI18n } from 'vue-i18n';

import { User } from '../interfaces/user';

interface UserMenu {
  label: string;
  description?: string;
}

export function useUserMenu(user: User) {
  const { t } = useI18n();

  const menuElements: UserMenu[] =
    user.type !== 'admin'
      ? [
          { label: t('userAsides.userMenu.items.client.label1') },
          { label: t('userAsides.userMenu.items.client.label2') },
          { label: t('userAsides.userMenu.items.client.label3') },
          { label: t('userAsides.userMenu.items.client.label4') }
        ]
      : [
          { label: t('userAsides.userMenu.items.admin.label1') },
          { label: t('userAsides.userMenu.items.admin.label2') },
          { label: t('userAsides.userMenu.items.admin.label3') },
          { label: t('userAsides.userMenu.items.admin.label4') },
          { label: t('userAsides.userMenu.items.admin.label5') },
          { label: t('userAsides.userMenu.items.admin.label6') }
        ];

  return {
    menuElements
  };
}
