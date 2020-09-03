import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/pospOrgTmk', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request('/svc/ssp/pospOrgTmk', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/pospOrgTmk/${params.orgId.toString()}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/pospOrgTmk/${params.orgId.toString()}/${params.tmkZmk}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/pospOrgTmk/${id}/exists`);
}

export function getOrg() {
  return request(`/svc/ssp/org/second`);

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve("dddddddd");
  //   }, 1000);
  // });

  // return Promise.resolve({"001":"BANK OF CHINA SINGAPORE BRANCH"})
}
