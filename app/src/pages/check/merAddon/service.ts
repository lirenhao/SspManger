import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/merchantExtra', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/merchantExtra/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/merchantExtra/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/merchantExtra/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/merchantExtra/${id}/exists`);
}

export async function getCcyType() {
  return request('/ccyType/list', {
    method: 'GET',
  });
}

export async function getCountryCode() {
  return request('/countryCode/list', {
    method: 'GET',
  });
}
