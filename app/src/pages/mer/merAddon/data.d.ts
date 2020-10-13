export interface TableListItem {
  merchantId?: string;
  ccyType?: string;
  internationalCode?: string;
  checkState?: string;
  checkReason?: string;
  operation?: string;
  merchantType?: string;
  merchant?: {
    merchantId?: string;
    merNameChn?: string;
    merNameEng?: string;
    merchantType?: string;
  };
  hasMerchantExtra?: boolean;
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
  ccyType?: string;
  internationalCode?: string;
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

const merchantTypeEnmu = {
  J: 'subGroup',
  D: 'outlets',
  O: 'organisation',
};

const operEnmu = {
  '0': 'create',
  '1': 'update',
  '2': 'delete',
};
export { checkStateEnum, merchantTypeEnmu, operEnmu };
