export interface TableListItem {
  id: string;
  orgId: string;
  roles: string[];
  status: string;
  email: string;
}

export interface TableListData {
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  orgId?: string;
  id?: string;
  size?: number;
  page?: number;
  sort?: string[];
}

export interface OrgData {
  orgId: string;
  orgName: string;
}

export interface MerchantData {
  merchantId: string;
  merNameEng: string;
}
