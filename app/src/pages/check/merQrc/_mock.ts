import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];
TableListDataSource.push({
  lsId: 'string1',
  terminalId: 'string1',
  createDate: 'string2',
  merchantId: 'asdasda',
  ccyCode: {
    ccyType: 'ccy1',
    ccyName: 'string4',
  },
  useCase: '1',
  qrValue: 'string6',
  cardAsso: '2',
  checkState: '1',
  checkReason: 'string9',
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
  terminalId: 'string',
  createDate: 'string',
  merchantId: 'sadasd',
  ccyCode: {
    ccyType: 'ccy1',
    ccyName: 'string',
  },
  useCase: '0',
  qrValue: 'string',
  cardAsso: '0',
  checkState: '0',
  checkReason: 'string',
  operation: '1',
  merchant: {
    merchantId: 'mId',
    merNameChn: 'cn',
    merNameEng: 'en',
    merchantType: 'J',
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
    lsId: 'string2333',
    terminalId: '1string',
    createDate: '2string',
    merchantId: 'zxccz',
    ccyCode: {
      ccyType: '3string',
      ccyName: '4string',
    },
    useCase: '5string',
    qrValue: '6string',
    cardAsso: '7string',
    checkState: '8string',
    checkReason: '9string',
    operation: '0string',
    merchant: {
      merchantId: 'sadasd',
      merNameChn: 'cn',
      merNameEng: 'en',
      merchantType: 'J',
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

function ccyType(req: Request, res: Response) {
  const result = [
    { ccyType: 'ccy1', ccyName: 'ccyN1' },
    { ccyType: 'ccy2', ccyName: 'ccyN2' },
  ];
  res.send(result);
}

function countryCode(req: Request, res: Response) {
  const result = [
    { internationalCode: 'c1', codeName: 'cN1' },
    { internationalCode: 'c2', codeName: 'cN2' },
  ];
  res.send(result);
}

function orgTree(req: Request, res: Response) {
  res.send([
    {
      value: '00',
      title: '中国银行新加坡总行',
      children: [
        {
          value: '001',
          title: 'BANK OF CHINA SINGAPORE BRANCH',
          children: [{ value: '001001', title: '新加坡皮草', children: [] }],
        },
      ],
    },
  ]);
}

function terminal(req: Request, res: Response) {
  if (req.params.id === '001') {
    res.send([{ terminalId: '1234' }, { terminalId: '2234' }]);
  } else {
    res.send([{ terminalId: '3234' }, { terminalId: '4234' }]);
  }
}

export default {
  'GET /svc/ssp/staticQrc': getAll,
  'PUT /svc/ssp/staticQrc': save,
  'PUT /svc/ssp/staticQrc/:id': getOne,
  'DELETE /svc/ssp/staticQrc/:id': remove,
  'GET /svc/ssp/staticQrc/:id/exists': exist,
  'GET /svc/ssp/ccyType/list': ccyType,
  'GET /svc/ssp/countryCode/list': countryCode,
  'GET /svc/ssp/org/tree': orgTree,
  'GET /svc/ssp/terminal/:id': terminal,
};
