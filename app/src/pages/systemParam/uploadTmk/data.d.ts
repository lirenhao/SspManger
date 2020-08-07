export interface TableListItem {
  orgId: string;
  file: Blob;
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
  orgId?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
