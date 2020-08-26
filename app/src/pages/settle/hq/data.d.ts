export interface TableListItem {
  month: string;
  /*  存量商户数 */
  merNum: string;
  /*  存量上月环比 */
  merNumMonthPer: string;
  /*  存量上年环比 */
  merNumYearPer: string;
  /*  当月新增商户数 */
  addNum: string;
  /*  当月流失商户数 */
  lossNum: string;
  /*  当月交易量 */
  curTran: string;
  /*  当月交易量上月环比 */
  curTranMonthPer: string;
  /*  当月交易量上年环比 */
  curTranYearPer: string;
  /*  当年累计交易量 */
  sumTran: string;
  /*  当年交易量上月环比 */
  sumTranMonthPer: string;
  /*  当年交易量上年环比 */
  sumTranYearPer: string;
  /*  POS终端数 */
  posNum: string;
  /*  POS终端数上月环比 */
  posNumMonthPer: string;
  /*  POS终端数上年环比 */
  posNumYearPer: string;
  /*  二维码终端数 */
  barNum: string;
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
  year?: string;
  size?: number;
  page?: number;
  sort?: string[];
}

const checkStateEnum = {
  '0': 'pending',
  '1': 'approved',
  '2': 'reject',
};

const useCaseEnmu = {
  '10': 'PURCHASE',
  '11': 'PURCHASE-DEBIT CARD',
};

const operEnmu = {
  '0': 'create',
  '1': 'update',
  '2': 'delete',
};

const cardAssoEnum = {
  '0': 'VISA',
  '1': 'MasterCard',
  '2': 'UnionPay',
};
export { checkStateEnum, useCaseEnmu, operEnmu, cardAssoEnum };
