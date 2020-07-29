export interface TableListItem {
  key: number;
  role: string;
  roleName: string;
  roleDescripiton?: string;
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
  key?: number;
  role?: string;
  roleName?: string;
  roleDescripiton?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
