import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/other/termCount',
    name: 'termCount',
    component: './settle/term',
    locale: 'termCount.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Operator', 'Finance Operator', 'Merchant Checker', 'Finance Checker'],
  },
  {
    path: '/other/hqReport',
    name: 'hqReport',
    component: './settle/hq',
    locale: 'hq.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Operator', 'Finance Operator', 'Merchant Checker', 'Finance Checker'],
  },
];

export default routes;
