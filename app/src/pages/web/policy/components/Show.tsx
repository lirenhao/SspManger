import React from 'react';
import { Modal } from 'antd';
import { TableListItem } from '../data';

interface ShowProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
}

const ShowView: React.FC<ShowProps> = (props) => {
  const { title, info, modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={1040}
    >
      <br />
      <div style={{ textAlign: 'center' }}>
        <h1>{info.title}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: info.content || '' }} />
    </Modal >
  );
};

export default ShowView;
