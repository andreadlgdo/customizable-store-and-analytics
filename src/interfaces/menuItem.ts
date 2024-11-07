export interface MenuItem {
  label: string;
  description?: string;
  subItem?: MenuItem[];
  image?: string;
}
