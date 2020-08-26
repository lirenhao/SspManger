import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, values } = props;

  const formVals = {
    merchantId: props.values.merchantId,
    ccyType: props.values.ccyType,
    internationalCode: props.values.internationalCode,
    checkState: props.values.checkState,
    checkReason: props.values.checkReason,
    operation: props.values.operation,
    merchant: {
      merchantId: props.values.merchant ? props.values.merchant.merchantId : '',
      merNameChn: props.values.merchant ? props.values.merchant.merNameChn : '',
      merNameEng: props.values.merchant ? props.values.merchant.merNameEng : '',
      merchantType: props.values.merchant ? props.values.merchant.merchantType : '',
    },
  };

  const [form] = Form.useForm();
  form.setFieldsValue(formVals);

  const emptyVal = {};
  form.setFieldsValue({ ...emptyVal, ...values });

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merAddon.merchantId' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="ccyType" label={intl.formatMessage({ id: 'merAddon.ccyType' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="internationalCode"
          label={intl.formatMessage({ id: 'merAddon.internationalCode' })}
        >
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merAddon.view' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          merchantId: formVals.merchantId,
          ccyType: formVals.ccyType,
          internationalCode: formVals.internationalCode,
          checkState: formVals.checkState,
          checkReason: formVals.checkReason,
          operation: formVals.operation,
          merchant: {
            merchantId: formVals.merchant.merchantId,
            merNameChn: formVals.merchant.merNameChn,
            merNameEng: formVals.merchant.merNameEng,
            merchantType: formVals.merchant.merchantType,
          },
        }}
        // initialValues={values}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
