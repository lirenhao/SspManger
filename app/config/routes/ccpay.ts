import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/ccpay/mng',
    name: 'ccpayManager',
    component: './ccpay/mng',
    locale: 'ccpay.title',
    access: 'canShow',
    roles: ['admin', 'MerchantOperator'],
  },
];

export default routes;
