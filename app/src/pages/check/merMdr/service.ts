import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/merchantFee', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/merchantFee/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/merchantFee/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/merchantFee/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/merchantFee/${id}/exists`);
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

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant', {
    method: 'GET',
  });
}
