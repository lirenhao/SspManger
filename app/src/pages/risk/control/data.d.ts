export interface TableListItem {
  merchantId: string;
  maxTrxCount: string;
  maxTrxAmount: string;
  status: string;
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
  status?: string;
  bic?: string;
  size?: number;
  page?: number;
  sort?: string[];
}

const StatusEnum = {
  '0': 'close',
  '1': 'open',
};
export { StatusEnum };
