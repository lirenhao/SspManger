import { Request, Response } from 'express';
import MccCode from '@/pages/systemParam/MccCode/data';

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

function getAllMccCode(req: Request, res: Response) {
  return res.json(mccResult);
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

export default {
  'GET /mccCode': getAllMccCode,
  'PUT /mccCode': saveMcc,
  'PUT /mccCode/mcc2': getOneMcc,
  'DELETE /mccCode/mcc2': removeMcc,
};
