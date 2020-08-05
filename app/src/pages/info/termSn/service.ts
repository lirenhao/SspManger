import { request } from 'umi';
import { TableListParams } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/termSn', {
    params
  });
}

export async function fetchApiOrg() {
  return request('/svc/merApiOrg/list');
}

export async function fetchMer() {
  return request('/svc/merchant/orgId');
}

export async function fetchTerm(merchnatId: string) {
  return request(`/svc/terminal/${merchnatId}`);
}

export async function fetchDel(vendorId: string, snNo: string) {
  return request(`/svc/termSn/${vendorId}/${snNo}`, {
    method: 'DELETE',
  });
}
