import React from 'react';
import { Modal } from 'antd';
import { IntlShape } from 'umi';

interface CreateFormProps {
  intl: IntlShape;
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, intl } = props;
  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'appRole.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
