import { request } from 'umi';
import { TableListItem } from './data';

export async function fetchQuery() {
  return request('/svc/merPolicy');
}

export async function fetchGet(id: string) {
  return request(`/svc/merPolicy/${id}`);
}

export async function fetchIssue(id: string) {
  if (id === 'login') {
    return request('/svc/web/user/policy', {
      method: 'PUT',
    });
  } else {
    // TODO 不同的协议有不同的处理
    return request('/svc/web/policy', {
      method: 'PUT',
      data: { id },
    });
  }
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
