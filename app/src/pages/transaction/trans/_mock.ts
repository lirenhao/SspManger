import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];

TableListDataSource.push({
  traceNo: '1',
  batchNo: '1',
  tranAmt: '1',
  tranType: '1',
  tranDate: '1',
  tranTime: '1',
  channel: '1',
  cardNo: '1',
  merNo: '1',
  termNo: '1',
  rrn: '1',
  respCode: '1',
  merTraceNo: '1',
  channelTraceNo: '1',
});
TableListDataSource.push({
  traceNo: '0',
  batchNo: '0',
  tranAmt: '0',
  tranType: '0',
  tranDate: '0',
  tranTime: '0',
  channel: '0',
  cardNo: '0',
  merNo: '0',
  termNo: '0',
  rrn: '0',
  respCode: '0',
  merTraceNo: '0',
  channelTraceNo: '0',
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
  console.error('getAll', pageResult);
  return res.json(pageResult);
}
function save(req: Request, res: Response) {
  Result.data[0] = {
    traceNo: '0',
    batchNo: '0',
    tranAmt: '0',
    tranType: '0',
    tranDate: '0',
    tranTime: '0',
    channel: '0',
    cardNo: '0',
    merNo: '0',
    termNo: '0',
    rrn: '0',
    respCode: '0',
    merTraceNo: '0',
    channelTraceNo: '0',
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
  'GET /trans': getAll,
  'PUT /trans': save,
  'PUT /trans/:id': getOne,
  'DELETE /trans/:id': remove,
  'GET /trans/:id/exists': exist,
  // 'GET /ccyType/list' : ccyType,
  // 'GET /countryCode/list' : countryCode,
  // 'GET /org/tree' : orgTree,
  // 'GET /terminal/:id': terminal,
};
