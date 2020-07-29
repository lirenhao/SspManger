import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryRole(params?: TableListParams) {
  return request('/approle/list', {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}

export async function getRole(params: TableListItem) {
  return request('/approle/show', {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}

export async function saveRole(params: TableListItem) {
  return request('/approle/save', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
