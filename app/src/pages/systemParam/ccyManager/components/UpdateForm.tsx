import React from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
  intl: IntlShape;
}

// export interface FormValueType extends Partial<TableListItem> {
//   mcc?: string;
//   remark?: string;
// }

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const formVals = {
    ccyName: props.values.ccyName ? props.values.ccyName : '',
    ccyType: props.values.ccyType ? props.values.ccyType : '',
    ccyEname: props.values.ccyEname,
    ccySymbol: props.values.ccySymbol,
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
          name="ccyType"
          label={intl.formatMessage({ id: 'currency.ccyType' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'currency.ccyTypeNecessary' }),
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="ccyName"
          label={intl.formatMessage({ id: 'currency.ccyName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'currency.ccyNameNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="ccyEname" label={intl.formatMessage({ id: 'currency.eName' })}>
          <Input />
        </Form.Item>
        <Form.Item name="ccySymbol" label={intl.formatMessage({ id: 'currency.symbol' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'ccy.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          ccyName: formVals.ccyName,
          ccyType: formVals.ccyType,
          ccyEname: formVals.ccyEname,
          ccySymbol: formVals.ccySymbol,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
