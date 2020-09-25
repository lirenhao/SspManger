import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/ccpay/mng',
    name: 'ccpayManager',
    component: './ccpay/mng',
    locale: 'ccpay.title',
    access: 'canShow',
    roles: ['admin', 'Merchant Operator'],
  },
];

export default routes;
