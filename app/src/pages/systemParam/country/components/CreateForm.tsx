import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { exist } from '../service';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  intl: IntlShape;
}

export interface CreateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const [formVals] = useState<TableListItem>({
    internationalCode: '',
    codeName: '',
    codeEname: '',
  });

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="internationalCode"
          label={intl.formatMessage({ id: 'country.internationalCode' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'country.internationalCodeNecessary' }),
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
          <Input />
        </Form.Item>
        <Form.Item
          name="codeName"
          label={intl.formatMessage({ id: 'country.cName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'country.cNameNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="codeEname"
          label={intl.formatMessage({ id: 'country.eName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'country.cNameNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'country.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
      okText={intl.formatMessage({ id: 'global.submit' })}
      cancelText={intl.formatMessage({ id: 'global.cancel' })}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          internationalCode: formVals.internationalCode,
          codeName: formVals.codeName,
          codeEname: formVals.codeEname,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
