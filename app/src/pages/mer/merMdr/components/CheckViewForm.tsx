import React from 'react';
import { Form, Modal, Input, Col, Row, Card } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  before: Partial<TableListItem>;
  after: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel } = props;

  const [form] = Form.useForm();
  const [formAfter] = Form.useForm();
  form.setFieldsValue(props.before);
  formAfter.setFieldsValue(props.after);

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

        <Form.Item name="checkReason" label={intl.formatMessage({ id: 'merMdr.checkReason' })}>
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
      title={intl.formatMessage({ id: 'merAddon.updateCompoent' })}
      visible={modalVisible}
      width={1040}
      onCancel={() => onCancel()}
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

export default CreateForm;
