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
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  ccyType?: string;
  ccyName?: string;
  ccyEname?: string;
  ccySymbol?: string;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
