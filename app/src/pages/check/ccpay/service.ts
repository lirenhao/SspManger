import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/ccpay', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/ccpay/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/ccpay/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/ccpay/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/ccpay/${id}/exists`);
}

export async function getCcyType() {
  return request('/ccyType/list', {
    method: 'GET',
  });
}

// export async function fetchOrgTree() {
//   return request('/org/tree');
// }

export async function fetchGetAllMer() {
  return request('/merchant', {
    method: 'GET',
  });
}

export async function getTerminal(id: String) {
  return request(`/terminal/${id}`);
}

// export async function getCountryCode() {
//   return request('/countryCode/list', {
//     method: 'GET',
//   });
// }
