import { request } from 'umi';

export function getOrg() {
  return request(`/org/second`);
}
