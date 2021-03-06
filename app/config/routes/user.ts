import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/user/appUser',
    name: 'appUser',
    component: './app/user',
    locale: 'appUser.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
];

export default routes;
