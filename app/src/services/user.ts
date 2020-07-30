import { request } from 'umi';

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return Promise.resolve({ data: [] });
}

export async function logout() {
  return request('/logout');
}
