import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;
  const [formVals] = useState<TableListItem>({
    orgId: '',
    pwd1: '',
    pwd2: '',
  });

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="orgId"
          label={intl.formatMessage({ id: 'orgzmk.orgId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgzmk.orgIdNoNecessary' }),
            },
          ]}
        >
          <Input maxLength={48} />
        </Form.Item>
        <Form.Item
          name="pwd1"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgzmk.pwd1Necessary' }),
            },
            {
              validator: (_, value) => {
                const hex = /^[A-F0-9a-f]*$/;
                if (!hex.test(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'orgzmk.pwd1Format' }));
                }
                if (value.length < 48) {
                  return Promise.reject(intl.formatMessage({ id: 'orgzmk.pwd1Length' }));
                }
                return Promise.resolve();
              },
            },
          ]}
          label={intl.formatMessage({ id: 'orgzmk.pwd1' })}
        >
          <Input.TextArea rows={2} maxLength={48} />
        </Form.Item>

        <Form.Item
          name="pwd2"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgzmk.pwd2Necessary' }),
            },
            {
              validator: (_, value) => {
                const hex = /^[A-F0-9a-f]*$/;
                if (!hex.test(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'orgzmk.pwd2Format' }));
                }
                if (value.length < 48) {
                  return Promise.reject(intl.formatMessage({ id: 'orgzmk.pwd2Length' }));
                }
                return Promise.resolve();
              },
            },
          ]}
          label={intl.formatMessage({ id: 'orgzmk.pwd1' })}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'orgzmk.createCompoent' })}
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
