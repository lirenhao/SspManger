import { Request, Response } from 'express';
import { TableListItem } from './data.d';

const TableListDataSource: TableListItem[] = [];
TableListDataSource.push({
  riskName: 'string',
  value: 'string',
  riskCode: 'string',
});
TableListDataSource.push({
  riskName: 'string1',
  value: 'string1',
  riskCode: 'string1',
});

const Result = {
  data: TableListDataSource,
  total: TableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

function getAllriskList(req: Request, res: Response) {
  return res.json(TableListDataSource);
}

function getOne(req: Request, res: Response) {
  return res.json(Result.data[0]);
}

export default {
  'GET /svc/ssp/risk': getAllriskList,
  'PUT /svc/ssp/risk/:id': getOne,
};
