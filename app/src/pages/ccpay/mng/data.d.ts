export interface TableListItem {
  merchantId?: string;
  ccpayMerName?: string;
  ccpayMerPass?: string;
  staticQrc?: string;
  notifyFlag?: string;
  fee?: string;
  checkState?: string;
  checkReason?: string;
  operation?: string;
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
  ccpayMerName?: string;
  ccpayMerPass?: string;
  staticQrc?: string;
  notifyFlag?: string;
  checkState?: string;
  checkReason?: string;
  operation?: string;
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

const ccyNotifyFlagEnum = {
  '0': 'NOT CREATED',
  '1': 'CREATED',
};
export { checkStateEnum, useCaseEnmu, operEnmu, cardAssoEnum, ccyNotifyFlagEnum };
