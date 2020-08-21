import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/mer/merchant',
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
  {
    path: '/mer/webSubs',
    name: 'webSubs',
    component: './web/subs',
    locale: 'webSubs.title',
  },
];

export default routes;
