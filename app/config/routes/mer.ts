import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/systemParam/merchant',
    name: 'merchant',
    component: './info/merchant',
    locale: 'merchant.title',
    access: 'canShow',
    roles: ['admin', 'user'],
  },
  {
    path: '/mer/merAddon',
    name: 'merAddonName',
    component: './mer/merAddon',
    locale: 'mer.merAddonName',
  },
  {
    path: '/mer/merQrc',
    name: 'merQrc',
    component: './mer/merQrc',
    locale: 'mer.merQrc',
  },
  {
    path: '/mer/merMdr',
    name: 'merMdr',
    component: './mer/merMdr',
    locale: 'mer.merMdr',
  },
];

export default routes;