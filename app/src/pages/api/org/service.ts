import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/merApiOrg', {
    params
  });
}

export async function fetchGet(orgId: string) {
  return request(`/svc/merApiOrg/${orgId}`);
}

export async function fetchSave(params: TableListItem) {
  return request('/svc/merApiOrg', {
    method: 'POST',
    data: params,
  });
}

export async function fetchExistOrgId(orgId: string) {
  return request(`/svc/merApiOrg/${orgId}/exists`);
}
