import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/web/user', {
    params
  });
}

export async function fetchAll() {
  return request('/svc/web/user/list');
}

export async function fetchGet(id: string) {
  return request(`/svc/web/user/${id}`);
}

export async function fetchDel(orgId: string) {
  return request(`/svc/web/user/${orgId}`, {
    method: 'DELETE',
  });
}

export async function fetchSave(params: TableListItem) {
  return request('/svc/web/user', {
    method: 'POST',
    data: params,
  });
}

export async function fetchUpdate(params: TableListItem) {
  return request('/svc/web/user', {
    method: 'PUT',
    data: params,
  });
}

export async function fetchExistId(id: string) {
  return request(`/svc/web/user/${id}/exists`);
}

export async function fetchOrgTree() {
  return request('/svc/org/tree');
}

export async function fetchOrgMap() {
  return request('/svc/org/map');
}

export async function fetchAllMer() {
  return request('/svc/merchant/orgId');
}

export async function fetchMerByOrgId(orgId: string) {
  return request(`/svc/merchant/orgId/${orgId}`);
}
