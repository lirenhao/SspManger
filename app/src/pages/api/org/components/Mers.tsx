import React from 'react';
import { Form, Modal, Row, Col, Input, Select, Table, Button } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, MerchantData } from '../data';
import { fetchGetOrgMer, fetchGetAllMer } from '../service';

interface FormProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (id: string, merNos: string[]) => void;
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
  const [orgMers, setOrgMers] = React.useState<MerchantData[]>([]);
  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);

  React.useEffect(() => {
    if (info.orgId)
      fetchGetOrgMer(info.orgId).then(data => {
        setOrgMers(data);
      });
    fetchGetAllMer().then(setMerchants);
  }, [info]);

  const handleSubmit = () => {
    onSubmit(info.orgId || '', orgMers.map(mer => mer.merchantId));
  }

  const handleDelete = (merchantId: string) => {
    setOrgMers(orgMers.filter(mer => mer.merchantId !== merchantId))
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
            <Form.Item label={intl.formatMessage({ id: 'api.org.orgId' })}>
              <Input value={info.orgId} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={intl.formatMessage({ id: 'api.org.orgName' })}>
              <Input value={info.orgName} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ md: { span: 4 } }}
          wrapperCol={{ md: { span: 20 } }}
          label={intl.formatMessage({ id: 'api.org.merchantId' })}
        >
          <Row gutter={24}>
            <Col span={20}>
              <Select mode="multiple" style={{ width: '100%' }} value={value} onChange={(value: string[]) => setValue(value)}>
                {merchants
                  .filter(mer => !orgMers.map(mer => mer.merchantId).includes(mer.merchantId))
                  .map(mer => (<Select.Option value={mer.merchantId}>{`${mer.merchantId}[${mer.merNameEngAbbr}]`}</Select.Option>))
                }
              </Select>
            </Col>
            <Col span={4}>
              <Button type="primary"
                disabled={value.length === 0}
                onClick={() => {
                  setOrgMers([...merchants.filter(mer => value.includes(mer.merchantId)), ...orgMers])
                  setValue([]);
                }}
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Table<MerchantData>
        rowKey="merchantId"
        pagination={false}
        dataSource={orgMers}
        columns={[
          {
            title: intl.formatMessage({ id: 'api.org.merchantId' }),
            dataIndex: 'merchantId',
            key: 'merchantId',
          },
          {
            title: intl.formatMessage({ id: 'api.org.merNameChnAbbr' }),
            dataIndex: 'merNameChnAbbr',
            key: 'merNameChnAbbr',
          },
          {
            title: intl.formatMessage({ id: 'api.org.merNameEngAbbr' }),
            dataIndex: 'merNameEngAbbr',
            key: 'merNameEngAbbr',
          },
          {
            title: intl.formatMessage({ id: 'api.org.mapping.action' }),
            key: 'action',
            render: (_, record) => (
              <Button type="link" onClick={() => handleDelete(record.merchantId)}>
                {intl.formatMessage({ id: 'api.org.mapping.delete' })}
              </Button>
            ),
          },
        ]}
      />
    </Modal >
  );
};

export default FormView;
