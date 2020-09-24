import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  const ccyCode = params?.ccyCode?.ccyType;

  return request('/svc/ssp/staticQrc', {
    method: 'GET',
    params: { ...params, ...{ ccyCode } },
  });
}

export async function save(params: TableListItem) {
  const ccyType = params?.ccyCode?.ccyType;
  return request('/svc/ssp/staticQrc', {
    method: 'POST',
    data: {
      ...params,
      ...{ ccyType },
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.lsId}`, {
    method: 'GET',
  });
}

export async function getCheck(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.lsId}/check`, {
    method: 'GET',
  });
}

export async function saveCheck(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.lsId}/check`, {
    method: 'PUT',
    data: { checkState: params.checkState, checkReason: params.checkReason },
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/staticQrc/${params.lsId}`, {
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

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant/orgId', {
    method: 'GET',
  });
}

export function getMerEnum(responseResult: { merchantId: string; merNameEng: string }[]) {
  const merEnum = {};
  responseResult.forEach((mer) => {
    merEnum[mer.merchantId] = `${mer.merchantId}-${mer.merNameEng}`;
  });
  return merEnum;
}
