import React from 'react';
import { Form, Modal, TreeSelect, Select, Input } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { useIntl } from 'umi';
import { TableListItem, MerchantData } from '../data';
import { fetchOrgTree, fetchOrgMap, fetchMerByOrgId, fetchAll } from '../service';

interface FormProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
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
  const [form] = Form.useForm();

  const [orgTree, setOrgTree] = React.useState<DataNode[]>([]);
  const [orgMap, setOrgMap] = React.useState<Object>({});
  const [merchants, setmerchants] = React.useState<MerchantData[]>([]);
  const [merNos, setMerNos] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
    fetchOrgMap().then(setOrgMap);
    fetchAll().then(data => setMerNos(data?.map((item: any) => item.id.split('@')[0])))
  }, [info]);

  const handleOrgChange = async (orgId: string) => {
    await fetchMerByOrgId(orgId).then(setmerchants);
    await fetchAll().then(data => setMerNos(data?.map((item: any) => item.id.split('@')[0])))
    form.setFieldsValue({
      ...form.getFieldsValue(),
      id: undefined,
    });
  }

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      okText={intl.formatMessage({ id: 'global.submit' })}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={info}
        onFinish={values => {
          onSubmit({ ...info, ...values } as TableListItem);
          form.resetFields();
        }}
      >
        {info.id ? (
          <Form.Item label={intl.formatMessage({ id: 'webUser.orgId' })}>
            {`${info.orgId} [${orgMap[info.orgId || '']}]`}
          </Form.Item>
        ) : (
            <Form.Item
              name="orgId"
              label={intl.formatMessage({ id: 'webUser.orgId' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'webUser.orgId.required' }),
                },
              ]}
            >
              <TreeSelect treeDefaultExpandAll treeData={orgTree} onChange={(value: string) => handleOrgChange(value)} />
            </Form.Item>
          )}
        {info.id ? (
          <Form.Item label={intl.formatMessage({ id: 'webUser.merchantId' })}>
            {info.id.split('@')[0]}
          </Form.Item>
        ) : (
            <Form.Item
              name="id"
              label={intl.formatMessage({ id: 'webUser.merchantId' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'webUser.id.required' }),
                },
              ]}
            >
              <Select allowClear showSearch>
                {
                  merchants
                    .filter(item => !merNos.includes(item.merchantId))
                    .map(item => (<Select.Option value={item.merchantId}>{`${item.merchantId}-${item.merNameEng}`}</Select.Option>))
                }
              </Select>
            </Form.Item>
          )}
        <Form.Item
          name="email"
          label={intl.formatMessage({ id: 'webUser.email' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'webUser.email.required' }),
            },
            {
              type: 'email',
              message: intl.formatMessage({ id: 'webUser.email.fromat' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default FormView;
