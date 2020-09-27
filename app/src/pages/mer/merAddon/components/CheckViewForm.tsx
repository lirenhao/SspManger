import React from 'react';
import { Form, Modal, Input, Row, Col, Card } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  // values: Partial<TableListItem>;
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
  form.setFieldsValue(props.before);
  const [formAfter] = Form.useForm();
  formAfter.setFieldsValue(props.after);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merAddon.merchantId' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="ccyType" label={intl.formatMessage({ id: 'merAddon.ccyType' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="internationalCode"
          label={intl.formatMessage({ id: 'merAddon.internationalCode' })}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name="checkReason" label={intl.formatMessage({ id: 'merQrc.checkReason' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="checkState" label={intl.formatMessage({ id: 'merQrc.checkState' })}>
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
