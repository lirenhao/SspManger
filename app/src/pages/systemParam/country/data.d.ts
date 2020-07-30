export interface TableListItem {
  internationalCode: string;
  codeName: string;
  codeEname: string;
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
  internationalCode?: string;
  codeName?: string;
  codeEname?: string;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
