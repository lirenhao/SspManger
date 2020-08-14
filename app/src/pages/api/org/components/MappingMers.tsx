import React from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import { fetchExistOrgId } from '../service';

interface FormProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
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
  const { title, info, modalVisible, onCancel, onSubmit } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      okText={intl.formatMessage({ id: 'global.submit' })}
      width={1040}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={info}
        onFinish={values => onSubmit({ ...info, ...values } as TableListItem)}
      >
        {info.orgId ? (
          <Form.Item label={intl.formatMessage({ id: 'api.org.orgId' })}>
            <Input value={info.orgId} readOnly />
          </Form.Item>
        ) : (
            <Form.Item
              name="orgId"
              label={intl.formatMessage({ id: 'api.org.orgId' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'api.org.orgId.required' }),
                },
                {
                  validator: (_, value) => (value === '' || value === info.orgId) ? Promise.resolve() :
                    fetchExistOrgId(value).then((result: boolean) => result ? Promise.reject(intl.formatMessage({ id: 'api.org.id.validator' })) : Promise.resolve()),
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        <Form.Item
          name="orgName"
          label={intl.formatMessage({ id: 'api.org.orgName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'api.org.orgName.required' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="orgType"
          label={intl.formatMessage({ id: 'api.org.orgType' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'api.org.orgType.required' }),
            },
          ]}
        >
          <Select>
            <Select.Option value="0">{intl.formatMessage({ id: 'api.org.orgType.0' })}</Select.Option>
            <Select.Option value="1">{intl.formatMessage({ id: 'api.org.orgType.1' })}</Select.Option>
            <Select.Option value="2">{intl.formatMessage({ id: 'api.org.orgType.2' })}</Select.Option>
            <Select.Option value="9">{intl.formatMessage({ id: 'api.org.orgType.9' })}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="publicKey"
          label={intl.formatMessage({ id: 'api.org.publicKey' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'api.org.publicKey.required' }),
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="notifyUrl"
          label={intl.formatMessage({ id: 'api.org.notifyUrl' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'api.org.notifyUrl.required' }),
            },
            {
              type: 'url',
              message: intl.formatMessage({ id: 'api.org.notifyUrl.url' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="privateKey"
          label={intl.formatMessage({ id: 'api.org.privateKey' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'api.org.privateKey.required' }),
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default FormView;
