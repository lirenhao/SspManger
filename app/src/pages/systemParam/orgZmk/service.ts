import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/pospOrgZmk', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/svc/ssp/pospOrgZmk', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/pospOrgZmk/${params.orgId.toString()}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/pospOrgZmk/${params.orgId.toString()}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/pospOrgZmk/${id}/exists`);
}

export function getOrg() {
  return request(`/svc/ssp/org/second`);
}



