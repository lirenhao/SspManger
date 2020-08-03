export interface TableListItem {
  id: string;
  issuerIin?: string;
  issuerName?: string;
  cardLevel?: string;
  issuingRegion?: string;
  cardProduct?: string;
  pctBusinessType?: string;
  billingCurrency1?: number;
  billingCurrency2?: number;
  billingCurrency3?: number;
  reserved?: string;
  binLength?: number;
  bin?: string;
  panLength?: number;
  cardType?: string;
  singleDualMessage?: string;
  transationTypeSupported?: number;
  transationChannelSupported?: number;
  networkOpened?: number;
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
  id?: string;
  issuerIin?: string;
  issuerName?: string;
  cardLevel?: string;
  issuingRegion?: string;
  cardProduct?: string;
  pctBusinessType?: string;
  billingCurrency1?: number;
  billingCurrency2?: number;
  billingCurrency3?: number;
  reserved?: string;
  binLength?: number;
  bin?: string;
  panLength?: number;
  cardType?: string;
  singleDualMessage?: string;
  transationTypeSupported?: number;
  transationChannelSupported?: number;
  networkOpened?: number;
  size?: number;
  page?: number;
  sort?: string[];
}
