import { Request, Response } from 'express';
import { TableListItem, ViewItem } from './data.d';

const TableListDataSource: TableListItem[] = [];
TableListDataSource.push({
  riskId: 'string',
  riskDate: 'string',
  merchantId: 'string',
  riskCode: 'string',
});
TableListDataSource.push({
  riskId: 'string1',
  riskDate: 'string1',
  merchantId: 'string1',
  riskCode: 'string1',
});

const tranSource: ViewItem[] = [];

function getAllriskList(req: Request, res: Response) {
  return res.json(TableListDataSource);
}

function getOne(req: Request, res: Response) {
  return res.json(TableListDataSource[0]);
}

function tran(req: Request, res: Response) {
  return res.json(tranSource[0]);
}

export default {
  'GET /svc/ssp/riskList': getAllriskList,
  'PUT /svc/ssp/riskList/:id': getOne,
  'GET /svc/ssp/riskList/:id/trans': tran,
};
