import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/settle/cup',
    name: 'cup',
    component: './settle/cup',
    locale: 'cup.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/cupHandle',
    name: 'cupHandle',
    component: './settle/cupManu',
    locale: 'cupHandle.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/bcfes',
    name: 'bcfes',
    component: './settle/bcfes',
    locale: 'bcfes.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/bcfesHandle',
    name: 'bcfesHandle',
    component: './settle/bcfesManu',
    locale: 'bcfesHandle.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/adjInput',
    name: 'adjInput',
    component: './settle/merchantManual',
    locale: 'adjInput.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/adjInputVerify',
    name: 'adjInputVerify',
    component: './settle/merchantManualVerify',
    locale: 'adjInputVerify.title',
    access: 'canShow',
    roles: ['admin', 'FinanceChecker'],
  },
  {
    path: '/settle/settleList',
    name: 'settleList',
    component: './settle/settleList',
    locale: 'settleList.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/settleHisSuccess',
    name: 'settleHisSuccess',
    component: './settle/settleHisSuccess',
    locale: 'settleHisSuccess.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/settleHisFail',
    name: 'settleHisFail',
    component: './settle/settleHis',
    locale: 'settleHisFail.title',
    access: 'canShow',
    roles: ['admin', 'FinanceOperator'],
  },
  {
    path: '/settle/settleDetail',
    name: 'settleDetail',
    component: './settle/settleDetail',
    locale: 'settleDetail.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
];

export default routes;
