import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/pospOrgTmk', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/pospOrgTmk', {
    method: 'PUT',
    data: {
      ...params,
      method: 'put',
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/pospOrgTmk/${params.orgId.toString()}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/pospOrgTmk/${params.orgId.toString()}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/pospOrgTmk/${id}/exists`);
}

export function getOrg() {
  return request(`/org/second`);

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve("dddddddd");
  //   }, 1000);
  // });

  // return Promise.resolve({"001":"BANK OF CHINA SINGAPORE BRANCH"})
}
