import { Request, Response } from 'express';
import orgzmk from './data.d';

const orgzmkTableListDataSource: orgzmk.TableListItem[] = [];
orgzmkTableListDataSource.push({
  orgId: 'o0',
  pwd1: 'aaaaaa',
  pwd2: 'aaaaaaa',
  checkValue: 'SSSS',
  lmkzmk: 'lmkzmk',
});
orgzmkTableListDataSource.push({
  orgId: 'o1',
  pwd1: 'aaaaaaa',
  pwd2: 'aaaaaaaa',
  checkValue: 'SSSS',
  lmkzmk: 'lmkzmk',
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
    pwd1: req.body.bankName,
    pwd2: req.body.bic,
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
  'GET /pospOrgZmk': getAllorgzmkCode,
  'PUT /pospOrgZmk': saveorgzmk,
  'PUT /pospOrgZmk/:id': getOneorgzmk,
  'DELETE /pospOrgZmk/:id': removeorgzmk,
  'GET /pospOrgZmk/:id/exists': exist,
};
