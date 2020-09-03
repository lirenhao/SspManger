export interface TableListItem {
  orgId: string;
  pwd1?: string;
  pwd2?: string;
  checkValue?: string;
  zmkLmk?: string;
  org?: {
    name?: string;
  };
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
