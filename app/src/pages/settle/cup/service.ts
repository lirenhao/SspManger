import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/cupAcomn', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/cupAcomn/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/cupAcomn/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/cupAcomn/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/cupAcomn/${id}/exists`);
}

export async function download(params?: TableListParams) {
  return request('/cupAcomn/download', {
    method: 'GET',
    params,
  });
}
export async function handle(params?: TableListParams) {
  return request('/cupAcomn/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
