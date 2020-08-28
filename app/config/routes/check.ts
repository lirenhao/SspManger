import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/check/merAddon',
    name: 'merAddonName check',
    component: './mer/merAddon',
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
    component: './ccpay/mng',
    locale: 'ccpayCheck.title',
  },
  {
    path: '/check/appUser',
    name: 'appUser check',
    component: './app/user/check',
    locale: 'appUser.check.title',
  },
];

export default routes;
