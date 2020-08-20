import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/cupqrcSettle', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/cupqrcSettle/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/cupqrcSettle/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/cupqrcSettle/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/cupqrcSettle/${id}/exists`);
}

export async function download(params?: TableListParams) {
  return request('/cupqrcSettle/download', {
    method: 'GET',
    params,
  });
}
export async function handle(params?: TableListParams) {
  return request('/cupqrcSettle/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
