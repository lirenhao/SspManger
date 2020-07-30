import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';

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
  const [formVals] = useState<TableListItem>({
    internationalCode: props.values.internationalCode ? props.values.internationalCode : '',
    codeName: props.values.codeName ? props.values.codeName : '',
    codeEname: props.values.codeEname ? props.values.codeEname : '',
  });

  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

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
          <Input.TextArea rows={1} />
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
          <Input.TextArea rows={1} />
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
          <Input.TextArea rows={1} />
        </Form.Item>
        <Button name="finish" type="primary" onClick={() => handleSubmit()}>
          {intl.formatMessage({ id: 'global.submit' })}
        </Button>
        <Button name="clean" onClick={() => onCancel()}>
          {intl.formatMessage({ id: 'global.cancel' })}
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'country.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
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
