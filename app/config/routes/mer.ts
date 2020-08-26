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
    locale: 'merAddon.title',
  },
  {
    path: '/mer/merQrc',
    name: 'merQrc',
    component: './mer/merQrc',
    locale: 'merQrc.title',
  },
  {
    path: '/mer/merMdr',
    name: 'merMdr',
    component: './mer/merMdr',
    locale: 'merMdr.title',
  },
  {
    path: '/mer/webSubs',
    name: 'webSubs',
    component: './web/subs',
    locale: 'webSubs.title',
  },
  {
    path: '/mer/webUser',
    name: 'webUser',
    component: './web/user',
    locale: 'webUser.title',
  },
];

export default routes;
