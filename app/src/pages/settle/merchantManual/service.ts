import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/manualSettle', {
    method: 'GET',
    params: {...params,...{inputDate:params?.inputDate?.replaceAll('-','')}}
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/manualSettle/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function check(params: TableListItem) {
  let queryPara='';
  if(params){
    Object.keys(params).forEach( key=>{
      queryPara = `${queryPara  }&${  key  }=${  params[key]}`;
    })
  }
  return request(`/svc/ssp/manualSettle/${params.lsId}/check?a=0&${queryPara}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function get(params: TableListItem) {
  return request(`/svc/ssp/manualSettle/${params.lsId}`, {
    method: 'PUT',
  });
}

export async function remove(params: TableListItem) {
  return request(`/svc/ssp/manualSettle/${params.lsId}`, {
    method: 'DELETE',
  });
}

export async function exist(id: String) {
  return request(`/svc/ssp/manualSettle/${id}/exists`);
}

// export async function download(params?: TableListParams) {
//   return request('/svc/ssp/manualSettle/download', {
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
  return request('/svc/ssp/manualSettle/handle', {
    method: 'GET',
    params: {
      lsId: params?.lsId,
    },
  });
}
export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant/orgId', {
    method: 'GET',
  });
}

export  function getMerEnum(responseResult : {merchantId : string,merNameEng : string}[]) {
  const merEnum = {}
  responseResult.forEach(mer=>{
    merEnum[mer.merchantId] = `${mer.merchantId}-${mer.merNameEng}`
  })
  return merEnum;

}