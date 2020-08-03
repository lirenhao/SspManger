import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryRole(params?: TableListParams) {
  return request('/appRole', {
    method: 'GET',
    params,
  });
}

export async function getRole(params: TableListItem) {
  return request('/appRole/'.concat(params.id), {
    method: 'GET',
  });
}

export async function saveRole(params: TableListItem) {
  return request('/approle/save', {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function exist(id: string) {
  return request(`/approle/${id}/exists`);
}
