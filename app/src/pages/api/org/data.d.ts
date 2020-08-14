export interface TableListItem {
  orgId: string;
  orgName: string;
  orgType: string;
  publicKey: string;
  notifyUrl: string;
  privateKey: string;
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

export interface MerchantData {
  merchantId: string;
  merNameChnAbbr: string;
  merNameEngAbbr: string;
}
