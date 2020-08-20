import React from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, cardAssoEnum, checkStateEnum, operEnmu, feeTypeEnum } from '../data.d';
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
    lsId: props.values.lsId,
    merchantId: props.values.merchantId,
    feeType: feeTypeEnum[props.values.feeType ? props.values.feeType : ''],
    tranCnt: props.values.tranCnt,
    tranAmt: props.values.tranAmt,
    fee: props.values.fee,
    feeMinAmt: props.values.feeMinAmt,
    startDate: props.values.startDate,
    closeDate: props.values.closeDate,
    cardOrgNum: cardAssoEnum[props.values.cardOrgNum ? props.values.cardOrgNum : ''],
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
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merQrc.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="feeType" label={intl.formatMessage({ id: 'merQrc.feeType' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="cardOrgNum" label={intl.formatMessage({ id: 'merQrc.cardOrgNum' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranCnt" label={intl.formatMessage({ id: 'merQrc.tranCnt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranAmt" label={intl.formatMessage({ id: 'merQrc.tranAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="fee" label={intl.formatMessage({ id: 'merQrc.fee' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="feeMinAmt" label={intl.formatMessage({ id: 'merQrc.feeMinAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="startDate" label={intl.formatMessage({ id: 'merQrc.startDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="closeDate" label={intl.formatMessage({ id: 'merQrc.closeDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="operation" label={intl.formatMessage({ id: 'merQrc.operation' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="checkReason" label={intl.formatMessage({ id: 'merQrc.checkReason' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merQrc.updateCompoent' })}
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
