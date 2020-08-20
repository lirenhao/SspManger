import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/termCount/', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/termCount/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function download(params?: TableListParams) {
  return request('/termCount/download', {
    method: 'GET',
    params,
  });
}
