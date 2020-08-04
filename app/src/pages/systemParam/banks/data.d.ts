export interface TableListItem {
  accountBankNo: string;
  bankName: string;
  bic: string;
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
  accountBankNo?: string;
  bankName?: string;
  bic?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
