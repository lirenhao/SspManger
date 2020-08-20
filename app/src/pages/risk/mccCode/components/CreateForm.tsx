import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { existMcc } from '../service';
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
    mcc: '',
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
          name="mcc"
          label={intl.formatMessage({ id: 'mcc.mcc' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'mcc.mccNecessary' }),
            },
            {
              validator: (_, value) =>
                value === ''
                  ? Promise.resolve()
                  : existMcc(value).then((result: boolean) =>
                      result
                        ? Promise.reject(intl.formatMessage({ id: 'global.createExists' }))
                        : Promise.resolve(),
                    ),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="remark" label={intl.formatMessage({ id: 'mcc.remark' })}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'mcc.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          mcc: formVals.mcc,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
