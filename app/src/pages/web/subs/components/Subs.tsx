import React from 'react';
import { Form, Modal, Row, Col, Input, Select, Table, Button } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import { fetchGetSubs, fetchGetAllMer } from '../service';

interface FormProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (merNo: string, subNos: string[]) => void;
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
  const { title, info, modalVisible, onCancel, onSubmit } = props;

  const intl = useIntl();

  const [value, setValue] = React.useState<string[]>([]);
  const [merSubs, setMerSubs] = React.useState<TableListItem[]>([]);
  const [merchants, setMerchants] = React.useState<TableListItem[]>([]);

  React.useEffect(() => {
    if (info.merchantId)
      fetchGetSubs(info.merchantId).then(data => {
        setMerSubs(data);
      });
    fetchGetAllMer().then(setMerchants);
  }, [info]);

  const handleSubmit = () => {
    onSubmit(info.merchantId || '', merSubs.map(mer => mer.merchantId));
  }

  const handleDelete = (merchantId: string) => {
    setMerSubs(merSubs.filter(mer => mer.merchantId !== merchantId))
  }

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleSubmit}
      okText={intl.formatMessage({ id: 'global.submit' })}
      width={1040}
    >
      <Form {...formLayout}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={intl.formatMessage({ id: 'webSubs.merchantId' })}>
              <Input value={info.merchantId} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={intl.formatMessage({ id: 'webSubs.merNameChnAbbr' })}>
              <Input value={info.merNameChnAbbr} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ md: { span: 4 } }}
          wrapperCol={{ md: { span: 20 } }}
          label={intl.formatMessage({ id: 'webSubs.subMerNo' })}
        >
          <Row gutter={24}>
            <Col span={20}>
              <Select mode="multiple" style={{ width: '100%' }} value={value} onChange={(value: string[]) => setValue(value)}>
                {merchants
                  .filter(mer => mer.merchantId !== info.merchantId)
                  .filter(mer => !merSubs.map(mer => mer.merchantId).includes(mer.merchantId))
                  .map(mer => (<Select.Option value={mer.merchantId}>{`${mer.merchantId}[${mer.merNameEngAbbr}]`}</Select.Option>))
                }
              </Select>
            </Col>
            <Col span={4}>
              <Button type="primary"
                disabled={value.length === 0}
                onClick={() => {
                  setMerSubs([...merchants.filter(mer => value.includes(mer.merchantId)), ...merSubs])
                  setValue([]);
                }}
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Table<TableListItem>
        rowKey="merchantId"
        pagination={false}
        dataSource={merSubs}
        columns={[
          {
            title: intl.formatMessage({ id: 'webSubs.merchantId' }),
            dataIndex: 'merchantId',
            key: 'merchantId',
          },
          {
            title: intl.formatMessage({ id: 'webSubs.merNameChnAbbr' }),
            dataIndex: 'merNameChnAbbr',
            key: 'merNameChnAbbr',
          },
          {
            title: intl.formatMessage({ id: 'webSubs.merNameEngAbbr' }),
            dataIndex: 'merNameEngAbbr',
            key: 'merNameEngAbbr',
          },
          {
            title: intl.formatMessage({ id: 'webSubs.mapping.action' }),
            key: 'action',
            render: (_, record) => (
              <Button type="link" onClick={() => handleDelete(record.merchantId)}>
                {intl.formatMessage({ id: 'webSubs.mapping.delete' })}
              </Button>
            ),
          },
        ]}
      />
    </Modal >
  );
};

export default FormView;
