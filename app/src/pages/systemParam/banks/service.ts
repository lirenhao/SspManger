import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/bankList', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/bankList', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/bankList/${params.accountBankNo.toString()}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/bankList/${params.accountBankNo.toString()}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/bankList/${id}/exists`);
}
