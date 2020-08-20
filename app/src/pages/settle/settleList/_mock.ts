import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];

TableListDataSource.push({
  merchantId: '12355',
  settleDate: '20200818',
  acqOrgName: '11',
  bocOrg: '',
  merNameEng: '',
  accountNo: '',
  accountName: '',
  bicCode: '',
  accountBankName: '',
  tranCount: '3',
  tranAmt: '5',
  fee: '',
  settleAmt: '',
});
TableListDataSource.push({
  merchantId: '12355',
  settleDate: '20200818',
  acqOrgName: '',
  bocOrg: '',
  merNameEng: '',
  accountNo: '',
  accountName: '',
  bicCode: '',
  accountBankName: '',
  tranCount: '0',
  tranAmt: '0',
  fee: '',
  settleAmt: '',
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
  // Result.data[0] = {
  //   lsId: 'string23',
  //   merchantId:'asdasda1',
  //   feeType:'1',
  //   tranCnt:'0',
  //   tranAmt:'1',
  //   fee:'2',
  //   feeMinAmt:'3',
  //   startDate: '20200101',
  //   closeDate: '20200102',
  //   cardOrgNum:'2',
  //   checkState:'1',
  //   operation:'0',
  //   merchant:{
  //     merchantId : 'mId',
  //     merNameChn:'cn11',
  //     merNameEng:'en22',
  //     merchantType:'J33',
  //   }
  // };
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
  'GET /cupqrcSettle': getAll,
  'PUT /cupqrcSettle': save,
  'PUT /cupqrcSettle/:id': getOne,
  'DELETE /cupqrcSettle/:id': remove,
  'GET /cupqrcSettle/:id/exists': exist,
};
