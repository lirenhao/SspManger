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

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit, values } = props;

  // const [formVals] = useState<TableListItem>({
  //   mcc: values.mcc ? values.mcc : '',
  //   remark: values.remark,
  // });

  const [form] = Form.useForm();

  const emptyVal = { mcc: '', remark: '' };
  form.setFieldsValue({ ...emptyVal, ...values });

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...values, ...fieldsValue });
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
          <Input disabled />
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
      title={intl.formatMessage({ id: 'mcc.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        // initialValues={{
        //   mcc: formVals.mcc,
        //   remark: formVals.remark,
        // }}
        initialValues={values}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
