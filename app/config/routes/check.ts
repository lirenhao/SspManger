import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: '/check/merAddon',
    component: './mer/merAddon/indexCheck',
    locale: 'merAddonCheck.title',
  },
  {
    path: '/check/merQrc',
    name: '/check/merQrc',
    component: './check/merQrc',
    locale: 'merQrcCheck.title',
  },
  {
    path: '/check/merMdr',
    name: '/check/merMdr',
    component: './check/merMdr',
    locale: 'merMdrCheck.title',
  },
  {
    path: '/check/ccpay',
    name: '/check/ccpay',
    component: './check/ccpay/mng',
    locale: 'ccpayCheck.title',
  },
  {
    path: '/check/appUser',
    name: '/check/appUser',
    component: './app/user/check',
    locale: 'appUser.check.title',
  },
];

export default routes;
