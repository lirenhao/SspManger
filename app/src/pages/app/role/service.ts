import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryRole(params?: TableListParams) {
  return request('/svc/ssp/appRole', {
    method: 'GET',
    params,
  });
}

export async function getRole(params: TableListItem) {
  return request(`/svc/ssp/appRole/${params.id}`);
}

export async function saveRole(params: TableListItem) {
  return request('/svc/ssp/appRole', {
    method: 'PUT',
    data: params,
  });
}

export async function exist(id: string) {
  return request(`/svc/ssp/appRole/${id}/exists`);
}
