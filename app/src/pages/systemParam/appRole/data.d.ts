export interface TableListItem {
  id: string;
  name: string;
  remark?: string;
}

export interface TableListPagination {
  total: number;
  pageSize?: number;
  current?: number;
}

export interface TableListData {
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  id?: string;
  name?: string;
  remark?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
