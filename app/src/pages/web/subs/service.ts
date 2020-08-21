import { request } from 'umi';
import { TableListParams } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/merchant', {
    params
  });
}

export async function fetchGet(merchantId: string) {
  return request(`/svc/merchant/${merchantId}`);
}

export async function fetchOrgTree() {
  return request('/svc/org/tree');
}

export async function fetchGetAllMer() {
  return request('/svc/merchant/orgId');
}

export async function fetchGetSubs(merchantId: string) {
  return request(`/svc/webSubs/${merchantId}`);
}

export async function fetchPutSubs(merNo: string, subNos: string[]) {
  return request(`/svc/webSubs/${merNo}`, {
    method: 'PUT',
    data: subNos,
  });
}
