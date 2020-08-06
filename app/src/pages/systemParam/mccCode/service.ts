import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryMcc(params?: TableListParams) {
  return request('/mccCode', {
    method: 'GET',
    params,
  });
}

export async function saveMcc(params: TableListItem) {
  return request('/mccCode', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getMcc(params: TableListItem) {
  return request(`/mccCode/${params.mcc}`, {
    method: 'PUT',
  });
}

export async function removeMcc(params: TableListItem) {
  return request(`/mccCode/${params.mcc}`, {
    method: 'DELETE',
  });
}

export async function existMcc(id: String) {
  return request(`/mccCode/${id}/exists`);
}
