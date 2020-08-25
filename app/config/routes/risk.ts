import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/risk/control',
    name: 'cup',
    component: './risk/control',
    locale: 'risk.control',
  },
  {
    path: '/risk/monitoring',
    name: 'monitoring',
    component: './risk/monitoring',
    locale: 'risk.monitoring',
  },
  {
    path: '/risk/report',
    name: 'report',
    component: './risk/report',
    locale: 'risk.report',
  },
];

export default routes;
