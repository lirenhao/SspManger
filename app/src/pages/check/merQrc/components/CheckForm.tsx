import React from 'react';
import { Form, Modal, Input, Col, Radio, Row, Card } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, cardAssoEnum, operEnmu, useCaseEnmu } from '../data.d';
import formLayout from '../../../../formLayout';

interface CheckFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  before: Partial<TableListItem>;
  after : Partial<TableListItem>;
}

export interface CheckFormState {
  formVals: TableListItem;
}

const ViewForm: React.FC<CheckFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;

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

  const [formAfter]  = Form.useForm();
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

        <Form.Item
          name='ccyType'
          label={intl.formatMessage({ id: 'merQrc.ccyName' })}
        >
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
      onOk={() => form.submit()}
    >
<Row>
    
    <Col span={12}>
            <Card title={intl.formatMessage({ id: 'merAddon.check.after' })}>
                <Form {...formLayout} form={formAfter}>
                    {renderContent()}
                </Form>
            </Card>
      </Col>
        <Col span={12}>
            <Card title={intl.formatMessage({ id: 'merAddon.check.before' })}>
        <Form {...formLayout} form={form}>
            {renderContent()}
        </Form>
            </Card>
        </Col>

      </Row>
      <br/>
      <Form
        form={form}
        initialValues={{ checkState: '0' }}
        onFinish={values => {
          onSubmit({...{merchantId:''},...afterFormVals,...values})
      }
    }
      >
      <Row>
        <Col span={8}>
        <Form.Item
              name="checkState"
              label={intl.formatMessage({ id:'merAddon.check.checkState'})}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'merAddon.check.checkState.required' }),
                }
              ]}
            >
              <Radio.Group>
                <Radio value="0">{intl.formatMessage({ id: 'appUser.check.checkState.0' })}</Radio>
                <Radio value="1">{intl.formatMessage({ id: 'appUser.check.checkState.1' })}</Radio>
              </Radio.Group>
            </Form.Item>
        </Col>
        <Col span={16}>
            <Form.Item
              name="checkReason"
              label={intl.formatMessage({ id: 'appUser.check.checkReason' })}
            >
              <Input />
            </Form.Item>
          </Col>
          
      </Row>
      </Form>
    </Modal>
  );
};

export default ViewForm;
