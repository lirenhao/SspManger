import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];

TableListDataSource.push({
  terminalId: '',
  merchantId: '',
  terminalType: '',
  status: '',
  attribute: '',
  wildcardFlag: '',
  tranCtl: '',
  signFlag: '',
  batchNo: '',
  terminalParam: '',
  tmkZmk: '',
  terminalBrand: '',
  terminalModel: '',
  lineCondition: '',
  installAddress: '',
  installDate: '',
  person: '',
  telephone: '',
  counterName: '',
  counterPhone: '',
  terminalDesc: '',
  areaCode: '',
  timeZone: '',
  hisInstallAddress: '',
  recodeStat: '',
  lastoperFlag: '',
  modifyOper: '',
  modifyDate: '',
  createDate: '',
  merchant: {
    merchantId: '',
    merNameChn: '',
    merNameEng: '',
    merchantType: '',
  },
  org: {
    orgId: 'cc',
    name: 'assa',
  },
});
TableListDataSource.push({
  terminalId: '1',
  merchantId: '2',
  terminalType: '3',
  status: '4',
  attribute: '5',
  wildcardFlag: '6',
  tranCtl: '7',
  signFlag: '8',
  batchNo: '9',
  terminalParam: '0',
  tmkZmk: '',
  terminalBrand: '',
  terminalModel: '',

  lineCondition: '',
  installAddress: '',
  installDate: '',
  person: '',
  telephone: '',
  counterName: '',
  counterPhone: '',

  terminalDesc: '',
  areaCode: '',
  timeZone: '',
  hisInstallAddress: '',
  recodeStat: '',
  lastoperFlag: '',
  modifyOper: '',

  modifyDate: '',
  createDate: '',
  merchant: {
    merchantId: '',
    merNameChn: '',
    merNameEng: '',
    merchantType: '',
  },
  org: {
    orgId: '122',
    name: '312',
  },
});
const Result = {
  data: TableListDataSource,
  total: TableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: Result.data,
  totalElements: Result.total,
  success: true,
  size: Result.pageSize,
  number: Result.current,
};

function getAll(req: Request, res: Response) {
  return res.json(pageResult);
}
function save(req: Request, res: Response) {
  Result.data[0] = {
    terminalId: '11',
    merchantId: '22',
    terminalType: '33',
    status: '44',
    attribute: '5',
    wildcardFlag: '6',
    tranCtl: '7',
    signFlag: '8',
    batchNo: '9',
    terminalParam: '11',
    tmkZmk: '',
    terminalBrand: '',
    terminalModel: '',

    lineCondition: '',
    installAddress: '',
    installDate: '',
    person: '',
    telephone: '',
    counterName: '',
    counterPhone: '',

    terminalDesc: '',
    areaCode: '',
    timeZone: '',
    hisInstallAddress: '',
    recodeStat: '',
    lastoperFlag: '',
    modifyOper: '',

    modifyDate: '',
    createDate: '',
    merchant: {
      merchantId: '',
      merNameChn: '',
      merNameEng: '',
      merchantType: '',
    },
    org: {
      orgId: '',
      name: '',
    },
  };
  res.send(200);
}

function getOne(req: Request, res: Response) {
  return res.json(Result.data[0]);
}

function remove(req: Request, res: Response) {
  if (Result.data.length > 1) {
    Result.data.pop();
    res.send(200);
  } else {
    res.send(500);
  }
}

function exist(req: Request, res: Response) {
  // console.log(req.param.id)
  res.send(false);
}

// function ccyType(req: Request, res: Response) {
//   const result = [{ccyType:'ccy1',ccyName:'ccyN1'},{ccyType:'ccy2',ccyName:'ccyN2'}]
//   res.send(result);
// }

// function countryCode(req: Request, res: Response) {
//   const result = [{internationalCode:'c1',codeName:'cN1'},{internationalCode:'c2',codeName:'cN2'}]
//   res.send(result);
// }

// function orgTree(req:Request,res:Response){
//   res.send([{"value":"00","title":"中国银行新加坡总行","children":[{"value":"001","title":"BANK OF CHINA SINGAPORE BRANCH","children":[{"value":"001001","title":"新加坡皮草","children":[]}]}]}])
// }

// function terminal(req:Request,res:Response){
//   if(req.params.id==='001'){
//     res.send([{'terminalId':'1234'},{'terminalId':'2234'}])
//   }else{
//     res.send([{'terminalId':'3234'},{'terminalId':'4234'}])
//   }
// }

export default {
  'GET /svc/ssp/terminal': getAll,
  'PUT /svc/ssp/terminal': save,
  'PUT /svc/ssp/terminal/:id': getOne,
  'DELETE /svc/ssp/terminal/:id': remove,
  'GET /svc/ssp/terminal/:id/exists': exist,
  // 'GET /svc/ssp/ccyType/list' : ccyType,
  // 'GET /svc/ssp/countryCode/list' : countryCode,
  // 'GET /svc/ssp/org/tree' : orgTree,
  // 'GET /svc/ssp/terminal/:id': terminal,
};
