import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/cupqrcSettle', {
    method: 'GET',
    params: {...params,...{settleDate:params?.settleDate?.replaceAll('-','')}}
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/cupqrcSettle/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/cupqrcSettle/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/cupqrcSettle/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/cupqrcSettle/${id}/exists`);
}

// export async function download(params?: TableListParams) {
//   return request('/svc/ssp/cupqrcSettle/download', {
//     method: 'GET',
//     params,
//   });
// }
export async function download(params?: TableListParams) {
  let queryPara='';
  if(params){
    Object.keys(params).forEach( key=>{
      queryPara = `${queryPara  }&${  key  }=${  key==='settleDate'? params[key]?.replaceAll('-',''):params[key]}`;
    })
  }
  const fileName = 'CUPQRC_SETTLE.xls';
  fetch(`/svc/ssp/cupqrcSettle/download?a=1&${queryPara}`, {
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then((response) => {
    response.blob().then(blob => {
      const aLink = document.createElement('a');
      document.body.appendChild(aLink);
      aLink.style.display='none';
      const objectUrl = window.URL.createObjectURL(blob);
      aLink.href = objectUrl;
      aLink.download = fileName;
      aLink.click();
      document.body.removeChild(aLink);
    });
  }).catch((error) => {
    console.error(error);
  });
}
export async function handle(params?: TableListParams) {
  return request('/svc/ssp/cupqrcSettle/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
