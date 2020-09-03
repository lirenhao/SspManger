import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/merSettle', {
    method: 'GET',
    params,
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/merSettle/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/merSettle/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/merSettle/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/merSettle/${id}/exists`);
}

// export async function download(params?: TableListParams) {
//   return request('/svc/ssp/merSettle/download', {
//     method: 'GET',
//     params,
//   });
// }
export async function download(params?: TableListParams) {
  let queryPara='';
  if(params){
    Object.keys(params).forEach( key=>{
      queryPara = `${queryPara  }&${  key  }=${  params[key]}`;
    })
  }
  const fileName = 'merSettle.xls';
  fetch(`/svc/ssp/merSettle/download?a=1&${queryPara}`, {
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
  return request('/svc/ssp/merSettle/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
