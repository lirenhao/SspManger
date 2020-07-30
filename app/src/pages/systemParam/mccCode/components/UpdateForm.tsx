import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';

interface CreateFormProps {
  intl: IntlShape;
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
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const [formVals] = useState<TableListItem>({
    mcc: props.values.mcc ? props.values.mcc : '',
    remark: props.values.remark,
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
          name="mcc"
          label={intl.formatMessage({ id: 'mcc.mcc' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'mcc.mccNecessary' }),
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="remark" label={intl.formatMessage({ id: 'mcc.remark' })}>
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
      title={intl.formatMessage({ id: 'mcc.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
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
