import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/settleDetail/', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/settleDetail/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function download(params?: TableListParams) {
  return request('/settleDetail/download', {
    method: 'GET',
    params,
  });
}
