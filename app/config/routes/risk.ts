import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/risk/monitoring',
    name: 'monitoring',
    component: './risk/monitoring',
    locale: 'riskMonitoring.title',
  },
  {
    path: '/risk/control',
    name: 'cup',
    component: './risk/control',
    locale: 'riskControl.title',
  },
  {
    path: '/risk/report',
    name: 'report',
    component: './risk/report',
    locale: 'riskReport.title',
  },
];

export default routes;
