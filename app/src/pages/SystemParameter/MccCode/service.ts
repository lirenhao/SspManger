import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryMcc(params?: TableListParams) {
  return request('/mccCode', {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
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
  return request('/mccCode/'.concat(params.mcc.toString()), {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function removeMcc(params: TableListItem) {
  return request('/mccCode/'.concat(params.mcc.toString()), {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function existMcc(params: TableListItem) {
  return request('/mccCode/'.concat(params.mcc.toString()).concat('/exists'), {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}
