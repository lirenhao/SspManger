import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams, TableListData } from './data.d';

const data: TableListItem[] = [
  {
    orgId: '0001',
    orgName: 'Test',
    orgType: '0',
    publicKey: 'publicKey',
    notifyUrl: 'notifyUrl',
    privateKey: 'privateKey',
  }
];

function getAll(req: Request, res: Response) {
  const params = (parse(req.url, true).query as unknown) as TableListParams & {
    size: number;
    page: number;
  };

  const dataSource = data
    .filter(data => params.orgId ? data.orgId.includes(params.orgId) : true);

  const page: TableListData = {
    content: dataSource,
    totalElements: dataSource.length,
    totalPages: dataSource.length % params.size,
  }

  return res.json(page);
}

function get(req: Request, res: Response) {
  const orgId = req.query.id;
  return res.send(data.filter(item => item.orgId === orgId)[0]);
}

function save(req: Request, res: Response) {
  return res.end();
}

function exist(req: Request, res: Response) {
  const orgId = req.query.id;
  return res.send(data.filter(item => item.orgId === orgId).length > 0);
}

export default {
  'GET /svc/merApiOrg': getAll,
  'GET /svc/merApiOrg/{id}': get,
  'POST /svc/merApiOrg': save,
  'GET /svc/merApiOrg/{id}/exists': exist,
};