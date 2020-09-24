import { request } from 'umi';
import { LoginParamsType } from './data';

export async function fetchLogin(params: LoginParamsType) {
  return request('/admin/login', {
    method: 'POST',
    data: params,
  });
}
