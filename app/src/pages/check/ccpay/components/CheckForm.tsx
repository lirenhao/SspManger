import React from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, checkStateEnum, operEnmu, ccyNotifyFlagEnum } from '../data.d';
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

const ViewForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;

  const formVals = {
    merchantId: props.values.merchantId,
    ccpayMerName: props.values.ccpayMerName,
    staticQrc: props.values.staticQrc,
    fee: props.values.fee,
    notifyFlag: ccyNotifyFlagEnum[props.values.notifyFlag ? props.values.notifyFlag : ''],
    checkState: checkStateEnum[props.values.checkState ? props.values.checkState : ''],
    operation: operEnmu[props.values.operation ? props.values.operation : ''],
    merchant: {
      merchantId: props.values.merchant?.merchantId,
      merNameChn: props.values.merchant?.merNameChn,
      merNameEng: props.values.merchant?.merNameEng,
      merchantType: props.values.merchant?.merchantType,
    },
  };

  const [form] = Form.useForm();

  form.setFieldsValue(formVals);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'ccpay.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="ccpayMerName" label={intl.formatMessage({ id: 'ccpay.ccpayMerName' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="staticQrc" label={intl.formatMessage({ id: 'ccpay.staticQrc' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="fee" label={intl.formatMessage({ id: 'ccpay.fee' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="operation" label={intl.formatMessage({ id: 'ccpay.operation' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="checkReason" label={intl.formatMessage({ id: 'ccpay.checkReason' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'ccpay.updateCompoent' })}
      visible={modalVisible}
      footer={
        <>
          <Button
            onClick={() => {
              onSubmit({
                ...formVals,
                ...{ checkState: '1', checkReason: form.getFieldValue('checkReason') },
              } as TableListItem);
            }}
          >
            {intl.formatMessage({ id: 'check.approval' })}
          </Button>

          <Button
            onClick={() => {
              onSubmit({
                ...formVals,
                ...{ checkState: '2', checkReason: form.getFieldValue('checkReason') },
              } as TableListItem);
            }}
          >
            {intl.formatMessage({ id: 'check.reject' })}
          </Button>

          <Button
            onClick={() => {
              onCancel();
            }}
          >
            {intl.formatMessage({ id: 'check.cancel' })}
          </Button>
        </>
      }
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default ViewForm;
