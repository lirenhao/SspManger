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

function getAllCcy(req: Request, res: Response) {
  return res.json(ccyResult);
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

export default {
  'GET /ccyType': getAllCcy,
  'PUT /ccyType': saveCcy,
  'PUT /ccyType/ccy': getOneCcy,
  'DELETE /ccyType/ccy': removeCcy,
};