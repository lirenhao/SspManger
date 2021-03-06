import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(isSuccess: boolean, params?: TableListParams) {
  let dateStartEnd={}
  if(params?.settleDate){
   dateStartEnd = {settleStartDate:params.settleDate[0].replaceAll('-',''),settleEndDate:params.settleDate[1].replaceAll('-','')}
  }
  
  if (isSuccess) {
    return request('/svc/ssp/merSettle/success', {
      method: 'GET',
      params:{...params,...dateStartEnd}
    });
  }
  return request('/svc/ssp/merSettle/failure', {
    method: 'GET',
    params:{...params,...dateStartEnd}
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

export async function download(isSuccess: boolean, params?: TableListParams) {
  let url = ''
  let queryPara='';
  let fileName = '.xls';
  if(params){
    Object.keys(params).forEach( key=>{
      if(key==='settleDate'&&params.settleDate){
        queryPara = `${queryPara  }&settleStartDate=${  params.settleDate[0].replaceAll('-','')}&settleEndDate=${  params.settleDate[1].replaceAll('-','')}`;
      }else{
        queryPara = `${queryPara  }&${  key  }=${  params[key]}`;
      }
    })
  }
  if (isSuccess) {
    url = `/svc/ssp/merSettle/success/download?a=1&${queryPara}`
    fileName = 'merSettleSuccess.xls'

  }else{
    url = `/svc/ssp/merSettle/failure/download?a=1&${queryPara}`
    fileName = 'merSettleFailure.xls'
  }
  fetch(url, {
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




