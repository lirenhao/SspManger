import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/terminal/info',
    name: 'terminal info',
    component: './terminal/info',
    locale: 'terminal.info',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'MerchantChecker'],
  },
  {
    path: '/terminal/termSn',
    name: 'termSn',
    component: './info/termSn',
    locale: 'termSn.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator', 'MerchantChecker'],
  },
  {
    path: '/terminal/orgTmk',
    name: 'orgTmk',
    component: './systemParam/orgTmk',
    locale: 'orgtmk.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
  {
    path: '/terminal/uploadTmk',
    name: 'uploadTmk',
    component: './systemParam/uploadTmk',
    locale: 'uploadTmk.title',
    access: 'canShow',
    roles: ['admin', 'MerchantChecker'],
  },
];

export default routes;
