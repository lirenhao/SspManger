import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/settle/cup',
    name: 'cup',
    component: './settle/cup',
    locale: 'cup.title',
  },
  {
    path: '/settle/cupHandle',
    name: 'cupHandle',
    component: './settle/cup',
    locale: 'cupHandle.title',
  },
  {
    path: '/settle/bcfes',
    name: 'bcfes',
    component: './settle/bcfes',
    locale: 'bcfes.title',
  },
  {
    path: '/settle/bcfesHandle',
    name: 'bcfesHandle',
    component: './settle/bcfes',
    locale: 'bcfesHandle.title',
  },
  {
    path: '/settle/adjInput',
    name: 'adjInput',
    component: './settle/merchantManual',
    locale: 'adjInput.title',
  },
  {
    path: '/settle/adjInputVerify',
    name: 'adjInputVerify',
    component: './settle/merchantManual',
    locale: 'adjInputVerify.title',
  },

  {
    path: '/settle/settleList',
    name: 'settleList',
    component: './settle/settleList',
    locale: 'settleList.title',
  },

  {
    path: '/settle/settleHisSuccess',
    name: 'settleHisSuccess',
    component: './settle/settleHis',
    locale: 'settleHisSuccess.title',
  },
  {
    path: '/settle/settleHisFail',
    name: 'settleHisFail',
    component: './settle/settleHis',
    locale: 'settleHisFail.title',
  },
  {
    path: '/settle/settleDetail',
    name: 'settleDetail',
    component: './settle/settleDetail',
    locale: 'settleDetail.title',
  },
  {
    path: '/settle/term',
    name: 'termCount',
    component: './settle/term',
    locale: 'termCount.title',
  },
  {
    path: '/settle/hq',
    name: 'hq',
    component: './settle/hq',
    locale: 'hq.title',
  },
];

export default routes;
