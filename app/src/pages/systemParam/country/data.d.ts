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
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  internationalCode?: string;
  codeName?: string;
  codeEname?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
