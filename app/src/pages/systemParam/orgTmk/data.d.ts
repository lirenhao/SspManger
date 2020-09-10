export interface TableListItem {
  orgId: string;
  tmkZmk?: string;
  tmkWeb?: string;
  terminalId?: string;
  lmkzmk?: string;
  org?: {
    name?: string;
  };
  orgIdTmkZmk:string;
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
  merchantId?:string;
  tmkZmk?: string;
  tmkWeb?: string;
  terminalId?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
