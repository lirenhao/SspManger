import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryAll(params?: TableListParams) {
  return request('/countryCode', {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
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
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function remove(params: TableListItem) {
  return request('/countryCode/'.concat(params.internationalCode.toString()), {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function exist(params: TableListItem) {
  return request('/countryCode/'.concat(params.internationalCode.toString()).concat('/exists'), {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}

export async function enable(params: TableListItem) {
  return request('/countryCode/'.concat(params.internationalCode.toString()).concat('/enable'), {
    method: 'GET',
    data: {
      ...params,
      method: 'get',
    },
  });
}
