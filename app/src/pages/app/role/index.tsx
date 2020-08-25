import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import CreateForm from './components/CreateForm';
import { TableListItem } from './data';
import { queryRole, saveRole } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem, intl: IntlShape) => {
  const hide = message.loading(intl.formatMessage({ id: 'global.running' }));
  try {
    await saveRole({ ...fields });
    hide();
    message.success(intl.formatMessage({ id: 'global.success' }));
    return true;
  } catch (error) {
    hide();
    message.error(intl.formatMessage({ id: 'global.error' }));
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'appRole.role' }),
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'appRole.roleName' }),
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'appRole.remark' }),
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="global.create" />
          </Button>,
        ]}
        request={async (params = {}, sort = {}) => {
          try {
            const result = await queryRole({
              ...params,
              size: params.pageSize,
              page: (params.current as number) - 1,
              sort: Object.keys(sort).map((key) => `${key},desc${sort[key]?.replace('end', '')}`),
            });
            return {
              data: result.content,
              page: result.totalPages,
              total: result.totalElements,
              success: true,
            };
          } catch (err) {
            return {
              data: [],
              success: false,
            };
          }
        }}
        columns={columns}
      />
      <CreateForm
        modalVisible={createModalVisible}
        onCancel={() => handleModalVisible(false)}
        onSubmit={async (value) => {
          const success = await handleAdd(value, intl);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </PageContainer>
  );
};

export default TableList;
