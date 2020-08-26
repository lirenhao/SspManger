import { request } from 'umi';

export function getOrg() {
  return request(`/svc/ssp/org/second`);
}
