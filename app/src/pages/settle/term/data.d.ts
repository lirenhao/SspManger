export interface TableListItem {
  orgId?: string;
  yearmon?: string;
  merNameEng?: string;
  merchantId?: string;
  terminalId?: string;

  vendorName?: string;
  terminalBrand?: string;
  terminalModel?: string;
  snNo?: string;
  installAddress?: string;
  termStatus?: string;
  termCreateDate?: string;
  bankCustomerNum?: string;
  termModifyDate?: string;
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
  yearmon?: string;
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
