
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

insert into T_P_SHIRO_RES_TYPE (TYPE_ID, REMARK, TYPE_NAME)
values (1, 'MENU CHANNEL', 'menu');
insert into T_P_SHIRO_RES_TYPE (TYPE_ID, REMARK, TYPE_NAME) 
values (2, 'URL CHANNEL', 'url');

insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1, null, null, 'fa fa-user class="yellow"', 'ACCESS MANAGEMENT', 0, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (2, '/res/list', null, null, 'Resource Management', 0, null, 1, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (3, '/role/list', null, null, 'Role Management', 1, null, 1, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (4, '/org/list', null, null, 'Organisation Management', 2, null, 1, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (5, '/userGrp/list', null, null, 'Group Management', 3, null, 1, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (6, '/user/list', null, null, 'User Management', 4, null, 1, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1122, null, 'SYSTEM PARAM', 'fa fa-cog', 'SYSTEM PARAM', 1, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1123, null, null, 'fa fa-check-square-o', 'MANAGEMENT CHECK LIST', 7, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1166, null, 'Settle Management', 'fa fa-check-square-o', 'SETTLEMENT REPORTS', 8, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (702, '/cupAcomn/list', null, null, 'CUP UNILATERAL LIST', 0, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (703, '/cupqrcSettle/list', null, null, 'BCFES UNILATERAL LIST', 2, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (704, '/manualSettle/list', null, null, 'MERCHANT MANUAL ADJ INPUT', 4, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (705, '/manualSettle/listForCheck', null, null, 'MERCNT MANUAL ADJ VERIFY ', 5, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (706, '/merSettle/list', null, null, 'MERCHANT SETT LIST ', 6, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (707, '/merSettle/success', null, null, 'SETT SUCCESS HISTORY ', 7, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (708, '/merSettle/failure', null, null, 'SETT FAILURE HISTORY ', 8, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1201, '/banklist/list', null, null, 'Bank List', 6, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1301, '/merapiorg/list', null, null, 'Merchant API Setting', 5, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (205, '/staticqrclistcheck/listForCheck', null, null, 'Merchant Static-QRC Check', 1, null, 1123, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (206, '/merchantextra/merchantExtraListForCheck', null, 'fa fa-cog', 'Merchant Add-On Check', 0, null, 1123, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (207, '/merchantfee/listForCheck', null, null, 'Merchant Mdr Check', 2, null, 1123, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (302, '/appuser/listForCheck', null, null, 'App User Check', 3, null, 1123, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1102, '/ccpay/listForCheck', null, null, 'Ccpay Information Check', 4, null, 1123, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (200, null, null, 'fa fa-bank', 'MERCHANT MANAGEMENT', 2, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (201, '/merchant/list', null, null, 'Merchant Information', 0, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (202, '/merchantextra/merchantExtraList', null, null, 'Merchant Add-On', 1, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (203, '/staticqrclistcheck/list', null, null, 'Merchant Static-QRC', 2, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (204, '/merchantfee/list', null, null, 'Merchant Mdr Management', 3, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (208, '/merapiorg/mapping', null, null, 'Merchant Org Mapping', 4, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (210, '/merUser/list', null, null, 'Merchant Web User', 5, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (212, '/merSubs/list', null, null, 'Merchant Web Subs', 6, null, 200, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (300, null, null, 'fa fa-mobile', 'MERCHANT USER MANAGEMENT', 4, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (301, '/appuser/list', null, null, 'Merchant User Mgmt', 0, null, 300, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (7, '/files/uais', null, null, 'Uais Download', 5, null, 1, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (401, '/mcc/list', null, null, 'Mcc Code Management', 1, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (501, '/unionpaycardbin/list', null, null, 'Cup Card Bin Management', 4, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (601, '/approle/list', null, null, 'App Role Management', 0, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (700, null, null, 'fa fa-search', 'TRANSACTION INQUIRY MANAGEMENT', 6, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (701, '/trans/list', null, null, 'Search Transaction', 0, null, 700, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (800, null, null, 'fa fa-terminal', 'TERMINAL MANAGEMENT', 3, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (801, '/terminal/list', null, null, 'Terminal Information', 0, null, 800, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (802, '/termSn/list', null, null, 'Terminal SN', 0, null, 800, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (901, '/ccytype/list', null, null, 'Currency Management', 2, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1001, '/internationalcode/list', null, null, 'Country Code Management', 3, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1100, null, null, 'fa fa-institution', 'CCPAY MANAGEMENT', 5, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1101, '/ccpay/list', null, null, 'Ccpay Management', 0, null, 1100, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (709, '/cupAcomn/handleList', null, null, 'CUP MANUAL HANDLE LIST', 1, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (710, '/cupqrcSettle/handleList', null, null, 'BCFES MANUAL HANDLE LIST', 3, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (711, '/settleDetail/list', null, null, 'Merchant Settle Detail List', 9, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (712, '/termCount/list', null, null, 'Terminal Report', 9, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (713, '/hqReport/list', null, null, 'HQ Report', 9, null, 1166, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1400, null, null, 'fa fa-institution', 'RISK MANAGEMENT', 9, null, null, 1);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1401, '/risk/list', null, null, 'Risk Monitoring', 1, null, 1400, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1402, '/merLimit/list', null, null, 'Risk Control', 2, null, 1400, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1403, '/riskList/list', null, null, 'Risk Report', 3, null, 1400, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1404, '/pospOrgZmk/list', null, null, 'Posp Org ZMK', 7, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1405, '/pospOrgTmk/list', null, null, 'Posp Org TMK', 8, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1406, '/pospOrgTmk/upload', null, null, 'Posp TMK Upload', 9, null, 1122, 2);
insert into T_P_SHIRO_RES (MENU_RES_ID, ACTION_NAME, DSC, ICON, MENU_NAME, ORDER_ID, ORDERED, P_MENU_RES_ID, RES_TYPE_TYPE_ID)
values (1407, '/merPolicy/list', null, null, 'Merchant Policy', 10, null, 1122, 2);

insert into T_P_SHIRO_ACTION (ACTION_ID, ACTION_NAME, ACTION_ORDER, ACTION_VALUE, REMARK, RES_TYPE_TYPE_ID)
values (1, 'NOT VISIBLE', 1, '0', null, 1);
insert into T_P_SHIRO_ACTION (ACTION_ID, ACTION_NAME, ACTION_ORDER, ACTION_VALUE, REMARK, RES_TYPE_TYPE_ID)
values (2, 'VISIBLE', 2, '1', null, 1);
insert into T_P_SHIRO_ACTION (ACTION_ID, ACTION_NAME, ACTION_ORDER, ACTION_VALUE, REMARK, RES_TYPE_TYPE_ID)
values (3, 'NOT OPERATION', 1, '0', null, 2);
insert into T_P_SHIRO_ACTION (ACTION_ID, ACTION_NAME, ACTION_ORDER, ACTION_VALUE, REMARK, RES_TYPE_TYPE_ID)
values (4, 'OPERATION', 2, '1', null, 2);

insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1121, 2, 2, 1122, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1122, 1, 1, 1122, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1123, 1, 1, 1123, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1124, 2, 2, 1123, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (704, null, 1, 702, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (705, null, 2, 702, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (706, null, 1, 703, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (707, null, 2, 703, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (708, null, 1, 704, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (709, null, 2, 704, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (710, null, 1, 705, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (711, null, 2, 705, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (713, null, 2, 706, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (714, null, 1, 707, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1171, 1, 1, 1166, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1172, 2, 2, 1166, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (712, null, 1, 706, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (715, null, 2, 707, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (716, null, 1, 708, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (717, null, 2, 708, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (14, null, 2, 7, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (13, null, 1, 7, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1203, null, 2, 1201, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1302, null, 1, 1301, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1303, null, 2, 1301, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (210, null, 1, 205, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (211, null, 2, 205, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (212, null, 1, 206, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (213, null, 2, 206, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (214, null, 1, 207, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (215, null, 2, 207, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (304, null, 1, 302, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (305, null, 2, 302, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1104, null, 1, 1102, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1105, null, 2, 1102, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1202, null, 1, 1201, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1, null, 1, 1, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (2, null, 2, 1, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (3, null, 1, 2, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (4, null, 2, 2, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (5, null, 1, 3, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (6, null, 2, 3, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (7, null, 1, 4, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (8, null, 2, 4, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (9, null, 1, 5, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (10, null, 2, 5, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (11, null, 1, 6, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (12, null, 2, 6, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (200, null, 1, 200, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (201, null, 2, 200, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (202, null, 1, 201, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (203, null, 2, 201, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (204, null, 1, 202, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (205, null, 2, 202, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (206, null, 1, 203, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (207, null, 2, 203, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (208, null, 1, 204, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (209, null, 2, 204, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (216, null, 1, 208, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (217, null, 2, 208, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (220, null, 1, 210, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (221, null, 2, 210, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (222, null, 1, 212, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (223, null, 2, 212, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (300, null, 1, 300, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (301, null, 2, 300, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (302, null, 1, 301, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (303, null, 2, 301, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (402, null, 1, 401, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (403, null, 2, 401, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (502, null, 1, 501, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (503, null, 2, 501, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (602, null, 1, 601, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (603, null, 2, 601, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (700, null, 1, 700, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (701, null, 2, 700, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (702, null, 1, 701, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (703, null, 2, 701, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (800, null, 1, 800, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (801, null, 2, 800, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (802, null, 1, 801, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (803, null, 2, 801, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (804, null, 1, 802, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (805, null, 2, 802, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (902, null, 1, 901, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (903, null, 2, 901, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1002, null, 1, 1001, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1003, null, 2, 1001, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1100, null, 1, 1100, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1101, null, 2, 1100, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1102, null, 1, 1101, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1103, null, 2, 1101, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (718, null, 1, 709, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (719, null, 2, 709, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (720, null, 1, 710, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (721, null, 2, 710, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (722, null, 1, 711, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (723, null, 2, 711, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (724, null, 1, 712, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (725, null, 2, 712, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (726, null, 1, 713, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (727, null, 2, 713, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1400, null, 1, 1400, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1401, null, 2, 1400, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1402, null, 1, 1401, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1403, null, 2, 1401, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1404, null, 1, 1402, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1405, null, 2, 1402, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1406, null, 1, 1403, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1407, null, 2, 1403, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1408, null, 1, 1404, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1409, null, 2, 1404, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1410, null, 1, 1405, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1411, null, 2, 1405, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1412, null, 1, 1406, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1413, null, 2, 1406, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1414, null, 1, 1407, 1);
insert into T_P_SHIRO_PERMIT (PERMIT_ID, PERMIT_ORDER, ACTION_ID, RES_ID, TYPE_ID)
values (1415, null, 2, 1407, 1);

insert into T_P_SHIRO_ROLE (ROLE_ID, DSC, ROLE_NAME)
values (46, 'Finance Checker', 'Finance Checker');
insert into T_P_SHIRO_ROLE (ROLE_ID, DSC, ROLE_NAME)
values (44, 'Merchant Checker', 'Merchant Checker');
insert into T_P_SHIRO_ROLE (ROLE_ID, DSC, ROLE_NAME)
values (43, 'Merchant Operator', 'Merchant Operator');
insert into T_P_SHIRO_ROLE (ROLE_ID, DSC, ROLE_NAME)
values (45, 'Finance Operator', 'Finance Operator');
insert into T_P_SHIRO_ROLE (ROLE_ID, DSC, ROLE_NAME)
values (47, 'Account Admin', 'Account Admin');
insert into T_P_SHIRO_ROLE (ROLE_ID, DSC, ROLE_NAME)
values (1, '管理员角色', 'admin');

insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 2);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 3);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 4);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 5);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 6);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 7);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 8);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 9);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 10);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 11);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 12);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 13);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 14);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 200);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 201);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 202);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 203);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 204);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 205);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 206);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 207);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 208);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 209);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 210);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 211);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 212);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 213);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 214);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 215);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 216);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 217);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 220);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 221);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 222);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 223);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 300);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 301);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 302);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 303);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 304);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 305);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 402);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 403);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 502);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 503);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 602);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 603);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 700);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 701);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 702);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 703);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 704);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 705);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 706);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 707);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 708);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 709);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 710);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 711);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 712);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 713);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 714);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 715);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 716);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 717);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 718);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 719);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 720);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 721);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 722);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 723);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 724);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 725);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 726);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 727);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 800);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 801);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 802);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 803);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 804);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 805);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 902);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 903);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1002);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1003);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1100);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1101);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1102);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1103);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1104);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1105);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1121);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1122);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1123);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1124);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1171);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1172);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1202);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1203);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1302);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1303);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1400);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1401);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1402);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1403);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1404);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1405);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1406);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1407);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1408);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1409);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1410);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1411);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1412);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1413);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1414);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (1, 1415);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 200);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 201);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 202);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 203);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 204);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 205);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 206);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 207);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 208);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 209);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 300);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 301);

insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 302);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 303);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 800);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 801);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 802);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 803);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 1100);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 1101);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 1102);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (43, 1103);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 200);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 201);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 202);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 203);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 210);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 211);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 212);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 213);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 214);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 215);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 304);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 305);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 800);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 801);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 802);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 803);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 1104);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 1105);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 1123);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (44, 1124);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 704);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 705);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 706);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 707);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 708);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 709);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 712);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 713);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 714);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 715);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 716);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 717);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 718);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 719);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 720);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 721);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 1121);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 1122);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 1171);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 1172);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 1202);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (45, 1203);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (46, 710);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (46, 711);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (46, 1171);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (46, 1172);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (47, 1);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (47, 2);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (47, 11);
insert into T_P_ROLE_PERMIT (ROLE_ID, PERMIT_ID)
values (47, 12);

insert into T_P_SHIRO_USER_GRP (USER_GRP_ID, IHT_FLAG, NAME, ORG_ID, RUNTIME_LIMIT_FLAG)
values (41, '0', 'Account Admin', '00', null);
insert into T_P_SHIRO_USER_GRP (USER_GRP_ID, IHT_FLAG, NAME, ORG_ID, RUNTIME_LIMIT_FLAG)
values (42, '0', 'Merchant Operator', '00', null);
insert into T_P_SHIRO_USER_GRP (USER_GRP_ID, IHT_FLAG, NAME, ORG_ID, RUNTIME_LIMIT_FLAG)
values (43, '0', 'Merchant Checker', '00', null);
insert into T_P_SHIRO_USER_GRP (USER_GRP_ID, IHT_FLAG, NAME, ORG_ID, RUNTIME_LIMIT_FLAG)
values (44, '0', 'Finance Checker', '00', null);
insert into T_P_SHIRO_USER_GRP (USER_GRP_ID, IHT_FLAG, NAME, ORG_ID, RUNTIME_LIMIT_FLAG)
values (45, '0', 'Finance Operator', '00', null);
insert into T_P_SHIRO_USER_GRP (USER_GRP_ID, IHT_FLAG, NAME, ORG_ID, RUNTIME_LIMIT_FLAG)
values (1, '1', 'admin', '00', null);

insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (21, '20181227012240', '1', '20181227053309', null, null, null, null, null, null, 'AccountAdmin', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'AccountAdmin', '001', 41);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (22, '20181227020836', '21', '20181227053337', null, null, null, null, null, null, 'EdwardMO', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'EdwardMO', '001', 42);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (23, '20181227025022', '21', null, null, null, null, null, null, null, 'MerchantOperator', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'MerchantOperator', '001', 42);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (24, '20181227025045', '21', null, null, null, null, null, null, null, 'MerchantChecker', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'MerchantChecker', '001', 43);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (25, '20181227025109', '21', null, null, null, null, null, null, null, 'FinanceChecker', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'FinanceChecker', '001', 44);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (26, '20181227025133', '21', null, null, null, null, null, null, null, 'FinanceOperator', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'FinanceOperator', '001', 45);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (27, '20181227032537', '21', null, null, null, null, null, null, null, 'EdwardMC', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'EdwardMC', '001', 43);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (28, '20181227035607', '21', null, null, null, null, null, null, null, 'edward03', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'edward03', '001', 44);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (29, '20181227035702', '21', null, null, null, null, null, null, null, 'edward04', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'edward04', '001', 45);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (1, null, null, '20181227011636', null, null, null, null, null, null, 'admin', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'admin', '00', 1);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (43, '20181228105707', '1', null, null, null, null, null, null, null, 'MO1', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'MO1', '00', 42);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (41, '20181228101415', '1', null, null, null, null, null, null, null, 'useradmin', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'useradmin', '00', 41);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (45, '20181228105737', '1', '20181229034444', null, null, null, null, null, null, 'FC1', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'FC1', '00', 44);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (44, '20181228105724', '1', '20181229034350', null, null, null, null, null, null, 'MC1', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'MC1', '00', 43);
insert into T_P_SHIRO_USER (USER_ID, CREATE_DATE_TIME, CREATE_USER_ID, LAST_CHG_PWD_DATE_TIME, LAST_LOGIN_DATE_TIME, LAST_LOGIN_FAILED_DATE_TIME, LAST_LOGIN_IP_ADDR, LAST_LOGOUT_DATE_TIME, LOGIN_CNT, LOGIN_FAILED_CNT, LOGIN_NAME, PHONE_NO, PWD, REMARK, STAFF_ID, STATUS, USER_NAME, ORG_ID, USER_GRP_ID)
values (46, '20181228105750', '1', '20181229034529', null, null, null, null, null, null, 'FO1', null, '96E79218965EB72C92A549DD5A330112', null, null, '1', 'FO1', '00', 45);

insert into T_P_SHIRO_USER_GRP_ROLE (USER_GRP_ID, ROLE_ID)
values (41, 47);
insert into T_P_SHIRO_USER_GRP_ROLE (USER_GRP_ID, ROLE_ID)
values (42, 43);
insert into T_P_SHIRO_USER_GRP_ROLE (USER_GRP_ID, ROLE_ID)
values (43, 44);
insert into T_P_SHIRO_USER_GRP_ROLE (USER_GRP_ID, ROLE_ID)
values (44, 46);
insert into T_P_SHIRO_USER_GRP_ROLE (USER_GRP_ID, ROLE_ID)
values (45, 45);
insert into T_P_SHIRO_USER_GRP_ROLE (USER_GRP_ID, ROLE_ID)
values (1, 1);

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
