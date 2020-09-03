import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/staticQrc', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/svc/ssp/staticQrc', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.merchantId}`, {
    method: 'GET',
  });
}

export async function getCheck(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.merchantId}/check`, {
    method: 'GET',
  });
}

export async function saveCheck(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.merchantId}/check`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/staticQrc/${id}/exists`);
}

export async function getCcyType() {
  return request('/svc/ssp/ccyType/list', {
    method: 'GET',
  });
}

export async function fetchOrgTree() {
  return request('/svc/ssp/org/tree');
}



export async function getTerminal(id: String) {
  return request(`/svc/ssp/terminal/${id}`);
}

// export async function getCountryCode() {
//   return request('/svc/ssp/countryCode/list', {
//     method: 'GET',
//   });
// }
