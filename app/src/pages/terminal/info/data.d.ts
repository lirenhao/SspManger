export interface TableListItem {
  terminalId?: string;
  merchantId?: string;
  terminalType?: string;
  status?: string;
  attribute?: string;
  wildcardFlag?: string;
  tranCtl?: string;
  signFlag?: string;
  batchNo?: string;
  terminalParam?: string;
  tmkZmk?: string;
  terminalBrand?: string;
  terminalModel?: string;

  lineCondition?: string;
  installAddress?: string;
  installDate?: string;
  person?: string;
  telephone?: string;
  counterName?: string;
  counterPhone?: string;

  terminalDesc?: string;
  areaCode?: string;
  timeZone?: string;
  hisInstallAddress?: string;
  recodeStat?: string;
  lastoperFlag?: string;
  modifyOper?: string;

  modifyDate?: string;
  createDate?: string;
  merchant: {
    merchantId?: string;
    merNameChn?: string;
    merNameEng?: string;
    merchantType?: string;
  };
  org: {
    orgId?: string;
    name?: string;
  };
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  merchantId?: string;
  orgId?: string;
  terminalId?: string;

  size?: number;
  page?: number;
  sort?: string[];
}

const checkStateEnum = {
  '0': 'pending',
  '1': 'approved',
  '2': 'reject',
};

const useCaseEnmu = {
  '10': 'PURCHASE',
  '11': 'PURCHASE-DEBIT CARD',
};

const operEnmu = {
  '0': 'create',
  '1': 'update',
  '2': 'delete',
};

const cardAssoEnum = {
  '0': 'VISA',
  '1': 'MasterCard',
  '2': 'UnionPay',
};

const feeTypeEnum = {
  '1': 'FIXED RATE',
  '2': 'FIXED AMOUNT',
};
export { checkStateEnum, useCaseEnmu, operEnmu, cardAssoEnum, feeTypeEnum };
