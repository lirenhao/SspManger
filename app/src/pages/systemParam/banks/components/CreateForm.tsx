import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import { exist } from '../service';
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
    accountBankNo: '',
    bankName: '',
    bic: '',
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
          name="accountBankNo"
          label={intl.formatMessage({ id: 'banks.accountBankNo' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'banks.accountBankNoNecessary' }),
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
          <Input />
        </Form.Item>
        <Form.Item
          name="bankName"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'banks.banknameNecessary' }),
            },
          ]}
          label={intl.formatMessage({ id: 'banks.bankname' })}
        >
          <Input />
        </Form.Item>
        <Form.Item name="bic"           rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'banks.bicNecessary' }),
            },
          ]} label={intl.formatMessage({ id: 'banks.bic' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'banks.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          accountBankNo: formVals.accountBankNo,
          bankName: formVals.bankName,
          bic: formVals.bic,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
