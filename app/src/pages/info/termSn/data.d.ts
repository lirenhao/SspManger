export interface ApiOrgData {
  orgId: string;
  orgName: string;
}

export interface MerchantData {
  merchantId: string;
  merNameEng: string;
}

export interface TerminalData {
  terminalId: string;
  merchantId: string;
}

export interface TableListItem {
  vendorId: string;
  snNo: string;
  merchantId: string;
  terminalId: string;
  location: string;
}

export interface TableListData {
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  vendorId?: string;
  snNo?: string;
  merchantId?: string;
  terminalId?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
