import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/ccpay', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/svc/ssp/ccpay', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/ccpay/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/ccpay/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/ccpay/${id}/exists`);
}

export async function getCcyType() {
  return request('/svc/ssp/ccyType/list', {
    method: 'GET',
  });
}

// export async function fetchOrgTree() {
//   return request('/svc/ssp/org/tree');
// }

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant', {
    method: 'GET',
  });
}

export async function getTerminal(id: String) {
  return request(`/svc/ssp/terminal/${id}`);
}

// export async function getCountryCode() {
//   return request('/svc/ssp/countryCode/list', {
//     method: 'GET',
//   });
// }
