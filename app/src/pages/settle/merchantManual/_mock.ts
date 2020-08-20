import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];

TableListDataSource.push({
  lsId: '111',
  inputDate: '11',
  settleDate: '20200815',
  tranAmt: '123',
  fee: '111',
  settleAmt: 'ww',
  checkState: '1',
  checkReason: '2313123',
  operation: '0',
  merchant: {
    merchantId: '',
    merNameChn: '',
    merNameEng: '',
    merchantType: '',
  },
});
TableListDataSource.push({
  lsId: '111',
  inputDate: '11',
  settleDate: '20200815',
  tranAmt: '123',
  fee: '111',
  settleAmt: 'ww',
  checkState: '1',
  checkReason: '2313123',
  operation: '0',
  merchant: {
    merchantId: '',
    merNameChn: '',
    merNameEng: '',
    merchantType: '',
  },
});
const Result = {
  data: TableListDataSource,
  total: TableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: Result.data,
  totalElements: Result.total,
  success: true,
  size: Result.pageSize,
  number: Result.current,
};

function getAll(req: Request, res: Response) {
  return res.json(pageResult);
}
function save(req: Request, res: Response) {
  res.send(200);
}

function getOne(req: Request, res: Response) {
  return res.json(Result.data[0]);
}

function remove(req: Request, res: Response) {
  if (Result.data.length > 1) {
    Result.data.pop();
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
  'GET /manualSettle': getAll,
  'PUT /manualSettle': save,
  'PUT /manualSettle/:id': getOne,
  'DELETE /manualSettle/:id': remove,
  'GET /manualSettle/:id/exists': exist,
};
