export interface MenuItem {
  // TO DO: Change optional id
  id: number;
  label: string;
  route?: {
    name: string;
    params?: any;
  };
  description?: string;
  subItem?: MenuItem[];
  image?: string;
  icon?: string;
}
