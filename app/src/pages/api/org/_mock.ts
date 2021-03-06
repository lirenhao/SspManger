import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams, TableListData } from './data.d';

const data: TableListItem[] = [
  {
    orgId: '0001',
    orgName: 'Test',
    orgType: '0',
    publicKey: 'publicKey',
    notifyUrl: 'http://test.com',
    privateKey: 'privateKey',
  },
];

function getAll(req: Request, res: Response) {
  const params = (parse(req.url, true).query as unknown) as TableListParams & {
    size: number;
    page: number;
  };

  const dataSource = data.filter((data1) =>
    params.orgId ? data1.orgId.includes(params.orgId) : true,
  );

  const page: TableListData = {
    content: dataSource,
    totalElements: dataSource.length,
    totalPages: dataSource.length % params.size,
  };
  return res.json(page);
}

function getList(_: Request, res: Response) {
  return res.send(data);
}

function get(req: Request, res: Response) {
  const orgId = req.params.id;
  return res.send(data.filter((item) => item.orgId === orgId)[0]);
}

function save(req: Request, res: Response) {
  data.push(req.body);
  return res.end();
}

function update(_: Request, res: Response) {
  return res.end();
}

function del(req: Request, res: Response) {
  const orgId = req.params.id;
  delete data[data.map((item) => item.orgId).indexOf(orgId)];
  return res.end();
}

function exist(req: Request, res: Response) {
  const orgId = req.params.id;
  return res.send(data.filter((item) => item.orgId === orgId).length > 0);
}

export default {
  'GET /svc/ssp/merApiOrg': getAll,
  'GET /svc/ssp/merApiOrg/list': getList,
  'GET /svc/ssp/merApiOrg/:id': get,
  'POST /svc/ssp/merApiOrg': save,
  'PUT /svc/ssp/merApiOrg': update,
  'DELETE /svc/ssp/merApiOrg/:id': del,
  'GET /svc/ssp/merApiOrg/:id/exists': exist,
};
