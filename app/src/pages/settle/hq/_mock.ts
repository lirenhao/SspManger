import { Request, Response } from 'express';
import Code from './data.d';

const TableListDataSource: Code.TableListItem[] = [];
TableListDataSource.push({
  month: ' 11',
  /*  存量商户数 */
  merNum: ' 2',
  /*  存量上月环比 */
  merNumMonthPer: '3 ',
  /*  存量上年环比 */
  merNumYearPer: ' 4',
  /*  当月新增商户数 */
  addNum: ' 5',
  /*  当月流失商户数 */
  lossNum: '6 ',
  /*  当月交易量 */
  curTran: '7 ',
  /*  当月交易量上月环比 */
  curTranMonthPer: ' 8',
  /*  当月交易量上年环比 */
  curTranYearPer: '9 ',
  /*  当年累计交易量 */
  sumTran: '00 ',
  /*  当年交易量上月环比 */
  sumTranMonthPer: ' ',
  /*  当年交易量上年环比 */
  sumTranYearPer: ' ',
  /*  POS终端数 */
  posNum: ' ',
  /*  POS终端数上月环比 */
  posNumMonthPer: ' ',
  /*  POS终端数上年环比 */
  posNumYearPer: ' ',
  /*  二维码终端数 */
  barNum: ' ',
});
TableListDataSource.push({
  month: ' 12',
  /*  存量商户数 */
  merNum: ' 32',
  /*  存量上月环比 */
  merNumMonthPer: ' ',
  /*  存量上年环比 */
  merNumYearPer: ' ',
  /*  当月新增商户数 */
  addNum: ' ',
  /*  当月流失商户数 */
  lossNum: ' ',
  /*  当月交易量 */
  curTran: ' ',
  /*  当月交易量上月环比 */
  curTranMonthPer: ' ',
  /*  当月交易量上年环比 */
  curTranYearPer: ' ',
  /*  当年累计交易量 */
  sumTran: ' ',
  /*  当年交易量上月环比 */
  sumTranMonthPer: ' ',
  /*  当年交易量上年环比 */
  sumTranYearPer: ' ',
  /*  POS终端数 */
  posNum: ' ',
  /*  POS终端数上月环比 */
  posNumMonthPer: ' ',
  /*  POS终端数上年环比 */
  posNumYearPer: ' ',
  /*  二维码终端数 */
  barNum: ' ',
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

function ccyType(req: Request, res: Response) {
  const result = [
    { ccyType: 'ccy1', ccyName: 'ccyN1' },
    { ccyType: 'ccy2', ccyName: 'ccyN2' },
  ];
  res.send(result);
}

function countryCode(req: Request, res: Response) {
  const result = [
    { internationalCode: 'c1', codeName: 'cN1' },
    { internationalCode: 'c2', codeName: 'cN2' },
  ];
  res.send(result);
}

function orgTree(req: Request, res: Response) {
  res.send([
    {
      value: '00',
      title: '中国银行新加坡总行',
      children: [
        {
          value: '001',
          title: 'BANK OF CHINA SINGAPORE BRANCH',
          children: [{ value: '001001', title: '新加坡皮草', children: [] }],
        },
      ],
    },
  ]);
}

function terminal(req: Request, res: Response) {
  if (req.params.id === '001') {
    res.send([{ terminalId: '1234' }, { terminalId: '2234' }]);
  } else {
    res.send([{ terminalId: '3234' }, { terminalId: '4234' }]);
  }
}

export default {
  'GET /hqReport': getAll,
  'PUT /hqReport': save,
  'PUT /hqReport/:id': getOne,
  'DELETE /hqReport/:id': remove,
  'GET /hqReport/:id/exists': exist,
  'GET /ccyType/list': ccyType,
  'GET /countryCode/list': countryCode,
  'GET /org/tree': orgTree,
  'GET /terminal/:id': terminal,
};
