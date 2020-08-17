export interface TableListItem {
  traceNo?: string;
  batchNo?: string;
  tranAmt?: string;
  tranType?: string;
  tranDate?: string;
  tranTime?: string;
  channel?: string;
  cardNo?: string;
  merNo?: string;
  termNo?: string;
  rrn?: string;
  respCode?: string;
  merTraceNo?: string;
  channelTraceNo?: string;
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
  termNo?: string;
  traceNo?: string;
  tranType?: string;
  tranDate?: string;
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
