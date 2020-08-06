import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

// export interface FormValueType extends Partial<TableListItem> {
//   mcc?: string;
//   remark?: string;
// }

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;
  const formVals = {
    accountBankNo: props.values.accountBankNo ? props.values.accountBankNo : '',
    bankName: props.values.bankName ? props.values.bankName : '',
    bic: props.values.bic ? props.values.bic : '',
  };

  const [form] = Form.useForm();
  form.setFieldsValue(formVals);
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
              message: intl.formatMessage({ id: 'banks.banknameNecessary' }),
            },
          ]}
        >
          <Input disabled />
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
        <Form.Item
          name="bic"
          label={intl.formatMessage({ id: 'banks.bic' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'banks.bicNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'banks.updateCompoent' })}
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
