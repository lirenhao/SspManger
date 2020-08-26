import { Request, Response } from 'express';
import banks from './data.d';

const banksTableListDataSource: banks.TableListItem[] = [];
banksTableListDataSource.push({
  accountBankNo: 'abn1',
  bankName: 'bankName1',
  bic: 'bic',
});
banksTableListDataSource.push({
  accountBankNo: 'abn2',
  bankName: 'bankName2',
  bic: 'bic',
});
const banksResult = {
  data: banksTableListDataSource,
  total: banksTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: banksResult.data,
  totalElements: banksResult.total,
  success: true,
  size: banksResult.pageSize,
  number: banksResult.current,
};

function getAllbanksCode(req: Request, res: Response) {
  return res.json(pageResult);
}
function savebanks(req: Request, res: Response) {
  banksResult.data[0] = {
    accountBankNo: req.body.accountBankNo,
    bankName: req.body.bankName,
    bic: req.body.bic,
  };
  res.send(200);
}

function getOnebanks(req: Request, res: Response) {
  return res.json(banksResult.data[0]);
}

function removebanks(req: Request, res: Response) {
  if (banksResult.data.length > 1) {
    banksResult.data.pop();
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
  'GET /svc/ssp/bankList': getAllbanksCode,
  'PUT /svc/ssp/bankList': savebanks,
  'PUT /svc/ssp/bankList/:id': getOnebanks,
  'DELETE /svc/ssp/bankList/:id': removebanks,
  'GET /svc/ssp/bankList/:id/exists': exist,
};
