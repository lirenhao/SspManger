import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import { exist } from '../service';

interface CreateFormProps {
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

const CreateForm: React.FC<CreateFormProps> = (props) => {

  const { modalVisible, onCancel, onSubmit } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'appRole.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
    >
      <Form {...formLayout}
        form={form}
        onFinish={values => onSubmit(values as TableListItem)}
      >
        <Form.Item
          name="id"
          label={intl.formatMessage({ id: 'appRole.role' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appRole.roleNecessary' }),
            },
            {
              validator: (_, value) =>
                value === ''
                  ? Promise.resolve()
                  : exist(value).then((result: boolean) =>
                    result
                      ? Promise.reject(intl.formatMessage({ id: 'global.createExists' }))
                      : Promise.resolve(),
                  ),
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'appRole.roleName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appRole.roleNameNecessary' }),
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="remark" label={intl.formatMessage({ id: 'appRole.remark' })}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
