import { request } from 'umi';
import { TableListParams } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/ssp/termSn', {
    params,
  });
}

export async function fetchApiOrg() {
  return request('/svc/ssp/merApiOrg/list');
}

export async function fetchMer() {
  return request('/svc/ssp/merchant/orgId');
}

export async function fetchTerm(merchnatId: string) {
  return request(`/svc/ssp/terminal/${merchnatId}`);
}

export async function fetchDel(vendorId: string, snNo: string) {
  return request(`/svc/ssp/termSn/${vendorId}/${snNo}`, {
    method: 'DELETE',
  });
}
