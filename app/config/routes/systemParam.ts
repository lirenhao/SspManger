import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/systemParam/merchant',
    name: 'merchant',
    component: './info/merchant',
    locale: 'merchant.title',
    access: 'canShow',
    roles: ['admin', 'user'],
  },
  {
    path: '/systemParam/termSn',
    name: 'termSn',
    component: './info/termSn',
    locale: 'termSn.title',
  },
  {
    path: '/systemParam/apiOrg',
    name: 'apiOrg',
    component: './api/org',
    locale: 'apiOrg.title',
  },
  {
    path: '/systemParam/apiOrgMapping',
    name: 'apiOrgMapping',
    component: './api/org/mapping',
    locale: 'apiOrg.mapping.title',
  },
  {
    path: '/systemParam/appRole',
    name: 'appRole',
    component: './app/role',
    locale: 'appRole.title',
  },
  {
    path: '/systemParam/mccCode',
    name: 'mccCode',
    component: './systemParam/mccCode',
    locale: 'mcc.title',
  },
  {
    path: '/systemParam/currency',
    name: 'currency',
    component: './systemParam/ccyManager',
    locale: 'currency.title',
  },
  {
    path: '/systemParam/country',
    name: 'country',
    component: './systemParam/country',
    locale: 'country.title',
  },
  {
    path: '/systemParam/banks',
    name: 'bank list',
    component: './systemParam/banks',
    locale: 'banks.title',
  },
  {
    path: '/systemParam/cardbin',
    name: 'bank list',
    component: './systemParam/cardbin',
    locale: 'cardbin.title',
  },
  {
    path: '/systemParam/orgZmk',
    name: 'orgzmk',
    component: './systemParam/orgZmk',

    locale: 'orgzmk.title',
  },
  {
    path: '/systemParam/orgTmk',
    name: 'orgtmk',
    component: './systemParam/orgTmk',
    locale: 'orgtmk.title',
  },
  {
    path: '/systemParam/uploadTmk',
    name: 'uploadTmk',
    component: './systemParam/uploadTmk',
    locale: 'uploadTmk.title',
  },
  {
    path: '/systemParam/policy',
    name: 'policy',
    component: './web/policy',
    locale: 'policy.title',
  },
];

export default routes;
