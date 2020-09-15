import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/svc/ssp/termCount/', {
    method: 'GET',
    params: {...params,...{month:params?.month?.format('YYYYMM')}}
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/termCount/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
// export async function download(params?: TableListParams) {
//   return request('/svc/ssp/termCount/download', {
//     method: 'GET',
//     params,
//   });
// }

export async function download(params?: TableListParams) {
  let queryPara='';
  if(params){
    Object.keys(params).forEach( key=>{
      queryPara = `${queryPara  }&${  key  }=${  key==='month'?params.month?.format('YYYYMM'):params[key]}`;
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