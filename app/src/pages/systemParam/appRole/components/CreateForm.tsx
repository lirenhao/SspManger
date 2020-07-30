// import React from 'react';
// import { Modal } from 'antd';
// import { IntlShape } from 'umi';

// interface CreateFormProps {
//   intl: IntlShape;
//   modalVisible: boolean;
//   onCancel: () => void;
// }

// const CreateForm: React.FC<CreateFormProps> = (props) => {
//   const { modalVisible, onCancel, intl } = props;
//   return (
//     <Modal
//       destroyOnClose
//       title={intl.formatMessage({ id: 'appRole.createCompoent' })}
//       visible={modalVisible}
//       onCancel={() => onCancel()}
//       footer={null}
//     >
//       {props.children}
//     </Modal>
//   );
// };

// export default CreateForm;

import React, { useState } from 'react';
import { Form, Modal, Input, Button, message } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import { exist } from '../service';

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
    id: '',
    name: '',
    remark: '',
  });

  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    const isExists = await exist({ ...formVals, ...fieldsValue });
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
          name="id"
          label={intl.formatMessage({ id: 'appRole.role' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appRole.roleNecessary' }),
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
        <Form.Item name="remark" label={intl.formatMessage({ id: 'appRole.desc' })}>
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
      title={intl.formatMessage({ id: 'role.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
