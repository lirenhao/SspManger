import React from 'react';
import { Modal, Row, Col, Card, Form, Radio, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, MerchantData, CcyTypeData, CheckData } from '../data';
import { fetchAllMer, fetchCcyTypes } from '../service';

interface FormProps {
  title: string;
  before: Partial<TableListItem>;
  after: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (merNo: string, loginName: string, values: CheckData) => void;
}

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16 },
  },
};

const FormView: React.FC<FormProps> = (props) => {
  const { title, before, after, modalVisible, onCancel, onSubmit } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);
  const [ccyTypes, setCcyTypes] = React.useState<CcyTypeData[]>([]);

  React.useEffect(() => {
    form.resetFields();
    fetchAllMer().then(setMerchants);
    fetchCcyTypes().then(setCcyTypes);
  }, [before]);

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      okText={intl.formatMessage({ id: 'global.submit' })}
      width={1040}
    >
      <Row>
        <Col span={12}>
          <Card title={intl.formatMessage({ id: 'appUser.check.after' })}>
            <Form {...formLayout}>
              <Form.Item label={intl.formatMessage({ id: 'appUser.merNo' })}>
                {after.merNo}[{merchants.filter(item => item.merchantId === after.merNo)[0]?.merNameEng}]
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.termNo' })} >
                {after.termNo}
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.loginName' })}>
                {after.loginName}
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.userName' })}>
                {after.userName}
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.ccyType' })}>
                {after.ccyType}[{ccyTypes.filter(item => item.ccyType === after.ccyType)[0]?.ccyName}]
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.roles' })}>
                {after.roles}
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={intl.formatMessage({ id: 'appUser.check.before' })}>
            <Form  {...formLayout}>
              <Form.Item label={intl.formatMessage({ id: 'appUser.merNo' })}>
                {before.merNo}[{merchants.filter(item => item.merchantId === before.merNo)[0]?.merNameEng}]
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.termNo' })} >
                {before.termNo}
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.loginName' })}>
                {before.loginName}
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.userName' })}>
                {before.userName}
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.ccyType' })}>
                {before.ccyType}[{ccyTypes.filter(item => item.ccyType === before.ccyType)[0]?.ccyName}]
              </Form.Item>
              <Form.Item label={intl.formatMessage({ id: 'appUser.roles' })}>
                {before.roles}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <br />
      <Form
        form={form}
        initialValues={{ checkState: '0' }}
        onFinish={values => onSubmit(after.merNo || '', after.loginName || '', values as CheckData)}
      >
        <Row>
          <Col span={8}>
            <Form.Item
              name="checkState"
              label={intl.formatMessage({ id: 'appUser.check.checkState' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'appUser.check.checkState.required' }),
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
    </Modal >
  );
};

export default FormView;
