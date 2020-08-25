import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/risk', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/risk', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function show(riskId: String, params: TableListParams) {
  return request(`/riskList/${riskId}/trans`, {
    method: 'GET',
    params,
  });
}
