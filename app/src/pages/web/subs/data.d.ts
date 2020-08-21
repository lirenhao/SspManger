export interface OrgData {
  orgId: string;
  orgName: string;
}

export interface TableListItem {
  merchantId: string;
  org: OrgData;
  //商户类型：J间联 D直联 集团O
  merchantType: string;
  //商户是否属于某集团：0不属于1属于
  merLev: string;
  //收单机构代码
  acqOrgId: string;
  //签约机构代码
  signOrgId: string;
  //入账凭单打印机构
  voucherOrgId: string;
  //区域代码
  zoneId: string;
  //商户状态 0-待审批 1-正常 3-注销
  merStatus: string;
  //商户风险级别
  merRisk: string;
  //商户所属分组
  merGroup: string;
  //商户类别MCC
  mcc: string;
  //商户中文名称
  merNameChn: string;
  //商户中文简称
  merNameChnAbbr: string;
  //商户英文名称
  merNameEng: string;
  //商户英文简称
  merNameEngAbbr: string;
  //经营场所中文名称
  businessAddressChn: string;
  //经营场所英文名称
  businessAddressEng: string;
  //所在城市英文名称
  cityEng: string;
  //公司所属类型0个体 1企业 2事业
  companyType: string;
  //商户功能标志：1代表支持，0或空代表不支持。第1位：消费第2位：消费撤销第3位：退货第4位：消费调整第5位：小费第6位：预授权第7位：预授权撤销第8位：预授权完成第9位：预授权完成撤销第10位：手输卡号第11位：离线交易第12位：MOTO交易第13位：电子现金交易第14位：限制退货第15位：非接交易第16位：余额查询第17位：取现第18-20位：保留
  tranCtl: string;
  //结算账户性质：0-本行对公 1-本行对私 2-他行对公 3-他行对私
  accountType: string;
  //结算方式： 0：自动结算 1：手工结算
  settleMode: string;
  //结算账户号
  accountNo: string;
  //结算账户名称
  accountName: string;
  //结算开户行号
  accountBankNo: string;
  //结算开户行名称
  accountBankName: string;
  //营业执照
  businessLicense: string;
  //企业代码
  enterpriseCode: string;
  //法人证件类型 0-身份证号 1-护照 2-驾驶证
  legalPersonIdType: string;
  //法人证件号码
  legalPersonId: string;
  //法人名称
  legalPersonName: string;
  //注册地址
  regAddress: string;
  //注册资金
  regCapital: string;
  //员工人数
  employeeNum: string;
  //联系人
  contactPersonName: string;
  //电话
  telephone: string;
  //传真
  tax: string;
  //电子邮件
  email: string;
  //邮编
  postcode: string;
  //通信地址
  commAddress: string;
  //申请日期
  applyDate: string;
  //启用日期
  startDate: string;
  //银行客户经理
  bankCustomerName: string;
  //银行客户经理工号
  bankCustomerNum: string;
  //协议编号
  protocolNum: string;
  //备注
  remark: string;
  //冻结标志 0代表商户解挂1 代表商户挂起2 代表商户解挂审核中
  frozenFlag: string;
  //审批被退回原因
  rejectReson: string;
  //注销时间
  logoutDate: string;
  //注销原因
  logoutReson: string;
  //记录状态 1-有效 2-待审批 3-未通过
  recodeStat: string;
  //最后操作标志 A-新增 M-修改
  lastoperFlag: string;
  //修改的用户标识
  modifyOper: string;
  //修改时间
  modifyDate: string;
  //创建时间
  createDate: string;
  //受理卡种 目前启用1-4位：代表支持卡组值0或null或空格：不支持 1：支持第1位：VISA  第2位：MASTER  第3位：CUPS  第4位：本带本
  cardCtl: string;
}

export interface TableListData {
  content: TableListItem[];
  totalPages: number;
  totalElements: number;
}

export interface TableListParams {
  orgId?: string;
  merchantId?: string;
  size?: number;
  page?: number;
  sort?: string[];
}
