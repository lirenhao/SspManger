import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { FormattedMessage, formatMessage } from 'umi';
import CreateForm from './components/CreateForm';
import { TableListItem } from './data';
import { queryRole, saveRole } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await saveRole({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: formatMessage({ id: 'appRole.roleName' }),
      dataIndex: 'roleName',
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'appRole.roleNameNecessary' }),
        },
      ],
    },
    {
      title: formatMessage({ id: 'appRole.role' }),
      dataIndex: 'key',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'appRole.role' }),
      dataIndex: 'role',
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'appRole.desc' }),
      dataIndex: 'roleDescripiton',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="appRole.create" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRole({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default TableList;
