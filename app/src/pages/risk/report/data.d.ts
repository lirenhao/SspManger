export interface TableListItem {
  riskDate: string;
  riskId: string;
  merchantId: string;
  riskCode: string;
}

export interface ViewItem {
  lsId?: string;
  riskId?: string;
  merchantId?: string;
  terminalId?: string;
  cardNo?: string;
  tranCode?: string;
  tranDate?: string;
  tranTime?: string;
  tranAmt?: string;
}

export interface ViewItemParams {
  lsId?: string;
  riskCode?: string;
  size?: number;
  page?: number;
  sort?: string[];
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
  riskDate?: string;
  merchantId?: string;
  riskCode?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
