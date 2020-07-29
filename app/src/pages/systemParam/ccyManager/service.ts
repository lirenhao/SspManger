import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryCcy(params?: TableListParams) {
  return request('/ccyType', {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}

export async function saveCcy(params: TableListItem) {
  return request('/ccyType', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getCcy(params: TableListItem) {
  return request('/ccyType/'.concat(params.ccyType.toString()), {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function removeCcy(params: TableListItem) {
  return request('/ccyType/'.concat(params.ccyType.toString()), {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function existCcy(params: TableListItem) {
  return request('/CcyCode/'.concat(params.ccyType.toString()).concat('/exists'), {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}
