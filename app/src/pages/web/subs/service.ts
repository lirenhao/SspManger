import { request } from 'umi';
import { TableListParams } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/ssp/merchant', {
    params
  });
}

export async function fetchGet(merchantId: string) {
  return request(`/svc/ssp/merchant/${merchantId}`);
}

export async function fetchOrgTree() {
  return request('/svc/ssp/org/tree');
}

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant/orgId');
}

export async function fetchGetSubs(merchantId: string) {
  return request(`/svc/ssp/webSubs/${merchantId}`);
}

export async function fetchPutSubs(merNo: string, subNos: string[]) {
  return request(`/svc/ssp/webSubs/${merNo}`, {
    method: 'PUT',
    data: subNos,
  });
}
