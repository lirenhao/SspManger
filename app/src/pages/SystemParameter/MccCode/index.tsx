import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { FormattedMessage, formatMessage } from 'umi';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { queryMcc, saveMcc, removeMcc } from './service';

/**
 * 添加
 * @param fields
 */
const handleSaveAndUpdate = async (fields: TableListItem) => {
  const hide = message.loading(formatMessage({ id: 'global.running' }));
  try {
    await saveMcc({ ...fields });
    hide();
    message.success(formatMessage({ id: 'global.success' }));
    return true;
  } catch (error) {
    hide();
    message.error(formatMessage({ id: 'global.error' }));
    return false;
  }
};

/**
 * 添加
 * @param fields
 */
const handleDel = async (fields: TableListItem) => {
  const hide = message.loading('global.running');
  try {
    await removeMcc({ ...fields });
    hide();
    message.success('global.success');
    return true;
  } catch (error) {
    hide();
    message.error('global.error');
    return false;
  }
};

// const handleGet = async (fields: TableListItem) => {
//   const hide = message.loading('global.running');
//   try {
//     await getMcc({ ...fields });
//     hide();
//     message.success('global.success');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('global.error');
//     return false;
//   }
// };

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            <FormattedMessage id="mcc.updateCompoent" />
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDel(record);
              actionRef.current?.reload();
            }}
          >
            <FormattedMessage id="mcc.delete" />
          </a>
        </>
      ),
    },
    {
      title: formatMessage({ id: 'mcc.mcc' }),
      dataIndex: 'mcc',
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'mcc.mccNecessary' }),
        },
      ],
    },
    {
      title: formatMessage({ id: 'mcc.remark' }),
      dataIndex: 'roleDescripiton',
      valueType: 'textarea',
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={(params, sorter, filter) => queryMcc({ ...params, sorter, filter })}
        headerTitle=""
        actionRef={actionRef}
        rowKey="mcc"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="mcc.create" />
          </Button>,
        ]}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleSaveAndUpdate(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="mcc"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          values={stepFormValues}
          onCancel={() => handleUpdateModalVisible(false)}
          modalVisible={updateModalVisible}
          onSubmit={async (value) => {
            const success = await handleSaveAndUpdate(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
