import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/terminal', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/terminal', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/terminal/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/terminal/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/terminal/${id}/exists`);
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

// export async function getCountryCode() {
//   return request('/countryCode/list', {
//     method: 'GET',
//   });
// }
