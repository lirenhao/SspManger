import React from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { useIntl } from 'umi';
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

  const intl = useIntl();

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form initialValues={info} {...formLayout}>
        <Form.Item
          name="orgId"
          label={intl.formatMessage({ id: 'api.org.orgId' })}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="orgName"
          label={intl.formatMessage({ id: 'api.org.orgName' })}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="orgType"
          label={intl.formatMessage({ id: 'api.org.orgType' })}
        >
          <Select disabled>
            <Select.Option value="0">{intl.formatMessage({ id: 'api.org.orgType.0' })}</Select.Option>
            <Select.Option value="1">{intl.formatMessage({ id: 'api.org.orgType.1' })}</Select.Option>
            <Select.Option value="2">{intl.formatMessage({ id: 'api.org.orgType.2' })}</Select.Option>
            <Select.Option value="9">{intl.formatMessage({ id: 'api.org.orgType.9' })}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="publicKey"
          label={intl.formatMessage({ id: 'api.org.publicKey' })}
        >
          <Input.TextArea rows={4} readOnly />
        </Form.Item>
        <Form.Item
          name="notifyUrl"
          label={intl.formatMessage({ id: 'api.org.notifyUrl' })}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="privateKey"
          label={intl.formatMessage({ id: 'api.org.privateKey' })}
        >
          <Input.TextArea rows={4} readOnly />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default ShowView;
