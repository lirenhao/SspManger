import React from 'react';
import { Form, Modal, Input, Col, Row, Card } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, cardAssoEnum, operEnmu, useCaseEnmu } from '../data.d';
import formLayout from '../../../../formLayout';

interface CheckFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  before: Partial<TableListItem>;
  after: Partial<TableListItem>;
}

export interface CheckFormState {
  formVals: TableListItem;
}

const ViewForm: React.FC<CheckFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel } = props;

  const formVals = {
    merchantId: props.before.merchantId,
    terminalId: props.before.terminalId,
    useCase: props.before.useCase ? useCaseEnmu[props.before.useCase] : '',
    qrValue: props.before.qrValue,
    cardAsso: props.before.cardAsso ? cardAssoEnum[props.before.cardAsso] : '',
    checkState: '',
    checkReason: '',
    operation: props.before.operation ? operEnmu[props.before.operation] : '',
    ccyCode: {
      ccyName: props.before.ccyCode?.ccyName,
    },
    ccyType: props.before.ccyType,
    merchant: {
      merchantId: props.before.merchant ? props.before.merchant.merchantId : '',
      merNameChn: props.before.merchant ? props.before.merchant.merNameChn : '',
      merNameEng: props.before.merchant ? props.before.merchant.merNameEng : '',
      merchantType: props.before.merchant ? props.before.merchant.merchantType : '',
    },
  };

  const afterFormVals = {
    lsId: props.after.lsId,
    merchantId: props.after.merchantId,
    terminalId: props.after.terminalId,
    useCase: props.after.useCase ? useCaseEnmu[props.after.useCase] : '',
    qrValue: props.after.qrValue,
    cardAsso: props.after.cardAsso ? cardAssoEnum[props.after.cardAsso] : '',
    checkState: '',
    checkReason: '',
    operation: props.after.operation ? operEnmu[props.after.operation] : '',
    ccyCode: {
      ccyName: props.after.ccyCode?.ccyName,
    },
    ccyType: props.after.ccyType,
    merchant: {
      merchantId: props.after.merchant ? props.after.merchant.merchantId : '',
      merNameChn: props.after.merchant ? props.after.merchant.merNameChn : '',
      merNameEng: props.after.merchant ? props.after.merchant.merNameEng : '',
      merchantType: props.after.merchant ? props.after.merchant.merchantType : '',
    },
  };

  const [form] = Form.useForm();

  form.setFieldsValue(formVals);

  const [formAfter] = Form.useForm();
  formAfter.setFieldsValue(afterFormVals);

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

        <Form.Item name="ccyType" label={intl.formatMessage({ id: 'merQrc.ccyName' })}>
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
      title={intl.formatMessage({ id: 'merQrc.checkCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      width={1040}
      onOk={() => onCancel()}
    >
      <Row>
        <Col span={12}>
          <Card title={intl.formatMessage({ id: 'merAddon.check.after' })}>
            <Form {...formLayout} form={formAfter} name="after">
              {renderContent()}
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={intl.formatMessage({ id: 'merAddon.check.before' })}>
            <Form {...formLayout} form={form} name="before">
              {renderContent()}
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ViewForm;
