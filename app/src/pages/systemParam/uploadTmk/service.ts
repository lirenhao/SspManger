import { request } from 'umi';
import { TableListItem } from './data.d';

export async function save(params: TableListItem) {
  // console.error('params',params)
  const formData: FormData = new FormData();
  formData.append('orgId', params.orgId);
  formData.append('file', params.file);
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/pospOrgTmk/upload');
  // xhr.setRequestHeader('Content-Type','multipart/form-data')
  xhr.send(formData);
  xhr.onload = function () {
    // console.error('xhronload',this.response)
  };
}

export function getOrg() {
  return request(`/org/second`);

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve("dddddddd");
  //   }, 1000);
  // });

  // return Promise.resolve({"001":"BANK OF CHINA SINGAPORE BRANCH"})
}
