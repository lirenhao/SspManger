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

}

export function getScalar() {
  return request(`/svc/ssp/pospOrgTmk/scalar`);
}

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant/orgId', {
    method: 'GET',
  });
}

export  function getMerEnum(responseResult : {merchantId : string,merNameEng : string}[]) {
  const merEnum = {}
  responseResult.forEach(mer=>{
    merEnum[mer.merchantId] = `${mer.merchantId}-${mer.merNameEng}`
  })
  return merEnum;

}