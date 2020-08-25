import React from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
// import formLayout from '../../../../formLayout';

interface CreateFormProps {
  intl: IntlShape;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, intl, onSubmit } = props;
  // const {riskId} = values;
  const formLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 8 },
    },
  };

  const [form] = Form.useForm();
  form.setFieldsValue(props.values);

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...{ merchant: {} }, ...props.values, ...fieldsValue });
  };

  // const handleSubmit = async () => {
  //   const fieldsValue = await form.validateFields();
  //   onSubmit({ ...formVals, ...fieldsValue });
  // };

  const renderContent = () => {
    return (
      <>
        <Form.Item name="riskCode" label={intl.formatMessage({ id: 'riskReport.riskCode' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="riskName" label={intl.formatMessage({ id: 'riskReport.riskName' })}>
          <Input />
        </Form.Item>
        <Form.Item name="value" label={intl.formatMessage({ id: 'riskReport.value' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <>
      <Modal
        destroyOnClose
        title={intl.formatMessage({ id: 'riskReport.updateCompoent' })}
        visible={modalVisible}
        onCancel={() => onCancel()}
        onOk={() => handleSubmit()}
      >
        <Form {...formLayout} form={form}>
          {renderContent()}
        </Form>
      </Modal>
    </>
  );
};

export default CreateForm;
