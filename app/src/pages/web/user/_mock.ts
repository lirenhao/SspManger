import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams, TableListData } from './data.d';

const data: TableListItem[] = [
  {
    id: '104767999000004@admin',
    orgId: '00',
    roles: ['admin', 'user'],
    status: '00',
    email: 'email@email.com',
  }
];

function getAll(req: Request, res: Response) {
  const params = (parse(req.url, true).query as unknown) as TableListParams & {
    size: number;
    page: number;
  };

  const dataSource = data
    .filter(item => params.orgId ? item.orgId.includes(params.orgId) : true);

  const page: TableListData = {
    content: dataSource,
    totalElements: dataSource.length,
    totalPages: dataSource.length % params.size,
  }
  return res.json(page);
}

function get(req: Request, res: Response) {
  const { id } = req.params;
  return res.send(data.filter(item => item.id === id)[0]);
}

function save(req: Request, res: Response) {
  data.push(req.body);
  return res.end();
}

function update(_: Request, res: Response) {
  return res.end();
}

function del(req: Request, res: Response) {
  const { id } = req.params;
  delete data[data.map(item => item.id).indexOf(id)];
  return res.end();
}

function exist(req: Request, res: Response) {
  const { id } = req.params;
  return res.send(data.filter(item => item.id === id).length > 0);
}

export default {
  'GET /svc/web/user': getAll,
  'GET /svc/web/user/list': data,
  'GET /svc/web/user/:id': get,
  'POST /svc/web/user': save,
  'PUT /svc/web/user': update,
  'DELETE /svc/web/user/:id': del,
  'GET /svc/web/user/:id/exists': exist,
};
