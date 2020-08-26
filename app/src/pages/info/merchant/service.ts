import { request } from 'umi';
import { TableListParams } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/ssp/merchant', {
    params,
  });
}

export async function fetchGet(merchnatId: string) {
  return request(`/svc/ssp/merchant/${merchnatId}`);
}

export async function fetchOrgTree() {
  return request('/svc/ssp/org/tree');
}
