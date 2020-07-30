import React, { useState } from 'react';
import { Form, Modal, Input, Button, message } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { existCcy } from '../service';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
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
  const [formVals] = useState<TableListItem>({
    ccyName: '',
    ccyType: '',
    ccyEname: '',
    ccySymbol: '',
  });

  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    const isExists = await existCcy({ ...formVals, ...fieldsValue });

    if (isExists) {
      message.error(intl.formatMessage({ id: 'global.createExists' }));
    } else {
      onSubmit({ ...formVals, ...fieldsValue });
    }
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
          <Input.TextArea rows={1} />
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
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="ccyEname" label={intl.formatMessage({ id: 'currency.eName' })}>
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="ccySymbol" label={intl.formatMessage({ id: 'currency.symbol' })}>
          <Input.TextArea rows={4} />
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
      title={intl.formatMessage({ id: 'ccy.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
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
