import React from 'react';
import { Form, Modal, Input } from 'antd';
import ReactQuill from 'react-quill';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import { fetchExistId } from '../service';

import 'react-quill/dist/quill.snow.css';

interface FormProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

const FormView: React.FC<FormProps> = (props) => {
  const { title, info, modalVisible, onCancel, onSubmit } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  /**
   * ReactQuill在
   */
  React.useEffect(() => {
    return () => {
      form.resetFields();
    }
  });

  return (
    <Modal
      destroyOnClose={true}
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      okText={intl.formatMessage({ id: 'global.submit' })}
      width={1040}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={info}
        onFinish={values => onSubmit({ ...info, ...values } as TableListItem)}
      >
        {info.id ? (
          <Form.Item label={intl.formatMessage({ id: 'policy.id' })}>
            <Input value={info.id} readOnly />
          </Form.Item>
        ) : (
            <Form.Item
              name="id"
              label={intl.formatMessage({ id: 'policy.id' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'policy.id.required' }),
                },
                {
                  validator: (_, value) => (value === '' || value === info.id) ? Promise.resolve() :
                    fetchExistId(value).then((result: boolean) => result ? Promise.reject(intl.formatMessage({ id: 'policy.id.validator' })) : Promise.resolve()),
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        <Form.Item
          name="title"
          label={intl.formatMessage({ id: 'policy.title.feild' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'policy.title.required' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label={intl.formatMessage({ id: 'policy.content' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'policy.content.required' }),
            },
          ]}
        >
          <ReactQuill />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default FormView;
