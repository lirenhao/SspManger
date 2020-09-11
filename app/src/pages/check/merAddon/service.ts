import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/merchant', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/svc/ssp/merchantExtra', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/merchantExtra/${params.merchantId}`, {
    method: 'GET',
  });
}

export async function getCheck(params: TableListItem) {
  return request(`/svc/ssp/merchantExtra/${params.merchantId}/check`, {
    method: 'GET',
  });
}

export async function saveCheck(params: TableListItem) {
  return request(`/svc/ssp/merchantExtra/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/merchantExtra/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/merchantExtra/${id}/exists`);
}

export async function getCcyType() {
  return request('/svc/ssp/ccyType/list', {
    method: 'GET',
  });
}

export async function getCountryCode() {
  return request('/svc/ssp/countryCode/list', {
    method: 'GET',
  });
}
