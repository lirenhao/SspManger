export interface TableListItem {
  ccyType: string;
  ccyName: string;
  ccyEname?: string;
  ccySymbol?: string;
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
  ccyType?: string;
  ccyName?: string;
  ccyEname?: string;
  ccySymbol?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
