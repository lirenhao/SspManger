import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/staticQrc', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/staticQrc/${params.lsId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/staticQrc/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/staticQrc/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/staticQrc/${id}/exists`);
}

export async function getCcyType() {
  return request('/ccyType/list', {
    method: 'GET',
  });
}

export async function fetchOrgTree() {
  return request('/org/tree');
}

export async function getTerminal(id: String) {
  return request(`/terminal/${id}`);
}