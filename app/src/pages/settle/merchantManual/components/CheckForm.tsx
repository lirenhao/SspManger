import React from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, checkStateEnum, operEnmu } from '../data.d';
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
  const { modalVisible, onCancel, values, onSubmit } = props;

  const [form] = Form.useForm();

  values.checkState = checkStateEnum[values.checkState];
  values.operation = operEnmu[values.operation ? values.operation : ''];

  form.setFieldsValue(values);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="inputDate" label={intl.formatMessage({ id: 'manualSettle.inputDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'manualSettle.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranAmt" label={intl.formatMessage({ id: 'manualSettle.tranAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="fee" label={intl.formatMessage({ id: 'manualSettle.fee' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="settleAmt" label={intl.formatMessage({ id: 'manualSettle.settleAmt' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="settleDate" label={intl.formatMessage({ id: 'manualSettle.settleDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="checkState" label={intl.formatMessage({ id: 'manualSettle.checkState' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="checkState" label={intl.formatMessage({ id: 'manualSettle.checkState' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="startDate" label={intl.formatMessage({ id: 'manualSettle.startDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="operation" label={intl.formatMessage({ id: 'manualSettle.operation' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="checkReason"
          label={intl.formatMessage({ id: 'manualSettle.checkReason' })}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'manualSettle.viewCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
      footer={
        <>
          <Button
            onClick={() => {
              onSubmit({
                ...props.values,
                ...{ checkState: '1', checkReason: form.getFieldValue('checkReason') },
              } as TableListItem);
            }}
          >
            {intl.formatMessage({ id: 'check.approval' })}
          </Button>

          <Button
            onClick={() => {
              onSubmit({
                ...props.values,
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
