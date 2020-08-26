import React from 'react';
import { Form, Modal } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, MerchantData, CcyTypeData } from '../data';
import { fetchAllMer, fetchCcyTypes } from '../service';

interface FormProps {
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

const FormView: React.FC<FormProps> = (props) => {
  const { info, modalVisible, onCancel } = props;

  const intl = useIntl();

  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);
  const [ccyTypes, setCcyTypes] = React.useState<CcyTypeData[]>([]);

  React.useEffect(() => {
    fetchAllMer().then(setMerchants);
    fetchCcyTypes().then(setCcyTypes);
  }, [info]);

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={intl.formatMessage({ id: 'appUser.view.title' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form  {...formLayout}>
        <Form.Item label={intl.formatMessage({ id: 'appUser.merNo' })}>
          {info.merNo}[{merchants.filter(item => item.merchantId === info.merNo)[0]?.merNameEng}]
              </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.termNo' })} >
          {info.termNo}
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.loginName' })}>
          {info.loginName}
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.userName' })}>
          {info.userName}
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.ccyType' })}>
          {info.ccyType}[{ccyTypes.filter(item => item.ccyType === info.ccyType)[0]?.ccyName}]
              </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.roles' })}>
          {info.roles}
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.checkState' })}>
          {intl.formatMessage({ id: `appUser.checkState.${info.checkState}` })}
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.checkReason' })}>
          {info.checkReason}
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'appUser.operation' })}>
          {intl.formatMessage({ id: `appUser.operation.${info.operation}` })}
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default FormView;
