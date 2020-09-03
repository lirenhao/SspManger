import React, { useState } from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  orgData: any;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit, orgData } = props;
  const [formVals] = useState<TableListItem>({
    orgId: '',
    tmkZmk: '',
    tmkWeb: '',
  });

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...formVals, ...fieldsValue });
  };

  const renderOrgOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(orgData).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {' '}
          {orgData[key]}{' '}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="orgId"
          label={intl.formatMessage({ id: 'orgtmk.orgId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgtmk.orgIdNecessary' }),
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={intl.formatMessage({ id: 'orgtmk.orgIdNecessary' })}
            optionFilterProp="children"
            filterOption={(input, option) => {
              if (option == null) {
                return false;
              }
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
          >
            {renderOrgOption()}
          </Select>
        </Form.Item>

        <Form.Item
          name="tmkZmk"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgtmk.pwd1Necessary' }),
            },
            {
              validator: (_, value) => {
                const hex = /^[A-F0-9a-f]*$/;
                if (!hex.test(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'orgtmk.pwd1Format' }));
                }
                if (value.length < 48) {
                  return Promise.reject(intl.formatMessage({ id: 'orgtmk.pwd1Length' }));
                }
                return Promise.resolve();
              },
            },
          ]}
          label={intl.formatMessage({ id: 'orgtmk.tmkZmk' })}
        >
          <Input.TextArea rows={2} maxLength={48} />
        </Form.Item>

        <Form.Item
          name="tmkWeb"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgtmk.pwd2Necessary' }),
            },
            {
              validator: (_, value) => {
                const hex = /^[A-F0-9a-f]*$/;
                if (!hex.test(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'orgtmk.pwd2Format' }));
                }
                if (value.length < 48) {
                  return Promise.reject(intl.formatMessage({ id: 'orgtmk.pwd2Length' }));
                }
                return Promise.resolve();
              },
            },
          ]}
          label={intl.formatMessage({ id: 'orgtmk.tmkWeb' })}
        >
          <Input.TextArea rows={2} maxLength={48} />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'orgtmk.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          orgId: formVals.orgId,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
