
insert into T_B_ORG (ORG_ID, ACQ_ORG_ID, NAME, ORG_LEV, STATUS, P_ORG_ID)
values ('00', '4000000000', '中国银行新加坡总行', 0, '1', null);
insert into T_B_ORG (ORG_ID, ACQ_ORG_ID, NAME, ORG_LEV, STATUS, P_ORG_ID)
values ('001', '4760000000', '新加坡皮草', 1, '1', '00');
insert into T_B_ORG (ORG_ID, ACQ_ORG_ID, NAME, ORG_LEV, STATUS, P_ORG_ID)
values ('001001', '4769999888', 'BANK OF CHINA SINGAPORE BRANCH', 2, '1', '001');

insert into T_B_MERCHANT_BASE_GAS (MERCHANT_ID, MERCHANT_TYPE, MER_LEV, ACQ_ORG_ID, MER_NAME_CHN, MER_NAME_ENG)
values ('104767011000006', '0', '0', '4760000000', '新加坡测试商户', 'ddcssh01');

insert into T_B_TERMINAL_BASE_GAS (TERMINAL_ID, MERCHANT_ID, ACQ_ORG_ID)
values ('76002432', '104767011000006', '4760000000');

insert into T_B_MERAPI_ORG (ORG_ID, ORG_NAME)
values ('0001', 'Test');

insert into T_B_TERM_SN (VENDOR_ID, SN_NO, MERCHANT_ID, TERMINAL_ID, LOCATION)
values ('0001', '12345678', '104767011000006', '76002432', '1.000,1.2334');

insert into T_B_APP_ROLE (ID, NAME)
values ('admin', 'admin');
insert into T_B_APP_ROLE (ID, NAME)
values ('tran', 'tran');
insert into T_B_APP_ROLE (ID, NAME)
values ('user', 'user');

insert into T_B_RISK (RISK_CODE, RISK_NAME, VALUE, VALUE_FORMAT)
values ('0001', 'risk test', '10', 'This is %s count!');

insert into T_L_CUR_RISK_LIST (RISK_ID, RISK_DATE, MERCHANT_ID, RISK_CODE)
values ('1', '20190226', '104767011000006', '0001');

insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'TRAN_HANDLE', null, 'PROCESSED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'CHECK_STATE', null, 'PENDING', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'CHECK_STATE', null, 'APPROVED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'CHECK_STATE', null, 'REJECTED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'OPERATION', null, 'CREATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'OPERATION', null, 'UPDATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'OPERATION', null, 'DELETE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'TRAN_HANDLE', null, 'UNPROCESSED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('A', 'TERMINAL_LASTOPERFLAG', null, 'ADD-ON', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('M', 'TERMINAL_LASTOPERFLAG', null, 'UPDATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('D', 'TERMINAL_LASTOPERFLAG', null, 'DELETE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'TERMINAL_RECODESTAT', null, 'NOT ACTIVATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'TERMINAL_RECODESTAT', null, 'ACTIVATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'TERMINAL_LINECONDITION', null, 'OFF', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'TERMINAL_LINECONDITION', null, 'ON', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'TERMINAL_SIGNFLAG', null, 'NOT UPDATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'TERMINAL_SIGNFLAG', null, 'UPDATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'TERMINAL_STATUS', null, 'NORMAL', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'TERMINAL_STATUS', null, 'PENDING', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'TERMINAL_STATUS', null, 'TERMINATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('3', 'TERMINAL_STATUS', null, 'PENDING RETRIVAL STATUS', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('4', 'TERMINAL_STATUS', null, 'STATUS OF WORK ORDER', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('5', 'TERMINAL_STATUS', null, 'ORDER APPROVED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('6', 'TERMINAL_STATUS', null, 'ORDER IN PROGRESS', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('A', 'LASTOPER_FLAG', null, 'ADD-ON', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('M', 'LASTOPER_FLAG', null, 'UPDATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'RECODE_STAT', null, 'APPROVED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'RECODE_STAT', null, 'PENDING APPROVAL', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('3', 'RECODE_STAT', null, 'PENDING', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'FROZEN_FLAG', null, 'REINSTATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'FROZEN_FLAG', null, 'FREEZE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'FROZEN_FLAG', null, 'REINSTATE IN PROGRESS', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'SETTLE_MODE', null, 'AUTO SETTLEMENT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'SETTLE_MODE', null, 'MANUAL SETTLEMENT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'ACCOUNT_TYPE', null, 'BOC CURRENT BANK ACCOUNT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'ACCOUNT_TYPE', null, 'BOC PERSONAL BANK ACCOUNT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'ACCOUNT_TYPE', null, 'OTHER CURRENT BANK ACCOUNT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('3', 'ACCOUNT_TYPE', null, 'OTHER PERSONAL BANK ACCOUNT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'COMPANY_TYPE', null, 'SOLE PROPRIETOR', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'COMPANY_TYPE', null, 'PTE LTD', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'COMPANY_TYPE', null, 'LTD', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('3', 'COMPANY_TYPE', null, 'PARTNERSHIP', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'MER_STATUS', null, 'PENDING', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MER_STATUS', null, 'NORMAL', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('3', 'MER_STATUS', null, 'TERMINATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'MER_LEV', null, 'NO', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MER_LEV', null, 'YES', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('J', 'MERCHANT_TYPE', null, 'SUB GROUP', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('D', 'MERCHANT_TYPE', null, 'OUTLETS', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('O', 'MERCHANT_TYPE', null, 'ORGANISATION', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'D_IHT_STATUS', null, 'TRANSFERABLE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'D_IHT_STATUS', null, 'NOT TRANSFERABLE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'D_ORG_STATE', null, 'DEACTIVATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'D_ORG_STATE', null, 'NORMAL', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'D_USER_STATUS', null, 'DEACTIVATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'D_USER_STATUS', null, 'ENABLE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'D_IHT_FLAG', null, 'TRANSFER', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'D_IHT_FLAG', null, 'NOT TRANSFER', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'CCPAY_NOTIFY_FLAG', null, 'NOT CREATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'CCPAY_NOTIFY_FLAG', null, 'CREATED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('10', 'STATIC_QRC_LIST_USE_CASE', null, 'PURCHASE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('11', 'STATIC_QRC_LIST_USE_CASE', null, 'PURCHASE-DEBIT CARD', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MERCHANT_FEE_TYPE', null, 'FIXED RATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'MERCHANT_FEE_TYPE', null, 'FIXED AMOUNT', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('01', 'MERCHANT_FEE_CARD_ORG_NUM', null, 'VISA', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('02', 'MERCHANT_FEE_CARD_ORG_NUM', null, 'MasterCard', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('03', 'MERCHANT_FEE_CARD_ORG_NUM', null, 'UnionPay', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MERCHANT_FEE_STAT', null, 'PENDING', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'MERCHANT_FEE_STAT', null, 'APPROVED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('3', 'MERCHANT_FEE_STAT', null, 'REJECTED', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('4', 'MERCHANT_FEE_STAT', null, 'DEACTIVATE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'MER_LIMIT_STATUS', null, 'CLOSE', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MER_LIMIT_STATUS', null, 'OPEN', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'MER_API_ORG_TYPE', null, 'POS机构', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MER_API_ORG_TYPE', null, '商户机构', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('2', 'MER_API_ORG_TYPE', null, '第三方支付机构', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('9', 'MER_API_ORG_TYPE', null, '行内测试', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('02', 'MER_QR_CARD_ASSO', null, 'VISA', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('04', 'MER_QR_CARD_ASSO', null, 'MASTER', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('15', 'MER_QR_CARD_ASSO', null, 'UnionPay', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('00', 'MER_USER_STATUS', null, '00', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('01', 'MER_USER_STATUS', null, '01', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('02', 'MER_USER_STATUS', null, '02', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('03', 'MER_USER_STATUS', null, '03', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('0', 'MER_COMMENT_STATUS', null, '未回复', null, null, null);
insert into T_P_S_DICT_ITEM (DICTCODE, DICTTYPE, DICTCODE_PARENT, DICTCODENAME, DICTFLAG, DICTORDER, DICTPINYIN)
values ('1', 'MER_COMMENT_STATUS', null, '已回复', null, null, null);

insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TRAN_TYPE', '2', null, 'select t.tran_type as dictcode, t.tran_name_eng as dictcodename ,''TRAN_TYPE'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin from t_d_tran_type t', '交易类型');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('CUP_TRAN_TYPE', '2', null, 'select t.message_type || t.proc_code as dictcode, t.tran_name_eng as dictcodename ,''CUP_TRAN_TYPE'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin from t_d_cup_tran_type t', 'CUP交易类型');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('OPERATION', '1', null, null, '操作');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('CHECK_STATE', '1', null, null, '审核状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TRAN_HANDLE', '1', null, null, 'TRAN HANDLE');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MERCHANT_FEE_STAT', '1', null, null, '审核状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MERCHANT_FEE_TYPE', '1', null, null, '交易量或交易金额');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MERCHANT_FEE_CARD_ORG_NUM', '1', null, null, '卡类型');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('STATIC_QRC_LIST_USE_CASE', '1', null, null, '二维码用途');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TERMINAL_LASTOPERFLAG', '1', null, null, '最后操作标志');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TERMINAL_RECODESTAT', '1', null, null, '记录状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TERMINAL_LINECONDITION', '1', null, null, '线路状况');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TERMINAL_SIGNFLAG', '1', null, null, '终端签到状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('TERMINAL_STATUS', '1', null, null, '终端状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('LASTOPER_FLAG', '1', null, null, '最后操作标志');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('RECODE_STAT', '1', null, null, '记录状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('FROZEN_FLAG', '1', null, null, '冻结标志');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('SETTLE_MODE', '1', null, null, '结算方式');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('ACCOUNT_TYPE', '1', null, null, '结算账户性质');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('COMPANY_TYPE', '1', null, null, '公司所属类型');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_STATUS', '1', null, null, '商户状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_LEV', '1', null, null, '商户是否属于某集团');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MERCHANT_TYPE', '1', null, null, '商户类型');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('Orgs', '2', null, 'select t.org_id as dictcode, t.name as dictcodename,''Orgs'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin  from t_b_org t', '机构');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_IHT_STATUS', '1', null, null, '用户分组继承标志');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_USER_STATUS', '1', null, null, '权限用户状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_ORG_STATE', '1', null, null, '机构状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('Org', '2', null, 'select t.org_id as dictcode, t.name as dictcodename ,''Org'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin from t_b_org t where t.org_lev in (1,2) order by t.org_id', '行内省行级以上机构');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_SYSFLAG', '1', null, null, '操作系统');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_LOG_SYSFLAG', '1', null, null, '稽核日志系统标志');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_USER_ID_NAME', '2', null, 'select t.user_id as dictcode,t.user_name  as dictcodename,''D_USER_ID_NAME'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin from t_p_shiro_user t ', '用户名称');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_USER', '2', null, 'SELECT T.USER_ID as dictcode ,T.LOGIN_NAME as dictcodename,''D_USER'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin  FROM t_p_shiro_user T', '用户');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('D_IHT_FLAG', '1', null, null, '继承标志');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('APPUSER_MERNO', '2', null, 'select t.merchant_id as dictcode, t.mer_name_chn as dictcodename,''APPUSER_MERNO'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin  from T_B_MERCHANT_BASE_GAS t', '商户名称');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('APPUSER_CRY', '2', null, 'select t.ccy_type as dictcode, t.ccy_ename as dictcodename,''APPUSER_CRY'' as dicttype, ''1'' as DICTCODE_PARENT, ''1'' as dictflag, ''1'' as dictorder, ''1'' as dictpinyin  from t_d_ccy_type t', '币种');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('CCPAY_NOTIFY_FLAG', '1', null, null, 'Ccpay通知状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_LIMIT_STATUS', '1', null, null, '商户限制状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_API_ORG_TYPE', '1', null, null, '商户API机构类型');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_QR_CARD_ASSO', '1', null, null, '商户静态码卡组');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_USER_STATUS', '1', null, null, '商户用户状态');
insert into T_P_S_DICT_LIST (DICTTYPE, DICTFLAG, DICTTABLE_ORDER, DICTTABLE_SQL, DICTTYPENAME)
values ('MER_COMMENT_STATUS', '1', null, null, '商户评论状态');

insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111111', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111112', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111113', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111114', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111115', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111116', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111117', '12345678', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111118', '12345679', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, terminal_id, tmk_web) values ('001', '11111111111111111119', '12345670', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, tmk_web) values ('001', '11111111111111111110', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, tmk_web) values ('001', '11111111111111111120', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, tmk_web) values ('001', '11111111111111111121', '11111111111111111111');
insert into T_B_POSP_ORG_TMK (org_id, tmk_zmk, tmk_web) values ('001', '11111111111111111122', '11111111111111111111');

insert into T_WEB_MER_POLICY (ID, STATUS, TITLE, CONTENT)
values ('login', '0', 'BOC Merchant Portal Policy', '<h2>1. Introduction</h2><p>    This Web Site is provided to you under these Terms and any amendment or supplement thereto that may be posted by us    from time to time (collectively referred to as “these Terms”). Your use of this Web Site shall be deemed to    constitute your consent to be bound by these Terms</p><h2>2. Terms and Conditions of NETS Web Site</h2><p>    All Terms and Conditions stated in our NETS Web Site (“NETS Web Site Terms”) constitute an integral part of these    Terms and shall be deemed incorporated into these Terms. We suggest you click to the NETS Web Site at    www.nets.com.sg and read the NETS Web Site Terms carefully.</p><h2>3. Modifications to these Terms and NETS Web Site Terms</h2><p>    We may make changes to these Terms or the NETS Web Site Terms from time to time at our sole discretion, and we will    post any such changes on this Web Site or the NETS Web Site respectively. Each time changes are made to these Terms    or the NETS Web Site Terms, notice of these changes will be posted on the respective home page. Your continued use    of this Web Site following the posting of changes constitutes your acceptance of any such changes.</p><h2>4. Privacy Policy</h2><p>    The information that we obtain through your use of this Web Site, whether through the registration process or    otherwise, is subject to the following Privacy Policy:</p><p>    (a) You agree and consent that we may, at our sole discretion, disclose to any third party and information relating    to or supplied by you which is in our possession or control.</p><p>    (b) You agree and consent that we may incorporate your personal information in our mailing lists to disseminate any    promotion, offer, newsletter or marketing material from us or from our business partners through us.</p><p>    (c) You agree and consent that we may disclose your personal information, if required to do so by law, or in good    faith believe that such action is necessary to (i) conform to edicts of the law or comply with legal process or    directives of regulatory authorities or (ii) protect and defend our rights and property.</p><p>    (d) You acknowledge that the information collected by us will be used to provide the services or products in    connection with our MerchantConnect Portal and you agree that we may engage third parties to provide certain    services on our behalf.</p><h2>5. Application and Registration</h2><p>    You have to apply and register with us in order to use the Web Site. You must submit the completed MerchantConnect    Application Form to us for processing.</p><p>    You agree to provide true, accurate and complete registration information and to maintain and promptly update your    information. You shall not impersonate any person or use a name other than your own. You authorise us to make such    inquiries as we consider necessary to validate your registration.</p><h2>6. Acceptance of Terms and Conditions</h2><p>    If you do not wish to accept or do not agree with these Terms, the NETS Web Site Terms, our Privacy Policy or fee    and charges, you should not register or if you have registered, de-register the use of this Web Site.</p><h2>7. Fees and Charges</h2><p>    You may apply for multiple Customer-Code Accounts or Retailer-Code Accounts. There is no charge for one    Customer-Code Account but charges will be payable in respect of subsequent Customer-Code Accounts and all    Retailer-Code Accounts.</p><p>    We reserve the right to levy other fees and charges from time to time.</p><h2>8. MerchantConnect Portal</h2><p>    The MerchantConnect Portal allows you access to your transaction data for EFTPOS, CashCard, CashBack, UnionPay (CUP)    and Rintis-BCA and such other services as we may include from time to time.</p><p>    You will have access to the following reports:</p><p>    (a) Monthly invoice and Daily Transaction Report;</p><p>    (b) Monthly Transaction by Retailer;</p><p>    (c) Daily Transaction Summary;</p><p>    (d) Such other reports as we may include from time to time.</p><p>    However, we reserve the right, at our sole discretion, to remove or add to the foregoing services or reports at any    time.</p><p></p><h2>9. Access to MerchantConnect Portal</h2><p>    We endeavour to provide access to the MerchantConnect Portal on a 24-hour basis, but there will be periods when    access is not available or delayed due to breakdown, maintenance, upgrading or other technical reasons.</p><p>    We shall in no event be liable for any damage, loss or expense including without limitation, special damage, or    consequential damage, or economic loss arising from or in connection with:</p><p>    (a) any access, use or the delay or inability to access or use this Web Site, or reliance on any information    contained in this Web Site;</p><p>    (b) any system, server or connection failure, error, omission, interruption, delay in transmission or computer    failure;</p><p>    (c) any use of or access to any other web site linked to this Web Site;</p><p>    (d) any service, product, information, date, software or other material obtained from this Web Site or from any    other web site linked to this Web Site;</p><p>    even if we are advised of the possibility of such damages, losses and expenses and your sole remedy is to    de-register or discontinue use of the Web Site. This exclusion clause shall have effect to the fullest extent    permitted by law.</p><h2>10. Unauthorised Access</h2><p>    It is very important that you notify NETS immediately if you have reason to suspect or believe that there has been    unauthorised access to your account.</p><h2>11. Receiving Information</h2><p>    You agree that we have the right to send you any information via any media once you register. Your consent to    receive information electronically or via other media is valid until you de-register.</p><h2>12. Ownership</h2><p>    This Web site is owned by us. All right and title to, and interest in the content displayed on this Web Site,    including but not limited to this Web Site''s look and feel, data, information, text, graphics, /images, sound or    video materials, designs, trademarks, service marks, trade names, and URL, are our property or the property of our    respective partners, agents, or third parties as the case may be.</p><h2>13. Electronic Communications</h2><p>    The information communicated on this Web Site constitutes an electronic communication. When you communicate with us    through this Web Site or via other forms of electronic media, such as e-mail, you are communicating with us    electronically. You agree that we may communicate electronically and that such communications, as well as notices,    disclosures, agreements, and other communications that we provide to you electronically, are equivalent to    communications in writing and shall have the same force and effect as if they were in writing and signed by the    party sending the communication.</p><h2>14. Compliance With Laws</h2><p>    You agree to comply with all applicable local laws regarding your use of this Web Site, including, without    limitation, laws regarding import or export of technical data by virtue of your online transmission.</p><h2>15. Information Disclaimer</h2><p>    Your use of this Web Site is subject to the additional conditions, disclaimers and caveats that may appear    throughout this Web Site. We assume no responsibility for any consequence relating directly or indirectly to any    action or inaction you take based on the information, services or other material on this Web Site. While we strive    to keep the information on this Web Site accurate, complete and up-to-date (but not real-time), we cannot guarantee,    and will not be responsible for, any damage or loss related to the accuracy, completeness or timeliness of the    information.</p><h2>16. Disclaimer of Warranties With Respect to Use of Web Site</h2><p>    This Web Site is provided on an “as is” and “as available” basis. Except as specifically provided herein, to the    fullest extent permissible pursuant to applicable law, we expressly disclaim all warranties of any kind, whether    express or implied, including, without limitation, any warranties of merchantability, fitness for a particular    purpose and non-infringement.</p><p>    We do not make any warranty that this Web Site will meet your requirements or that access to the Web Site will be    uninterrupted, timely, secure or error-free, or that defects, if any, will be corrected. We make no warranties as to    the results that may be obtained from the use of this Web Site or as to the accuracy, quality, or reliability of any    information obtained through this Web Site.</p><p>    You understand and agree that any material or data downloaded or otherwise obtained through the use of the Web Site    is used at your own risk and that you will be solely responsible for any damage to your computer system or loss of    data that results from the download of such material or data.</p><p>    No advice or information, whether oral or written, obtained by you from us or through this Web Site shall create any    warranty not expressly made herein.</p>');
