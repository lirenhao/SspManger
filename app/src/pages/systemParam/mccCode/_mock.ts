import { Request, Response } from 'express';
import MccCode from './data.d';

const mccTableListDataSource: MccCode.TableListItem[] = [];
mccTableListDataSource.push({
  mcc: 'mcc1',
  remark: 'remark',
});
mccTableListDataSource.push({
  mcc: 'mcc2',
});
const mccResult = {
  data: mccTableListDataSource,
  total: mccTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: mccResult.data,
  totalElements: mccResult.total,
  success: true,
  size: mccResult.pageSize,
  number: mccResult.current,
};

function getAllMccCode(req: Request, res: Response) {
  return res.json(pageResult);
}
function saveMcc(req: Request, res: Response) {
  mccResult.data[0] = {
    mcc: req.body.mcc,
    remark: req.body.remark,
  };
  res.send(200);
}

function getOneMcc(req: Request, res: Response) {
  return res.json(mccResult.data[0]);
}

function removeMcc(req: Request, res: Response) {
  if (mccResult.data.length > 1) {
    mccResult.data.pop();
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
  'GET /svc/ssp/mccCode': getAllMccCode,
  'PUT /svc/ssp/mccCode': saveMcc,
  'PUT /svc/ssp/mccCode/:id': getOneMcc,
  'DELETE /svc/ssp/mccCode/:id': removeMcc,
  'GET /svc/ssp/mccCode/:id/exists': exist,
};
