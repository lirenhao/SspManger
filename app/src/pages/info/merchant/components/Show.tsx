import React from 'react';
import { Form, Modal, Row, Col, Input } from 'antd';
import { TableListItem } from '../data';

interface ShowProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
}

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16 },
  },
};

const ShowView: React.FC<ShowProps> = (props) => {
  const { title, info, modalVisible, onCancel } = props;

  const fields = [
    { label: '商户号', name: 'merchantId', local: 'merchant.merchantId', },
    { label: '商户类型', name: 'merchantType', local: 'merchant.merchantType', },
    { label: '商户是否属于某集团', name: 'merLev', local: 'merchant.merLev', },
    { label: '收单机构代码', name: 'acqOrgId', local: 'merchant.acqOrgId', },
    { label: '签约机构代码', name: 'signOrgId', local: 'merchant.signOrgId', },
    { label: '入账凭单打印机构', name: 'voucherOrgId', local: 'merchant.voucherOrgId', },
    { label: '区域代码', name: 'zoneId', local: 'merchant.zoneId', },
    { label: '商户状态', name: 'merStatus', local: 'merchant.merStatus', },
    { label: '商户风险级别', name: 'merRisk', local: 'merchant.merRisk', },
    { label: '商户所属分组', name: 'merGroup', local: 'merchant.merGroup', },
    { label: '商户类别MCC', name: 'mcc', local: 'merchant.mcc', },
    { label: '商户中文名称', name: 'merNameChn', local: 'merchant.merNameChn', },
    { label: '商户中文简称', name: 'merNameChnAbbr', local: 'merchant.merNameChnAbbr', },
    { label: '商户英文名称', name: 'merNameEng', local: 'merchant.merNameEng', },
    { label: '商户英文简称', name: 'merNameEngAbbr', local: 'merchant.merNameEngAbbr', },
    { label: '经营场所中文名称', name: 'businessAddressChn', local: 'merchant.businessAddressChn', },
    { label: '经营场所英文名称', name: 'businessAddressEng', local: 'merchant.businessAddressEng', },
    { label: '所在城市英文名称', name: 'cityEng', local: 'merchant.cityEng', },
    { label: '公司所属类型', name: 'companyType', local: 'merchant.companyType', },
    { label: '商户功能标志', name: 'tranCtl', local: 'merchant.tranCtl', },
    { label: '结算账户性质', name: 'accountType', local: 'merchant.accountType', },
    { label: '结算方式', name: 'settleMode', local: 'merchant.settleMode', },
    { label: '结算账户号', name: 'accountNo', local: 'merchant.accountNo', },
    { label: '结算账户名称', name: 'accountName', local: 'merchant.accountName', },
    { label: '结算开户行号', name: 'accountBankNo', local: 'merchant.accountBankNo', },
    { label: '结算开户行名称', name: 'accountBankName', local: 'merchant.accountBankName', },
    { label: '营业执照', name: 'businessLicense', local: 'merchant.businessLicense', },
    { label: '企业代码', name: 'enterpriseCode', local: 'merchant.enterpriseCode', },
    { label: '法人证件类型', name: 'legalPersonIdType', local: 'merchant.legalPersonIdType', },
    { label: '法人证件号码', name: 'legalPersonId', local: 'merchant.legalPersonId', },
    { label: '法人名称', name: 'legalPersonName', local: 'merchant.legalPersonName', },
    { label: '注册地址', name: 'regAddress', local: 'merchant.regAddress', },
    { label: '注册资金', name: 'regCapital', local: 'merchant.regCapital', },
    { label: '员工人数', name: 'employeeNum', local: 'merchant.employeeNum', },
    { label: '联系人', name: 'contactPersonName', local: 'merchant.contactPersonName', },
    { label: '电话', name: 'telephone', local: 'merchant.telephone', },
    { label: '传真', name: 'tax', local: 'merchant.tax', },
    { label: '电子邮件', name: 'email', local: 'merchant.email', },
    { label: '邮编', name: 'postcode', local: 'merchant.postcode', },
    { label: '通信地址', name: 'commAddress', local: 'merchant.commAddress', },
    { label: '申请日期', name: 'applyDate', local: 'merchant.applyDate', },
    { label: '启用日期', name: 'startDate', local: 'merchant.startDate', },
    { label: '银行客户经理', name: 'bankCustomerName', local: 'merchant.bankCustomerName', },
    { label: '银行客户经理工号', name: 'bankCustomerNum', local: 'merchant.bankCustomerNum', },
    { label: '协议编号', name: 'protocolNum', local: 'merchant.protocolNum', },
    { label: '备注', name: 'remark', local: 'merchant.remark', },
    { label: '冻结标志', name: 'frozenFlag', local: 'merchant.frozenFlag', },
    { label: '审批被退回原因', name: 'rejectReson', local: 'merchant.rejectReson', },
    { label: '注销时间', name: 'logoutDate', local: 'merchant.logoutDate', },
    { label: '注销原因', name: 'logoutReson', local: 'merchant.logoutReson', },
    { label: '记录状态', name: 'recodeStat', local: 'merchant.recodeStat', },
    { label: '最后操作标志', name: 'lastoperFlag', local: 'merchant.lastoperFlag', },
    { label: '修改的用户标识', name: 'modifyOper', local: 'merchant.modifyOper', },
    { label: '修改时间', name: 'modifyDate', local: 'merchant.modifyDate', },
    { label: '创建时间', name: 'createDate', local: 'merchant.createDate', },
    { label: '受理卡种', name: 'cardCtl', local: 'merchant.cardCtl', },
  ];

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={1040}
    >
      <Form initialValues={info} {...formLayout}>
        <Row gutter={24}>
          {fields.map((field, index) => (
            <Col span={12} key={index}>
              <Form.Item label={field.label} name={field.name}>
                <Input readOnly />
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Modal >
  );
};

export default ShowView;
