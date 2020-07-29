import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { formatMessage } from 'umi';
import { TableListItem } from '../data';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

// export interface FormValueType extends Partial<TableListItem> {
//   mcc?: string;
//   remark?: string;
// }

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit } = props;
  const [formVals] = useState<TableListItem>({
    ccyName: props.values.ccyName ? props.values.ccyName : '',
    ccyType: props.values.ccyType ? props.values.ccyType : '',
    ccyEname: props.values.ccyEname,
    ccySymbol: props.values.ccySymbol,
  });

  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item name="ccyType" label={formatMessage({ id: 'currency.ccyType' })}>
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="ccyName" label={formatMessage({ id: 'currency.ccyName' })}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="ccyEname" label={formatMessage({ id: 'currency.eName' })}>
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item name="ccySymbol" label={formatMessage({ id: 'currency.symbol' })}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button name="finish" type="primary" onClick={() => handleSubmit()}>
          完成
        </Button>
        <Button name="clean" onClick={() => onCancel()}>
          取消
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
      title={formatMessage({ id: 'mcc.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
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
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
