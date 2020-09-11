import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { existCcy } from '../service';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  intl: IntlShape;
}

// export interface FormValueType extends Partial<TableListItem> {
//   mcc?: string;
//   remark?: string;
// }

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const [formVals] = useState<TableListItem>({
    ccyName: '',
    ccyType: '',
    ccyEname: '',
    ccySymbol: '',
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
          name="ccyType"
          label={intl.formatMessage({ id: 'currency.ccyType' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'currency.ccyTypeNecessary' }),
            },


            {
              validator: (_, value:string) =>

              
                value === ''
                  ? Promise.resolve()
                  : existCcy(value).then((result: boolean) =>
                      result
                        ? Promise.reject(intl.formatMessage({ id: 'global.createExists' }))
                        : Promise.resolve(),
                    ),
            },
          ]}
        >
          <Input maxLength={3}/>
        </Form.Item>
        <Form.Item
          name="ccyName"
          label={intl.formatMessage({ id: 'currency.ccyName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'currency.ccyNameNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item           
         rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'currency.eNameNecessary' }),
            },
          ]} name="ccyEname" label={intl.formatMessage({ id: 'currency.eName' }) }>
          <Input />
        </Form.Item>
        <Form.Item rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'currency.ccySymbolNecessary' }),
            },
          ]} name="ccySymbol" label={intl.formatMessage({ id: 'currency.symbol' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'ccy.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          ccyName: formVals.ccyName,
          ccyType: formVals.ccyType,
          ccyEname: formVals.ccyEname,
          ccySymbol: formVals.ccySymbol,
        }}
        onFinish={() => handleSubmit()}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
