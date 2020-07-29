import { Request, Response } from 'express';
import AppRole from '@/pages/systemParam/AppRole/data';

const tableListDataSource: AppRole.TableListItem[] = [];
tableListDataSource.push({
  key: 1,
  role: 'admin',
  roleName: 'admin',
  roleDescripiton: 'this is admin   ',
});
tableListDataSource.push({
  key: 2,
  role: 'user',
  roleName: 'user',
});

const result = {
  data: tableListDataSource,
  total: tableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

function getAllRole(req: Request, res: Response) {
  return res.json(result);
}

function getShow(req: Request, res: Response) {
  return res.json({
    key: 1,
    role: 'admin',
    roleName: 'admin',
    roleDescripiton: 'this is admin',
  });
}

function save(req: Request, res: Response) {
  tableListDataSource.push({
    key: tableListDataSource.length + 1,
    role: 'test',
    roleName: 'test',
    roleDescripiton: 'test',
  });
  return res.json({
    success: true,
  });
}

export default {
  'GET /approle/list': getAllRole,
  'GET /approle/show': getShow,
  'POST /approle/save': save,
};
