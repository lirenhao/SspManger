import { Request, Response } from 'express';
import ccy from './data.d';

const ccyTableListDataSource: ccy.TableListItem[] = [];

ccyTableListDataSource.push({
  ccyType: 'ccy',
  ccyName: 'name',
  ccyEname: 'eName',
  ccySymbol: 'sym',
});
ccyTableListDataSource.push({
  ccyType: 'ccy1',
  ccyName: 'nameasd',
});
const ccyResult = {
  data: ccyTableListDataSource,
  total: ccyTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: ccyResult.data,
  totalElements: ccyResult.total,
  success: true,
  size: ccyResult.pageSize,
  number: ccyResult.current,
};

function getAllCcy(req: Request, res: Response) {
  return res.json(pageResult);
}
function saveCcy(req: Request, res: Response) {
  ccyResult.data[0] = {
    ccyType: req.body.ccyType,
    ccyName: req.body.ccyName,
    ccyEname: req.body.ccyEname,
    ccySymbol: req.body.ccySymbol,
  };
  res.send(200);
}

function getOneCcy(req: Request, res: Response) {
  return res.json(ccyResult.data[0]);
}

function removeCcy(req: Request, res: Response) {
  if (ccyResult.data.length > 1) {
    ccyResult.data.pop();
    res.send(200);
  } else {
    res.send(500);
  }
}

function existsCcy(req: Request, res: Response) {
  // const falseResult = {result:false}
  // res.json(falseResult)
  res.send(false);
}

export default {
  'GET /svc/ssp/ccyType': getAllCcy,
  'PUT /svc/ssp/ccyType': saveCcy,
  'PUT /svc/ssp/ccyType/ccy': getOneCcy,
  'DELETE /svc/ssp/ccyType/ccy': removeCcy,
  'GET /svc/ssp/ccyType/{id}/exists': existsCcy,
  'GET /svc/ssp/ccyType/aaa/exists': existsCcy,
};
