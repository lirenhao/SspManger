import { Request, Response } from 'express';
import MccCode from './data.d';

const mccTableListDataSource: MccCode.TableListItem[] = [];
mccTableListDataSource.push({
  merchantId: 'string',
  ccyType: '1',
  internationalCode: 'string',
  checkState: '0',
  checkReason: 'string',
  operation: '2',
  merchant: {
    merNameChn: 'cn',
    merNameEng: 'en',
    merchantType: 'J',
  },
});
mccTableListDataSource.push({
  merchantId: 'string1',
  ccyType: '2',
  internationalCode: 'string',
  checkState: '1',
  checkReason: '1',
  operation: 'string',
  merchant: {
    merNameChn: 'cn1',
    merNameEng: 'en1',
    merchantType: 'O',
  },
});
const mccResult = {
  data: mccTableListDataSource,
  total: mccTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: mccResult.data,
  totalElements: mccResult.total,
  success: true,
  size: mccResult.pageSize,
  number: mccResult.current,
};

function getAll(req: Request, res: Response) {
  return res.json(pageResult);
}
function save(req: Request, res: Response) {
  mccResult.data[0] = {
    merchantId: 'string',
    ccyType: 'string111',
    internationalCode: 'string',
    checkState: '2',
    checkReason: 'string',
    operation: '1',
    merchant: {
      merNameChn: 'cn222',
      merNameEng: 'en222',
      merchantType: 'J',
    },
  };
  res.send(200);
}

function getOne(req: Request, res: Response) {
  return res.json(mccResult.data[0]);
}

function remove(req: Request, res: Response) {
  if (mccResult.data.length > 1) {
    mccResult.data.pop();
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

export default {
  'GET /svc/ssp/merchantExtra': getAll,
  'PUT /svc/ssp/merchantExtra': save,
  'PUT /svc/ssp/merchantExtra/:id': getOne,
  'DELETE /svc/ssp/merchantExtra/:id': remove,
  'GET /svc/ssp/merchantExtra/:id/exists': exist,
  'GET /svc/ssp/ccyType/list': ccyType,
  'GET /svc/ssp/countryCode/list': countryCode,
};
