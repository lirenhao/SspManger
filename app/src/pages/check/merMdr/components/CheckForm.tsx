import React from 'react';
import { Form, Modal, Input, Col, Radio, Row, Card } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  before: Partial<TableListItem>;
  after : Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;



  const [form] = Form.useForm();
  form.setFieldsValue(props.before);

  
  const [formAfter] = Form.useForm();
  form.setFieldsValue(props.after);

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
      title={intl.formatMessage({ id: 'merAddon.updateCompoent' })}
      visible={modalVisible}
      width={1040}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      // footer={
      //   <>
      //     <Button
      //       onClick={() => {
      //         onSubmit({
      //           ...formVals,
      //           ...{ checkState: '1', checkReason: form.getFieldValue('checkReason') },
      //         } as TableListItem);
      //       }}
      //     >
      //       {intl.formatMessage({ id: 'check.approval' })}
      //     </Button>

      //     <Button
      //       onClick={() => {
      //         onSubmit({
      //           ...formVals,
      //           ...{ checkState: '2', checkReason: form.getFieldValue('checkReason') },
      //         } as TableListItem);
      //       }}
      //     >
      //       {intl.formatMessage({ id: 'check.reject' })}
      //     </Button>

      //     <Button
      //       onClick={() => {
      //         onCancel();
      //       }}
      //     >
      //       {intl.formatMessage({ id: 'check.cancel' })}
      //     </Button>
      //   </>
      // }
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
          onSubmit({...props.after,...values})
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
                  message: intl.formatMessage({ id: 'merMdr.checkStateRequired' }),
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

export default CreateForm;
