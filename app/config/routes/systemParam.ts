import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/systemParam/appRole',
    name: 'appRole',
    component: './app/role',
    locale: 'appRole.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/mccCode',
    name: 'mccCode',
    component: './systemParam/mccCode',
    locale: 'mcc.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/currency',
    name: 'currency',
    component: './systemParam/ccyManager',
    locale: 'currency.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/country',
    name: 'country',
    component: './systemParam/country',
    locale: 'country.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/cardbin',
    name: 'cupCardBin',
    component: './systemParam/cardbin',
    locale: 'cardbin.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/apiOrg',
    name: 'apiOrg',
    component: './api/org',
    locale: 'apiOrg.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/banks',
    name: 'bankList',
    component: './systemParam/banks',
    locale: 'banks.title',
    access: 'canShow',
    roles: ['admin', 'Finance Operator'],
  },
  {
    path: '/systemParam/orgZmk',
    name: 'orgzmk',
    component: './systemParam/orgZmk',
    locale: 'orgzmk.title',
    access: 'canShow',
    roles: ['admin'],
  },
  {
    path: '/systemParam/policy',
    name: 'policy',
    component: './web/policy',
    locale: 'policy.title',
    access: 'canShow',
    roles: ['admin'],
  },
];

export default routes;
