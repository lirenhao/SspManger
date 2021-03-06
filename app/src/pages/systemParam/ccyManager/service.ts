import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryCcy(params?: TableListParams) {
  return request('/svc/ssp/ccyType', {
    method: 'GET',
    params,
  });
}

export async function saveCcy(params: TableListItem) {
  return request('/svc/ssp/ccyType', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getCcy(params: TableListItem) {
  return request('/svc/ssp/ccyType/'.concat(params.ccyType.toString()), {
    method: 'PUT',
  });
}

export async function removeCcy(params: TableListItem) {
  return request('/svc/ssp/ccyType/'.concat(params.ccyType.toString()), {
    method: 'DELETE',
  });
}

export async function existCcy(id: string) {
  return request(`/svc/ssp/ccyType/${id}/exists`);
}
