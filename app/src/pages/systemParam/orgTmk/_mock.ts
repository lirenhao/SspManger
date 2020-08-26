import { Request, Response } from 'express';
import orgzmk from './data.d';

const orgzmkTableListDataSource: orgzmk.TableListItem[] = [];
orgzmkTableListDataSource.push({
  orgId: 'o0',
  tmkZmk: 'aaaaaa1',
  tmkWeb: 'aaaaaaa11',
  terminalId: 'SSSS',
  lmkzmk: 'lmkzmk',
  org: {
    name: 'AAAAAAAAAAA',
  },
});
orgzmkTableListDataSource.push({
  orgId: 'o1',
  tmkZmk: 'aaaaaaa2',
  tmkWeb: 'aaaaaaaa22',
  terminalId: 'SSSS',
  lmkzmk: 'lmkzmk',
  org: {
    name: 'BBBBBBBBBBB',
  },
});
const orgzmkResult = {
  data: orgzmkTableListDataSource,
  total: orgzmkTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: orgzmkResult.data,
  totalElements: orgzmkResult.total,
  success: true,
  size: orgzmkResult.pageSize,
  number: orgzmkResult.current,
};

function getAllorgzmkCode(req: Request, res: Response) {
  return res.json(pageResult);
}
function saveorgzmk(req: Request, res: Response) {
  orgzmkResult.data[0] = {
    orgId: req.body.accountBankNo,
    tmkZmk: req.body.bankName,
    tmkWeb: req.body.bic,
    org: { name: 'CCCCCCCCCCCCC' },
  };
  res.send(200);
}

function getOneorgzmk(req: Request, res: Response) {
  return res.json(orgzmkResult.data[0]);
}

function removeorgzmk(req: Request, res: Response) {
  if (orgzmkResult.data.length > 1) {
    orgzmkResult.data.pop();
    res.send(200);
  } else {
    res.send(500);
  }
}

function exist(req: Request, res: Response) {
  // console.log(req.param.id)
  res.send(false);
}

export default {
  'GET /svc/ssp/pospOrgTmk': getAllorgzmkCode,
  'PUT /svc/ssp/pospOrgTmk': saveorgzmk,
  'PUT /svc/ssp/pospOrgTmk/:id': getOneorgzmk,
  'DELETE /svc/ssp/pospOrgTmk/:id': removeorgzmk,
  'GET /svc/ssp/pospOrgTmk/:id/exists': exist,
};
