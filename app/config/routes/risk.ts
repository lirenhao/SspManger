import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/risk/monitoring',
    name: 'riskMonitoring',
    component: './risk/monitoring',
    locale: 'riskMonitoring.title',
    access: 'canShow',
    roles: ['admin', 'RiskOperator'],
  },
  {
    path: '/risk/control',
    name: 'riskControl',
    component: './risk/control',
    locale: 'riskControl.title',
    access: 'canShow',
    roles: ['admin', 'RiskOperator'],
  },
  {
    path: '/risk/report',
    name: 'riskReport',
    component: './risk/report',
    locale: 'riskReport.title',
    access: 'canShow',
    roles: ['admin', 'RiskOperator'],
  },
];

export default routes;
