import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: 'merAddonName check',
    component: './check/merAddon',
    locale: 'check.merAddonName',
  },
  {
    path: '/check/merQrc',
    name: 'merQrc check',
    component: './check/merQrc',
    locale: 'check.merQrc',
  },
  {
    path: '/check/merMdr',
    name: 'merMdr check',
    component: './check/merMdr',
    locale: 'check.merMdr',
  },

  {
    path: '/check/ccpay',
    name: 'ccpay check',
    component: './check/ccpay',
    locale: 'check.ccpay',
  },
];

export default routes;
