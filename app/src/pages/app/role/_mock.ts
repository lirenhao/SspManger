import { Request, Response } from 'express';
import { TableListItem } from './data.d';

const tableListDataSource: TableListItem[] = [];
tableListDataSource.push({
  id: 'id',
  name: 'admin',
  remark: 'this is admin   ',
});
tableListDataSource.push({
  id: 'id1',
  name: 'user',
});

const result = {
  data: tableListDataSource,
  total: tableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: result.data,
  totalElements: result.total,
  success: true,
  size: result.pageSize,
  number: result.current,
};

function getAllRole(req: Request, res: Response) {
  return res.json(pageResult);
}

function getShow(req: Request, res: Response) {
  return res.json({
    id: 'id',
    name: 'admin',
    remark: 'this is admin',
  });
}

function save(req: Request, res: Response) {
  tableListDataSource.push({
    id: 'test',
    name: 'test',
    remark: 'test',
  });
  return res.json({
    success: true,
  });
}

function exist(req: Request, res: Response) {
  return res.send(false);
}

export default {
  'GET /svc/ssp/appRole': getAllRole,
  'GET /svc/ssp/appRole/id': getShow,
  'PUT /svc/ssp/appRole': save,
  'GET /svc/ssp/appRole/id/exists': exist,
};
