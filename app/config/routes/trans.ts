import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/transaction/trans',
    name: 'transaction info',
    component: './transaction/trans',
    locale: 'trans.title',
  },
];

export default routes;
