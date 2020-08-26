import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: 'merAddonName check',
    component: './check/merAddon',
    locale: 'merAddonCheck.title',
  },
  {
    path: '/check/merQrc',
    name: 'merQrc check',
    component: './check/merQrc',
    locale: 'merQrcCheck.title',
  },
  {
    path: '/check/merMdr',
    name: 'merMdr check',
    component: './check/merMdr',
    locale: 'merMdrCheck.title',
  },

  {
    path: '/check/ccpay',
    name: 'ccpay check',
    component: './check/ccpay',
    locale: 'ccpayCheck.title',
  },
];

export default routes;
