import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/other/termCount',
    name: 'termCount',
    component: './settle/term',
    locale: 'termCount.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'FinanceOperator', 'MerchantChecker', 'FinanceChecker'],
  },
  {
    path: '/other/hqReport',
    name: 'hqReport',
    component: './settle/hq',
    locale: 'hq.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'FinanceOperator', 'MerchantChecker', 'FinanceChecker'],
  },
];

export default routes;
