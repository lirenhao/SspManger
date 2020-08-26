export interface TableListItem {
  merNo: string;
  termNo: string;
  loginName: string;
  userName: string;
  roles: string | string[];
  ccyType: string;
  checkState: string;
  checkReason: string;
  operation: string;
}

export interface TableListData {
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  merNo?: string;
  termNo?: string;
  loginName?: string;
  userName?: string;
  size?: number;
  page?: number;
  sort?: string[];
}

export interface MerchantData {
  merchantId: string;
  merNameChn: string;
  merNameEng: string;
}

export interface TerminalsData {
  terminalId: string;
}

export interface AppRoleData {
  id: string;
}

export interface CcyTypeData {
  ccyType: string;
  ccyName: string;
}
