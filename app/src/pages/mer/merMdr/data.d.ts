export interface TableListItem {
  lsId?: string;
  merchantId?: string;
  feeType?: string /* CHARGE AMOUNT STATE */;
  cardOrgNum?: string /* Card Type  */;
  tranCnt?: string;
  tranAmt?: string;
  fee?: string;
  feeMinAmt?: string;
  startDate?: string;
  closeDate?: string;
  checkState?: string;
  operation?: string;
  merchant?: {
    merchantId?: string;
    merNameChn?: string;
    merNameEng?: string;
    merchantType?: string;
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
  feeType?: string /* CHARGE AMOUNT STATE */;
  cardOrgNum?: string /* Card Type  */;
  checkState?: string;
  operation?: string;
  size?: number;
  page?: number;
  sort?: string[];
}

const checkStateEnum = {
  '0': 'pending',
  '1': 'approved',
  '2': 'reject',
  '3': 'unknow',
  '4': 'NOT APPLICABLE',
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
