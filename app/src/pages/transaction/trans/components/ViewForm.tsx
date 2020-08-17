import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data.d';
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

  // const formVals = {
  //   traceNo:props.values.traceNo,
  //   batchNo:props.values.,
  //   tranAmt:props.values.,
  //   tranType:props.values.,
  //   tranDate:props.values.,
  //   tranTime:props.values.,
  //   channel:props.values.,
  //   cardNo:props.values.,
  //   merNo:props.values.,
  //   termNo:props.values.,
  //   rrn:props.values.,
  //   respCode:props.values.,
  //   merTraceNo:props.values.,
  //   channelTraceNo:props.values.,
  // }

  const [form] = Form.useForm();

  form.setFieldsValue(props.values);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="traceNo" label={intl.formatMessage({ id: 'trans.traceNo' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="batchNo" label={intl.formatMessage({ id: 'trans.batchNo' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranAmt" label={intl.formatMessage({ id: 'trans.tranAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranType" label={intl.formatMessage({ id: 'trans.tranType' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranDate" label={intl.formatMessage({ id: 'trans.tranDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="channel" label={intl.formatMessage({ id: 'trans.channel' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="cardNo" label={intl.formatMessage({ id: 'trans.cardNo' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="merNo" label={intl.formatMessage({ id: 'trans.merNo' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="termNo" label={intl.formatMessage({ id: 'trans.termNo' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="rrn" label={intl.formatMessage({ id: 'trans.rrn' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="respCode" label={intl.formatMessage({ id: 'trans.respCode' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="merTraceNo" label={intl.formatMessage({ id: 'trans.merTraceNo' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="channelTraceNo" label={intl.formatMessage({ id: 'trans.channelTraceNo' })}>
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'trans.viewCompoent' })}
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
