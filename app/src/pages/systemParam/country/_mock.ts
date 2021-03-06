import { Request, Response } from 'express';
import country from './data.d';

const countryTableListDataSource: country.TableListItem[] = [];

countryTableListDataSource.push({
  internationalCode: 'country',
  codeName: 'CN',
  codeEname: 'en',
});
countryTableListDataSource.push({
  internationalCode: 'country1',
  codeName: 'CN1',
  codeEname: 'en1',
});
const countryResult = {
  data: countryTableListDataSource,
  total: countryTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: countryResult.data,
  totalElements: countryResult.total,
  success: true,
  size: countryResult.pageSize,
  number: countryResult.current,
};

function getAllcountry(req: Request, res: Response) {
  return res.json(pageResult);
}
function savecountry(req: Request, res: Response) {
  countryResult.data[0] = {
    internationalCode: req.body.internationalCode,
    codeEname: req.body.codeEname,
    codeName: req.body.codeName,
  };
  res.send(200);
}

function getOnecountry(req: Request, res: Response) {
  return res.json(countryResult.data[0]);
}

function removecountry(req: Request, res: Response) {
  if (countryResult.data.length > 1) {
    countryResult.data.pop();
    res.send(200);
  } else {
    res.send(500);
  }
}

function exists(req: Request, res: Response) {
  res.send(false);
}

export default {
  'GET /svc/ssp/countryCode': getAllcountry,
  'PUT /svc/ssp/countryCode': savecountry,
  'PUT /svc/ssp/countryCode/country': getOnecountry,
  'DELETE /svc/ssp/countryCode/country': removecountry,
  'GET /svc/ssp/countryCode/id/exists': exists,
  'GET /svc/ssp/countryCode/{id}/exists': exists,
};
