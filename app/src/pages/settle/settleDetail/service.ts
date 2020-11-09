import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  let dateStartEnd = {};
  if (params?.settleDate) {
    dateStartEnd = {
      settleStartDate: params.settleDate[0].replaceAll('-', ''),
      settleEndDate: params.settleDate[1].replaceAll('-', ''),
    };
  }
  return request('/svc/ssp/settleDetail', {
    method: 'GET',
    params: { ...params, ...dateStartEnd },
  });
}

export async function save(params: TableListItem) {
  return request(`/svc/ssp/settleDetail/${params.merchantId}/check`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

// export async function download(params?: TableListParams) {
//   return request('/svc/ssp/settleDetail/download', {
//     method: 'GET',
//     params,
//   });
// }

export async function download(params?: TableListParams) {
  let queryPara = '';
  if (params) {
    Object.keys(params).forEach((key) => {
      // queryPara = `${queryPara  }&${  key  }=${  key==='settleDate'? params[key]?.replaceAll('-',''):params[key]}`;
      if (key === 'settleDate' && params.settleDate) {
        queryPara = `${queryPara}&settleStartDate=${params.settleDate[0].replaceAll(
          '-',
          '',
        )}&settleEndDate=${params.settleDate[1].replaceAll('-', '')}`;
      } else {
        queryPara = `${queryPara}&${key}=${params[key]}`;
      }
    });
  }
  const fileName = 'MER_SETTLE_DETAIL.xls';
  fetch(`/svc/ssp/settleDetail/download?a=1&${queryPara}`, {
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => {
      response.blob().then((blob) => {
        const aLink = document.createElement('a');
        document.body.appendChild(aLink);
        aLink.style.display = 'none';
        const objectUrl = window.URL.createObjectURL(blob);
        aLink.href = objectUrl;
        aLink.download = fileName;
        aLink.click();
        document.body.removeChild(aLink);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function fetchGetAllMer() {
  return request('/svc/ssp/merchant/orgId', {
    method: 'GET',
  });
}

export function getMerEnum(responseResult: { merchantId: string; merNameEng: string }[]) {
  const merEnum = {};
  responseResult.forEach((mer) => {
    merEnum[mer.merchantId] = `${mer.merchantId}-${mer.merNameEng}`;
  });
  return merEnum;
}
