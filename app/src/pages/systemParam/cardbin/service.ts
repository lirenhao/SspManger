import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryAll(params?: TableListParams) {
  return request('/cupCardBin', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/cupCardBin', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getOne(params: TableListItem) {
  return request('/cupCardBin/'.concat(params.id.toString()), {
    method: 'PUT',
  });
}
