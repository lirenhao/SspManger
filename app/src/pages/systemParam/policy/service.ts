import { request } from 'umi';
import { TableListItem } from './data';

export async function fetchQuery() {
  return request('/svc/merPolicy');
}

export async function fetchGet(id: string) {
  return request(`/svc/merPolicy/${id}`);
}

export async function fetchIssue(id: string) {
  // TODO 调用发布接口
  return Promise.resolve(id);
}

export async function fetchPut(params: TableListItem) {
  return request('/svc/merPolicy', {
    method: 'PUT',
    data: params,
  });
}

export async function fetchExistId(id: string) {
  return request(`/svc/merPolicy/${id}/exists`);
}
