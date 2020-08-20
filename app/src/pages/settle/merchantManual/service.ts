import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/manualSettle', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/manualSettle/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function check(params: TableListItem) {
  return request(`/manualSettle/${params.lsId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/manualSettle/${params.lsId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/manualSettle/${params.lsId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/manualSettle/${id}/exists`);
}

export async function download(params?: TableListParams) {
  return request('/manualSettle/download', {
    method: 'GET',
    params,
  });
}
export async function handle(params?: TableListParams) {
  return request('/manualSettle/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
export async function fetchGetAllMer() {
  return request('/merchant', {
    method: 'GET',
  });
}
