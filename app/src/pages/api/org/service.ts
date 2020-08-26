import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/ssp/merApiOrg', {
    params,
  });
}

export async function fetchGet(orgId: string) {
  return request(`/svc/ssp/merApiOrg/${orgId}`);
}

export async function fetchDel(orgId: string) {
  return request(`/svc/ssp/merApiOrg/${orgId}`, {
    method: 'DELETE',
  });
}

export async function fetchSave(params: TableListItem) {
  return request('/svc/ssp/merApiOrg', {
    method: 'POST',
    data: params,
  });
}

export async function fetchUpdate(params: TableListItem) {
  return request('/svc/ssp/merApiOrg', {
    method: 'PUT',
    data: params,
  });
}

export async function fetchExistOrgId(orgId: string) {
  return request(`/svc/ssp/merApiOrg/${orgId}/exists`);
}

export async function fetchGetOrgMer(orgId: string) {
  return request(`/svc/ssp/merApiOrg/${orgId}/mapping`);
}

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant/orgId');
}

export async function fetchMapping(orgId: string, merNos: string[]) {
  return request(`/svc/ssp/merApiOrg/${orgId}/mapping`, {
    method: 'PUT',
    data: merNos,
  });
}
