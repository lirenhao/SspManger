import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/mer/merchant',
    name: 'merchant',
    component: './info/merchant',
    locale: 'merchant.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'MerchantChecker'],
  },
  {
    path: '/mer/merAddon',
    name: 'merAddon',
    component: './mer/merAddon',
    locale: 'merAddon.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/mer/merQrc',
    name: 'merQrc',
    component: './mer/merQrc',
    locale: 'merQrc.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/mer/merMdr',
    name: 'merMdr',
    component: './mer/merMdr',
    locale: 'merMdr.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/mer/apiOrgMapping',
    name: 'apiOrgMapping',
    component: './api/org/Mapping',
    locale: 'apiOrg.mapping.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/mer/webUser',
    name: 'webUser',
    component: './web/user',
    locale: 'webUser.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
  {
    path: '/mer/webSubs',
    name: 'webSubs',
    component: './web/subs',
    locale: 'webSubs.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
];

export default routes;
