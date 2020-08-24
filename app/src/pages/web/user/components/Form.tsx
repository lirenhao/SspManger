import React from 'react';
import { Form, Modal, TreeSelect, Select, Input } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import { fetchOrgTree, fetchOrgMap, fetchExistId } from '../service';

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

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
    fetchOrgMap().then(setOrgMap);
  }, []);

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
        onFinish={values => onSubmit({ ...info, ...values } as TableListItem)}
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
              <TreeSelect treeDefaultExpandAll treeData={orgTree} />
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
                {
                  validator: (_, value) => (value === '' || value === info.id) ? Promise.resolve() :
                    fetchExistId(value).then((result: boolean) => result ? Promise.reject(intl.formatMessage({ id: 'webUser.id.validator' })) : Promise.resolve()),
                },
              ]}
            >
              <Select>

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
