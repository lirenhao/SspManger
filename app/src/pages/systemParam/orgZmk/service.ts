import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/pospOrgZmk', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/pospOrgZmk', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/pospOrgZmk/${params.orgId.toString()}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/pospOrgZmk/${params.orgId.toString()}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/pospOrgZmk/${id}/exists`);
}
