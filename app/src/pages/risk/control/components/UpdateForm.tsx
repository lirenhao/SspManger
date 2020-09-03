import React from 'react';
import { Form, Modal, Input,Select } from 'antd';
import { useIntl } from 'umi';
import { TableListItem,StatusEnum } from '../data.d';
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

  const [form] = Form.useForm();
  form.setFieldsValue(props.values);
  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({...{merchantId:'',maxTrxCount:'',maxTrxAmount:'',status:''},...props.values, ...fieldsValue });
  };

  const renderStatusOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(StatusEnum).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {' '}
          {StatusEnum[key]}{' '}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'merLimit.merchantId' })}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="maxTrxCount"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'merLimit.maxTrxCount' }),
            },
          ]}
          label={intl.formatMessage({ id: 'merLimit.maxTrxCount' })}
        >
          <Input />
        </Form.Item>
        <Form.Item name="maxTrxAmount" label={intl.formatMessage({ id: 'merLimit.maxTrxAmount' })}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label={intl.formatMessage({ id: 'merLimit.status' })}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={intl.formatMessage({ id: 'merLimit.status' })}
          >
            {renderStatusOption()}
          </Select>
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

      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
