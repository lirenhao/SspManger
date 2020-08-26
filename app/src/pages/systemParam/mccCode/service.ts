import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryMcc(params?: TableListParams) {
  return request('/svc/ssp/mccCode', {
    method: 'GET',
    params,
  });
}

export async function saveMcc(params: TableListItem) {
  return request('/svc/ssp/mccCode', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getMcc(params: TableListItem) {
  return request(`/svc/ssp/mccCode/${params.mcc}`, {
    method: 'PUT',
  });
}

export async function removeMcc(params: TableListItem) {
  return request(`/svc/ssp/mccCode/${params.mcc}`, {
    method: 'DELETE',
  });
}

export async function existMcc(id: String) {
  return request(`/svc/ssp/mccCode/${id}/exists`);
}
