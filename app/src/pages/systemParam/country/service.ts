import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryAll(params?: TableListParams) {
  return request('/countryCode', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/countryCode', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getOne(params: TableListItem) {
  return request('/countryCode/'.concat(params.internationalCode.toString()), {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request('/countryCode/'.concat(params.internationalCode.toString()), {
    method: 'DELETE',
  });
}

export async function exist(id: string) {
  return request(`/countryCode/${id}/exists`);
}

export async function enable(id: string) {
  return request(`/countryCode/${id}/enable`, {
    method: 'GET',
  });
}
