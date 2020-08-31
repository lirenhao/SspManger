import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: '/check/merAddon',
    component: './mer/merAddon',
    locale: 'merAddonCheck.title',
  },
  {
    path: '/check/merQrc',
    name: '/check/merQrc',
    component: './mer/merQrc',
    locale: 'merQrcCheck.title',
  },
  {
    path: '/check/merMdr',
    name: '/check/merMdr',
    component: './mer/merMdr',
    locale: 'merMdrCheck.title',
  },
  {
    path: '/check/ccpay',
    name: '/check/ccpay',
    component: './ccpay/mng',
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
