import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];

TableListDataSource.push({
  lsId: 'string1',
  merchantId: 'asdasda',
  feeType: '1',
  tranCnt: '0',
  tranAmt: '1',
  fee: '2',
  feeMinAmt: '3',
  startDate: '20200101',
  closeDate: '20200102',
  cardOrgNum: '2',
  checkState: '1',
  operation: '0',
  merchant: {
    merchantId: 'mId',
    merNameChn: 'cn11',
    merNameEng: 'en22',
    merchantType: 'J33',
  },
});
TableListDataSource.push({
  lsId: 'string2',
  merchantId: 'asdasda',
  feeType: '2',
  tranCnt: '0',
  tranAmt: '1',
  fee: '2',
  feeMinAmt: '3',
  startDate: '20200101',
  closeDate: '20200102',
  cardOrgNum: '1',
  checkState: '1',
  operation: '0',
  merchant: {
    merchantId: 'mId',
    merNameChn: 'cn11',
    merNameEng: 'en22',
    merchantType: 'J33',
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
    lsId: 'string23',
    merchantId: 'asdasda1',
    feeType: '1',
    tranCnt: '0',
    tranAmt: '1',
    fee: '2',
    feeMinAmt: '3',
    startDate: '20200101',
    closeDate: '20200102',
    cardOrgNum: '2',
    checkState: '1',
    operation: '0',
    merchant: {
      merchantId: 'mId',
      merNameChn: 'cn11',
      merNameEng: 'en22',
      merchantType: 'J33',
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
  'GET /merchantFee': getAll,
  'PUT /merchantFee': save,
  'PUT /merchantFee/:id': getOne,
  'DELETE /merchantFee/:id': remove,
  'GET /merchantFee/:id/exists': exist,
  // 'GET /ccyType/list' : ccyType,
  // 'GET /countryCode/list' : countryCode,
  // 'GET /org/tree' : orgTree,
  // 'GET /terminal/:id': terminal,
};
