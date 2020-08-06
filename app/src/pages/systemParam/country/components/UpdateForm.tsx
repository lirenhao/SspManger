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

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const formVals = {
    internationalCode: props.values.internationalCode ? props.values.internationalCode : '',
    codeName: props.values.codeName ? props.values.codeName : '',
    codeEname: props.values.codeEname ? props.values.codeEname : '',
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
          name="internationalCode"
          label={intl.formatMessage({ id: 'country.internationalCode' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'country.internationalCodeNecessary' }),
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="codeName"
          label={intl.formatMessage({ id: 'country.cName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'country.cNameNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="codeEname"
          label={intl.formatMessage({ id: 'country.eName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'country.cNameNecessary' }),
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
      title={intl.formatMessage({ id: 'country.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          internationalCode: formVals.internationalCode,
          codeName: formVals.codeName,
          codeEname: formVals.codeEname,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
