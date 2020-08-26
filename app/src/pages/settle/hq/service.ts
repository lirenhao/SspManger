import { request } from 'umi';
import { TableListParams } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/hqReport', {
    method: 'GET',
    params,
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/hqReport/${id}/exists`);
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
