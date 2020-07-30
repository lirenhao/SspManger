import { request } from 'umi';
import { ModifyData } from './data.d';

export async function modifyPwd(params: ModifyData) {
  return request('/change_pwd', {
    method: 'POST',
    data: params,
  });
}
