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
title: 'nieuwe aanmeldingen',
path: PATH_DASHBOARD.general.ecommerce,
icon: ICONS.edit,
},
{ title: 'projecten', path: PATH_DASHBOARD.general.analytics, icon: ICONS.image },
{ title: 'schrijvers', path: PATH_DASHBOARD.general.banking, icon: ICONS.doc },
{
title: 'berichten',
path: PATH_DASHBOARD.general.booking,
icon: ICONS.chat,
info: <Label color="error">1</Label>,
},
{ title: 'team', path: PATH_DASHBOARD.general.banking, icon: ICONS.cate },
{ title: 'templates', path: PATH_DASHBOARD.general.banking, icon: ICONS.bag },
{ title: 'settings', path: PATH_DASHBOARD.general.banking, icon: ICONS.setting },
{ title: 'tools', path: PATH_DASHBOARD.tools, icon: ICONS.filter },
],
},
];

const navConfigOrign = [
// GENERAL
// ----------------------------------------------------------------------
{
subheader: 'general',
items: [
{ title: 'app', path: PATH_DASHBOARD_ORIGIN.general.app, icon: ICONS_ORIGIN.dashboard },
{
title: 'ecommerce',
path: PATH_DASHBOARD_ORIGIN.general.ecommerce,
icon: ICONS_ORIGIN.ecommerce,
},
{
title: 'analytics',
path: PATH_DASHBOARD_ORIGIN.general.analytics,
icon: ICONS_ORIGIN.analytics,
},
{ title: 'banking', path: PATH_DASHBOARD_ORIGIN.general.banking, icon: ICONS_ORIGIN.banking },
{ title: 'booking', path: PATH_DASHBOARD_ORIGIN.general.booking, icon: ICONS_ORIGIN.booking },
],
},

// MANAGEMENT
// ----------------------------------------------------------------------
{
subheader: 'management',
items: [
// USER
{
title: 'user',
path: PATH_DASHBOARD_ORIGIN.user.root,
icon: ICONS_ORIGIN.user,
children: [
{ title: 'profile', path: PATH_DASHBOARD_ORIGIN.user.profile },
{ title: 'cards', path: PATH_DASHBOARD_ORIGIN.user.cards },
{ title: 'list', path: PATH_DASHBOARD_ORIGIN.user.list },
{ title: 'create', path: PATH_DASHBOARD_ORIGIN.user.new },
{ title: 'edit', path: PATH_DASHBOARD_ORIGIN.user.demoEdit },
{ title: 'account', path: PATH_DASHBOARD_ORIGIN.user.account },
],
},

      // E-COMMERCE
      {
        title: 'ecommerce',
        path: PATH_DASHBOARD_ORIGIN.eCommerce.root,
        icon: ICONS_ORIGIN.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD_ORIGIN.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD_ORIGIN.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD_ORIGIN.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD_ORIGIN.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD_ORIGIN.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD_ORIGIN.eCommerce.checkout },
        ],
      },

      // INVOICE
      {
        title: 'invoice',
        path: PATH_DASHBOARD_ORIGIN.invoice.root,
        icon: ICONS_ORIGIN.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD_ORIGIN.invoice.list },
          { title: 'details', path: PATH_DASHBOARD_ORIGIN.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD_ORIGIN.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD_ORIGIN.invoice.demoEdit },
        ],
      },

      // BLOG
      {
        title: 'blog',
        path: PATH_DASHBOARD_ORIGIN.blog.root,
        icon: ICONS_ORIGIN.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD_ORIGIN.blog.posts },
          { title: 'post', path: PATH_DASHBOARD_ORIGIN.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD_ORIGIN.blog.new },
        ],
      },
    ],

},

// APP
// ----------------------------------------------------------------------
{
subheader: 'app',
items: [
{
title: 'mail',
path: PATH_DASHBOARD_ORIGIN.mail.root,
icon: ICONS_ORIGIN.mail,
info: <Label color="error">+32</Label>,
},
{ title: 'chat', path: PATH_DASHBOARD_ORIGIN.chat.root, icon: ICONS_ORIGIN.chat },
{ title: 'calendar', path: PATH_DASHBOARD_ORIGIN.calendar, icon: ICONS_ORIGIN.calendar },
{ title: 'kanban', path: PATH_DASHBOARD_ORIGIN.kanban, icon: ICONS_ORIGIN.kanban },
],
},

// DEMO MENU STATES
{
subheader: 'Other cases',
items: [
{
// default roles : All roles can see this entry.
// roles: ['user'] Only users can see this item.
// roles: ['admin'] Only admin can see this item.
// roles: ['admin', 'manager'] Only admin/manager can see this item.
// Reference from 'src/guards/RoleBasedGuard'.
title: 'item_by_roles',
path: PATH_DASHBOARD.permissionDenied,
icon: ICONS_ORIGIN.menuItem,
roles: ['admin'],
caption: 'only_admin_can_see_this_item',
},
{
title: 'menu_level_1',
path: '#1',
icon: ICONS_ORIGIN.menuItem,
children: [
{ title: 'menu_level_2', path: '#2', disabled: true },
{
title: 'menu_level_2',
path: '#3',
children: [
{ title: 'menu_level_3', path: '#4' },
{ title: 'menu_level_3', path: '#5' },
],
},
],
},
{ title: 'item_disabled', path: '#disabled', icon: ICONS_ORIGIN.menuItem, disabled: true },
{
title: 'item_label',
path: '#label',
icon: ICONS_ORIGIN.menuItem,
info: (
<Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
NEW
</Label>
),
},
{
title: 'item_caption',
path: '#caption',
icon: ICONS_ORIGIN.menuItem,
caption: 'description',
},
],
},
];

export default navConfig;
