import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(isSuccess: boolean, params?: TableListParams) {
  if (isSuccess) {
    return request('/svc/ssp/settleHis/success', {
      method: 'GET',
      params,
    });
  }
  return request('/svc/ssp/settleHis/failure', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/settleHis/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/settleHis/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/settleHis/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/settleHis/${id}/exists`);
}

export async function download(isSuccess: boolean, params?: TableListParams) {
  if (isSuccess) {
    return request('/svc/ssp/settleHis/success/download', {
      method: 'GET',
      params,
    });
  }
  return request('/svc/ssp/settleHis/failure/download', {
    method: 'GET',
    params,
  });
}
export async function handle(params?: TableListParams) {
  return request('/svc/ssp/settleHis/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
