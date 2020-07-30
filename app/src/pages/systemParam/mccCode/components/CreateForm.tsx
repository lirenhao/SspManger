import React, { useState } from 'react';
import { Form, Modal, Input, Button, message } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { existMcc } from '../service';

interface CreateFormProps {
  intl: IntlShape;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit, intl } = props;
  const [formVals] = useState<TableListItem>({
    mcc: '',
    remark: '',
  });

  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    const isExists = await existMcc({ ...formVals, ...fieldsValue });
    if (isExists) {
      message.error(intl.formatMessage({ id: 'global.createExists' }));
    } else {
      onSubmit({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="mcc"
          label={intl.formatMessage({ id: 'mcc.mcc' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'mcc.mccNecessary' }),
            },
          ]}
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="remark" label={intl.formatMessage({ id: 'mcc.remark' })}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button name="finish" type="primary" onClick={() => handleSubmit()}>
          {intl.formatMessage({ id: 'global.submit' })}
        </Button>
        <Button name="clean" onClick={() => onCancel()}>
          {intl.formatMessage({ id: 'global.cancel' })}
        </Button>
      </>
    );
  };

  // const renderFooter = ()=>{
  //   return(
  //     <>
  //         <Button type="primary" onClick={() => handleNext()}>
  //           {formatMessage({id : 'global.submit'})}
  //         </Button>
  //     </>
  //   )
  // }

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'mcc.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          mcc: formVals.mcc,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
