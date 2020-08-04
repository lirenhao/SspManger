import { request } from 'umi';
import { TableListParams } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/merchant', {
    params
  });
}

export async function fetchGet(merchnatId: string) {
  return request(`/svc/merchant/${merchnatId}`);
}

export async function fetchOrgTree() {
  return request('/svc/org/tree');
}
