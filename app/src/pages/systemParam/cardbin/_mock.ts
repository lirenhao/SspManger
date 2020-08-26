import { Request, Response } from 'express';
import Cardbin from './data.d';

const cardbinTableListDataSource: Cardbin.TableListItem[] = [];

cardbinTableListDataSource.push({
  id: 'string1',
  issuerIin: 'issuerIin',
  issuerName: 'issuerName',
  cardLevel: 'cardLevel',
  issuingRegion: 'issuingRegion',
  cardProduct: 'cardProduct',
  pctBusinessType: 'pctBusinessType',
  billingCurrency1: 1,
  billingCurrency2: 12,
  billingCurrency3: 123,
  reserved: 'reserved',
  binLength: 1234,
  bin: 'bin',
  panLength: 12345,
  cardType: 'cardType',
  singleDualMessage: 'singleDualMessage',
  transationTypeSupported: 123456,
  transationChannelSupported: 1234567,
  networkOpened: 12345678,
});
cardbinTableListDataSource.push({
  id: 'string2',
  issuerIin: 'string',
  issuerName: 'string',
  cardLevel: 'string',
  issuingRegion: 'string',
  cardProduct: 'string',
  pctBusinessType: 'string',
  billingCurrency1: 123,
  billingCurrency2: 123,
  billingCurrency3: 123,
  reserved: 'string',
  binLength: 123,
  bin: 'string',
  panLength: 123,
  cardType: 'string',
  singleDualMessage: 'string',
  transationTypeSupported: 123,
  transationChannelSupported: 123,
  networkOpened: 123,
});
const cardbinResult = {
  data: cardbinTableListDataSource,
  total: cardbinTableListDataSource.length,
  success: true,
  pageSize: 10,
  current: 0,
};

const pageResult = {
  content: cardbinResult.data,
  totalElements: cardbinResult.total,
  success: true,
  size: cardbinResult.pageSize,
  number: cardbinResult.current,
};

function getAllcardbin(req: Request, res: Response) {
  return res.json(pageResult);
}

function getOnecardbin(req: Request, res: Response) {
  return res.json(cardbinResult.data[0]);
}

function removecardbin(req: Request, res: Response) {
  if (cardbinResult.data.length > 1) {
    cardbinResult.data.pop();
    res.send(200);
  } else {
    res.send(500);
  }
}

export default {
  'GET /svc/ssp/cupCardBin': getAllcardbin,
  'PUT /svc/ssp/cupCardBin/cardbin': getOnecardbin,
  'DELETE /svc/ssp/cupCardBin/cardbin': removecardbin,
};
