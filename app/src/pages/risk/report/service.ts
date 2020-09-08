import { request } from 'umi';
import { TableListParams } from './data';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/riskList', {
    method: 'GET',
    params,
  });
}

// export async function save(params: TableListItem) {
//   return request('/svc/ssp/riskList', {
//     method: 'PUT',
//     data: {
//       ...params,
//       method: 'put',
//     },
//   });
// }

export async function show(riskId: String, params: TableListParams) {
  return request(`/svc/ssp/riskList/${riskId}/trans`, {
    method: 'GET',
    params,
  });
}
export async function queryRisk(params?: TableListParams) {
  return request('/svc/ssp/risk', {
    method: 'GET',
    params,
  });
}

export function getCodeEnum(response : {riskCode:string}[]){
  const codeEnum = {}
  response.forEach(e=>{
    codeEnum[e.riskCode]=e.riskCode
  })
  return codeEnum;
}