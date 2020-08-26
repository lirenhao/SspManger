import { request } from 'umi';
import { TableListParams, TableListItem, CheckData } from './data';

export async function fetchQuery(params?: TableListParams) {
  return request('/svc/ssp/appUser', {
    params
  });
}

export async function fetchGet(merNo: string, loginName: string) {
  return request(`/svc/ssp/appUser/${merNo}/${loginName}`);
}

export async function fetchDel(merNo: string, loginName: string) {
  return request(`/svc/ssp/appUser/${merNo}/${loginName}`, {
    method: 'DELETE',
  });
}

export async function fetchResetPwd(merNo: string, loginName: string) {
  return request(`/svc/ssp/appUser/${merNo}/${loginName}/resetPwd`, {
    method: 'PUT',
  });
}

export async function fetchSave(params: TableListItem) {
  return request('/svc/ssp/appUser', {
    method: 'POST',
    data: params,
  });
}

export async function fetchUpdate(params: TableListItem) {
  return request(`/svc/ssp/appUser/${params.merNo}/${params.loginName}`, {
    method: 'PUT',
    data: params,
  });
}

export async function fetchExistId(merNo: string, loginName: string) {
  return request(`/svc/ssp/appUser/${merNo}/${loginName}/exists`);
}

export async function fetchGetCheck(merNo: string, loginName: string) {
  return request(`/svc/ssp/appUser/${merNo}/${loginName}/check`);
}

export async function fetchCheck(merNo: string, loginName: string, params: CheckData) {
  return request(`/svc/ssp/appUser/${merNo}/${loginName}/check`, {
    method: 'PUT',
    data: params,
  });
}

export async function fetchAllMer() {
  return request('/svc/ssp/merchant/orgId');
}

export async function fetchTermByMerNo(merNo: string) {
  return request(`/svc/ssp/terminal/${merNo}`);
}

export async function fetchAppRoles() {
  return request('/svc/ssp/appRole/list');
}

export async function fetchCcyTypes() {
  return request('/svc/ssp/ccyType/list');
}
