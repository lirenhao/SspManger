export interface TableListItem {
  mcc: string;
  remark?: string;
  key?: string;
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
  mcc?: number;
  remark?: string;
  key?: string;
  pageSize?: number;
  size?: number;
  page?: number;
  sort?: string[];
}
