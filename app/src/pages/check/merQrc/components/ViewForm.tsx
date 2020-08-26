import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, cardAssoEnum, checkStateEnum, operEnmu, useCaseEnmu } from '../data.d';
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
  const { modalVisible, onCancel } = props;

  const formVals = {
    merchantId: props.values.merchantId,
    terminalId: props.values.terminalId,
    useCase: props.values.useCase ? useCaseEnmu[props.values.useCase] : '',
    qrValue: props.values.qrValue,
    cardAsso: props.values.cardAsso ? cardAssoEnum[props.values.cardAsso] : '',
    checkState: props.values.checkState ? checkStateEnum[props.values.checkState] : '',
    checkReason: props.values.checkReason,
    operation: props.values.operation ? operEnmu[props.values.operation] : '',
    ccyCode: {
      ccyName: props.values.ccyCode?.ccyName,
    },
    merchant: {
      merchantId: props.values.merchant ? props.values.merchant.merchantId : '',
      merNameChn: props.values.merchant ? props.values.merchant.merNameChn : '',
      merNameEng: props.values.merchant ? props.values.merchant.merNameEng : '',
      merchantType: props.values.merchant ? props.values.merchant.merchantType : '',
    },
  };

  const [form] = Form.useForm();

  form.setFieldsValue(formVals);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merQrc.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="terminalId" label={intl.formatMessage({ id: 'merQrc.terminalId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="useCase" label={intl.formatMessage({ id: 'merQrc.useCase' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="cardAsso" label={intl.formatMessage({ id: 'merQrc.cardAsso' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="qrValue" label={intl.formatMessage({ id: 'merQrc.qrValue' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={['ccyCode', 'ccyName']}
          label={intl.formatMessage({ id: 'merQrc.ccyName' })}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item name="checkState" label={intl.formatMessage({ id: 'merQrc.checkState' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="checkReason" label={intl.formatMessage({ id: 'merQrc.checkReason' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="operation" label={intl.formatMessage({ id: 'merQrc.operation' })}>
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merQrc.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          merchantId: formVals.merchantId,
          terminalId: formVals.terminalId,
          useCase: formVals.useCase,
          qrValue: formVals.qrValue,
          cardAsso: formVals.cardAsso,
          ccyCode: {
            ccyName: formVals.ccyCode.ccyName,
          },
          checkState: formVals.checkState,
          checkReason: formVals.checkReason,
          operation: formVals.operation,
        }}
        // initialValues={values}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default ViewForm;
