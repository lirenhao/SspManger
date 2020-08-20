export interface TableListItem {
  lsId?: string;
  merchantId?: string;
  settleDate?: string;
  terminalId?: string;
  tranType?: string;
  pan?: string;
  tranAmt?: string;
  tranDate?: string;
  tranTime?: string;
  rrn?: string;
  authCode?: string;
  fee?: string;
  status?: string;
  merchant: {
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
  settleDate?: string;
  lsId?: string;
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

const cardAssoEnum = {
  '0': 'VISA',
  '1': 'MasterCard',
  '2': 'UnionPay',
};

const feeTypeEnum = {
  '1': 'FIXED RATE',
  '2': 'FIXED AMOUNT',
};

const statusEnum = {
  '0': 'PROCESSED',
};
export { checkStateEnum, useCaseEnmu, cardAssoEnum, feeTypeEnum, statusEnum };
