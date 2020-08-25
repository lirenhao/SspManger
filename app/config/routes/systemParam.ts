import { IRoute } from "umi";

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
    component: './systemParam/appRole',
    locale: 'menu.appRole',
  },
  {
    path: '/systemParam/mccCode',
    name: 'mccCode',
    component: './systemParam/mccCode',
    locale: 'menu.mccCode',
  },
  {
    path: '/systemParam/currency',
    name: 'currency',
    component: './systemParam/ccyManager',
    locale: 'menu.currency',
  },
  {
    path: '/systemParam/country',
    name: 'country',
    component: './systemParam/country',
    locale: 'menu.country',
  },
  {
    path: '/systemParam/banks',
    name: 'bank list',
    component: './systemParam/banks',
    locale: 'menu.banks',
  },
  {
    path: '/systemParam/cardbin',
    name: 'bank list',
    component: './systemParam/cardbin',
    locale: 'menu.cardbin',
  },
  {
    path: '/systemParam/orgZmk',
    name: 'orgzmk',
    component: './systemParam/orgZmk',

    locale: 'menu.orgZmk',
  },
  {
    path: '/systemParam/orgTmk',
    name: 'orgtmk',
    component: './systemParam/orgTmk',
    locale: 'menu.orgtmk',
  },
  {
    path: '/systemParam/uploadTmk',
    name: 'uploadTmk',
    component: './systemParam/uploadTmk',
    locale: 'menu.uploadTmk',
  },
  {
    path: '/systemParam/policy',
    name: 'policy',
    component: './web/policy',
    locale: 'policy.title',
  },
];

export default routes;