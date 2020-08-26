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

export async function fetchDel(id: string) {
  return request(`/svc/web/user/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchResetPwd(id: string) {
  return request(`/svc/web/user/${id}/reset`, {
    method: 'PUT',
  });
}

export async function fetchSave(params: TableListItem) {
  return request('/svc/web/user', {
    method: 'POST',
    data: params,
  });
}

export async function fetchUpdate(params: TableListItem) {
  return request(`/svc/web/user/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function fetchExistId(id: string) {
  return request(`/svc/web/user/${id}/exists`);
}

export async function fetchOrgTree() {
  return request('/svc/ssp/org/tree');
}

export async function fetchOrgMap() {
  return request('/svc/ssp/org/map');
}

export async function fetchAllMer() {
  return request('/svc/ssp/merchant/orgId');
}

export async function fetchMerByOrgId(orgId: string) {
  return request(`/svc/ssp/merchant/orgId/${orgId}`);
}
