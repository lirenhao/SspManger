import React from 'react';
import { Form, Modal, Input, Card, Col, Row, Radio } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, checkStateEnum, operEnmu, ccyNotifyFlagEnum } from '../data.d';
import formLayout from '../../../../formLayout';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
//   values: Partial<TableListItem>;
  before: Partial<TableListItem>;
  after : Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const ViewForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;

  const formVals = {
    merchantId: props.before.merchantId,
    ccpayMerName: props.before.ccpayMerName,
    staticQrc: props.before.staticQrc,
    fee: props.before.fee,
    notifyFlag: ccyNotifyFlagEnum[props.before.notifyFlag ? props.before.notifyFlag : ''],
    checkState: checkStateEnum[props.before.checkState ? props.before.checkState : ''],
    operation: operEnmu[props.before.operation ? props.before.operation : ''],
    merchant: {
      merchantId: props.before.merchant?.merchantId,
      merNameChn: props.before.merchant?.merNameChn,
      merNameEng: props.before.merchant?.merNameEng,
      merchantType: props.before.merchant?.merchantType,
    },
  };

  const afterFormVals = {
    merchantId: props.after.merchantId,
    ccpayMerName: props.after.ccpayMerName,
    staticQrc: props.after.staticQrc,
    fee: props.after.fee,
    notifyFlag: ccyNotifyFlagEnum[props.after.notifyFlag ? props.after.notifyFlag : ''],
    checkState: checkStateEnum[props.after.checkState ? props.after.checkState : ''],
    operation: operEnmu[props.after.operation ? props.after.operation : ''],
    merchant: {
      merchantId: props.after.merchant?.merchantId,
      merNameChn: props.after.merchant?.merNameChn,
      merNameEng: props.after.merchant?.merNameEng,
      merchantType: props.after.merchant?.merchantType,
    },
  };

  const [form] = Form.useForm();
  const [formAfter]  = Form.useForm();
  form.setFieldsValue(formVals);
  formAfter.setFieldsValue(afterFormVals);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'ccpay.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="ccpayMerName" label={intl.formatMessage({ id: 'ccpay.ccpayMerName' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="fee" label={intl.formatMessage({ id: 'ccpay.fee' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="checkState" label={intl.formatMessage({ id: 'ccpay.checkState' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="operation" label={intl.formatMessage({ id: 'ccpay.operation' })}>
          <Input disabled />
        </Form.Item>


      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'ccpay.checkCompoent' })}
      visible={modalVisible}
      width={1040}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
    
    >
              
    <Row>
    <Col span={12}>
            <Card title={intl.formatMessage({ id: 'ccpay.check.after' })}>
                <Form {...formLayout} form={formAfter}>
                    {renderContent()}
                </Form>
            </Card>
      </Col>

        <Col span={12}>
            <Card title={intl.formatMessage({ id: 'ccpay.check.before' })}>
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
            onSubmit({...afterFormVals,...values})
        }
    
        // onSubmit(props.after.merchantId || '', values as CheckData)
    }
      >
      <Row>
        <Col span={8}>
        <Form.Item
              name="checkState"
              label={intl.formatMessage({ id: 'ccpay.checkState' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'ccpay.checkState.required' }),
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
