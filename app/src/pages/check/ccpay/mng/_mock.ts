import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];

TableListDataSource.push({
  merchantId: '11',
  ccpayMerName: '32',
  ccpayMerPass: '3',
  staticQrc: '4',
  fee: '3',
  notifyFlag: '5',
  checkState: '6',
  checkReason: '2',
  operation: '1',
  merchant: {
    merchantId: '1',
    merNameChn: '2',
    merNameEng: '3',
    merchantType: '4',
  },
});
TableListDataSource.push({
  merchantId: '121',
  ccpayMerName: '232',
  ccpayMerPass: '33',
  staticQrc: '44',
  fee: '2',
  notifyFlag: '55',
  checkState: '66',
  checkReason: '2',
  operation: '1',
  merchant: {
    merchantId: '121',
    merNameChn: '222',
    merNameEng: '3',
    merchantType: '4',
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
    merchantId: '12221',
    ccpayMerName: '3332',
    ccpayMerPass: '3333',
    staticQrc: '444',
    notifyFlag: '55',
    checkState: '1',
    checkReason: '772',
    operation: '81',
    merchant: {
      merchantId: '1',
      merNameChn: '2',
      merNameEng: '3',
      merchantType: '4',
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

function merchant(req: Request, res: Response) {
  const result = {
    content:[
      {
        merchantId: 'string',
        merNameChn: 'string1',
        merNameEng: 'string',
      },
      {
        merchantId: 'string11',
        merNameChn: 'string22',
        merNameEng: 'string33',
      },
    ]
  }


  res.send(result);
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
  'GET /svc/ssp/ccpay': getAll,
  'PUT /svc/ssp/ccpay': save,
  'GET /svc/ssp/ccpay/:id': getOne,
  'GET /svc/ssp/ccpay/:id/check': getOne,
  'PUT /svc/ssp/ccpay/:id/check': save,
  'DELETE /svc/ssp/ccpay/:id': remove,
  'GET /svc/ssp/ccpay/:id/exists': exist,
  'GET /svc/ssp/merchant': merchant,
  // 'GET /svc/ssp/ccyType/list' : ccyType,
  // 'GET /svc/ssp/countryCode/list' : countryCode,
  // 'GET /svc/ssp/org/tree' : orgTree,
  // 'GET /svc/ssp/terminal/:id': terminal,
};
