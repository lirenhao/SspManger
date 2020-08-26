import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryAll(params?: TableListParams) {
  return request('/svc/ssp/countryCode', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/svc/ssp/countryCode', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function getOne(params: TableListItem) {
  return request('/svc/ssp/countryCode/'.concat(params.internationalCode.toString()), {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request('/svc/ssp/countryCode/'.concat(params.internationalCode.toString()), {
    method: 'DELETE',
  });
}

export async function exist(id: string) {
  return request(`/svc/ssp/countryCode/${id}/exists`);
}

export async function enable(id: string) {
  return request(`/svc/ssp/countryCode/${id}/enable`, {
    method: 'GET',
  });
}
