import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {

  return request('/svc/ssp/cupAcomn', {
    method: 'GET',
    params: {...params,...{settleDate:params?.settleDate?.replaceAll('-','')}}
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/cupAcomn/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/cupAcomn/${params.merchantId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/cupAcomn/${params.merchantId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/cupAcomn/${id}/exists`);
}

export async function download(params?: TableListParams) {
  let queryPara='';
  if(params){
    Object.keys(params).forEach( key=>{
      queryPara = `${queryPara  }&${  key  }=${  params[key]}`;
    })
  }
  const fileName = 'CUP_ACOMN.xls';
  // const query = `lsId=${params?.lsId}&merchantId=${params?.merchantId}&settleDate=${params?.settleDate}&page=${params?.page}`;
  fetch(`/svc/ssp/cupAcomn/download?a=1&${queryPara}`, {
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
  return request('/svc/ssp/cupAcomn/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
