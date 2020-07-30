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
      title: intl.formatMessage({ id: 'appRole.roleName' }),
      dataIndex: 'roleName',
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'appRole.roleNameNecessary' }),
        },
      ],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    },
    {
      title: intl.formatMessage({ id: 'appRole.role' }),
      dataIndex: 'key',
      hideInForm: true,
      hideInSearch: true,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    },
    {
      title: intl.formatMessage({ id: 'appRole.role' }),
      dataIndex: 'role',
      hideInSearch: true,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    },
    {
      title: intl.formatMessage({ id: 'appRole.desc' }),
      dataIndex: 'roleDescripiton',
      valueType: 'textarea',
      hideInSearch: true,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
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
            <PlusOutlined /> <FormattedMessage id="global.create" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRole({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm
        intl={intl}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value, intl);
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
