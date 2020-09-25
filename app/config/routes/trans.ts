import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/transaction/trans',
    name: 'transaction',
    component: './transaction/trans',
    locale: 'trans.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Operator'],
  },
];

export default routes;
