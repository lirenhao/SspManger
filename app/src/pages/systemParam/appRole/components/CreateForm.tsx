import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { exist } from '../service';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  intl: IntlShape;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const [formVals] = useState<TableListItem>({
    id: '',
    name: '',
    remark: '',
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
          name="id"
          label={intl.formatMessage({ id: 'appRole.role' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appRole.roleNecessary' }),
            },
            {
              validator: (_, value) =>
                value === ''
                  ? Promise.resolve()
                  : exist(value).then((result: boolean) =>
                    result
                      ? Promise.reject(intl.formatMessage({ id: 'global.createExists' }))
                      : Promise.resolve(),
                  ),
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'appRole.roleName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appRole.roleNameNecessary' }),
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="remark" label={intl.formatMessage({ id: 'appRole.desc' })}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'role.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
