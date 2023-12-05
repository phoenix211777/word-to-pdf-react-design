// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  bag: getIcon('Bag'),
  cate: getIcon('Category'),
  chat: getIcon('Chat'),
  doc: getIcon('Document'),
  edit: getIcon('Edit-Square'),
  filter: getIcon('Filter'),
  home: getIcon('Home'),
  image: getIcon('Image'),
  setting: getIcon('Setting'),
};

const ICONS_ORIGIN = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  {
    subheader: '',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.home },
      {
        title: 'new_registrations',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.edit,
      },
      { title: 'projects', path: PATH_DASHBOARD.general.analytics, icon: ICONS.image },
      { title: 'writers', path: PATH_DASHBOARD.general.banking, icon: ICONS.doc },
      {
        title: 'to_inform',
        path: PATH_DASHBOARD.general.booking,
        icon: ICONS.chat,
        info: <Label color="error">1</Label>,
      },
      // { title: 'team', path: PATH_DASHBOARD.general.banking, icon: ICONS.cate },
      // { title: 'templates', path: PATH_DASHBOARD.general.banking, icon: ICONS.bag },
      // { title: 'settings', path: PATH_DASHBOARD.general.banking, icon: ICONS.setting },
      { title: 'tools', path: PATH_DASHBOARD.tools, icon: ICONS.filter },
    ],
  },
];

export default navConfig;
