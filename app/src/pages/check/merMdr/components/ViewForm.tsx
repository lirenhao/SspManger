import React from 'react';
import { Form, Modal, Input } from 'antd';
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
  const { modalVisible, onCancel } = props;

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
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merMdr.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="feeType" label={intl.formatMessage({ id: 'merMdr.feeType' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="cardOrgNum" label={intl.formatMessage({ id: 'merMdr.cardOrgNum' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranCnt" label={intl.formatMessage({ id: 'merMdr.tranCnt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranAmt" label={intl.formatMessage({ id: 'merMdr.tranAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="fee" label={intl.formatMessage({ id: 'merMdr.fee' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="feeMinAmt" label={intl.formatMessage({ id: 'merMdr.feeMinAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="checkState" label={intl.formatMessage({ id: 'merMdr.checkState' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="startDate" label={intl.formatMessage({ id: 'merMdr.startDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="closeDate" label={intl.formatMessage({ id: 'merMdr.closeDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="operation" label={intl.formatMessage({ id: 'merMdr.operation' })}>
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merMdr.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default ViewForm;
