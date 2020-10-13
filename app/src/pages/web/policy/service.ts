import { request } from 'umi';
import { TableListItem } from './data';

export async function fetchQuery() {
  return request('/svc/ssp/merPolicy');
}

export async function fetchGet(id: string) {
  return request(`/svc/ssp/merPolicy/${id}`);
}

export async function fetchIssue(id: string) {
  if (id === 'login') {
    return request('/svc/web/user/policy', {
      method: 'PUT',
    });
  }
  // TODO 不同的协议有不同的处理
  return request('/svc/web/policy', {
    method: 'PUT',
    data: { id },
  });
}

export async function fetchPut(params: TableListItem) {
  return request('/svc/ssp/merPolicy', {
    method: 'PUT',
    data: params,
  });
}

export async function fetchExistId(id: string) {
  return request(`/svc/ssp/merPolicy/${id}/exists`);
}
