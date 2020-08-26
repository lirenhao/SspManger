import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/cupqrcSettle', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/cupqrcSettle/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/cupqrcSettle/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/cupqrcSettle/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/cupqrcSettle/${id}/exists`);
}

export async function download(params?: TableListParams) {
  return request('/svc/ssp/cupqrcSettle/download', {
    method: 'GET',
    params,
  });
}
export async function handle(params?: TableListParams) {
  return request('/svc/ssp/cupqrcSettle/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
