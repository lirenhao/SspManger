import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { query, save, remove } from './service';

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const intl = useIntl();
  /**
   * 添加
   * @param fields
   */
  const handleSaveAndUpdate = async (fields: TableListItem) => {
    const hide = message.loading(intl.formatMessage({ id: 'global.running' }));

    try {
      await save({ ...fields });
      hide();
      message.success(intl.formatMessage({ id: 'global.success' }));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({ id: 'global.error' }));
      return false;
    }
  };

  /**
   * 添加
   * @param fields
   */
  const handleDel = async (fields: TableListItem) => {
    const hide = message.loading(intl.formatMessage({ id: 'global.running' }));
    try {
      await remove({ ...fields });
      hide();
      message.success(intl.formatMessage({ id: 'global.success' }));
      return true;
    } catch (error) {
      hide();
      message.success(intl.formatMessage({ id: 'global.error' }));
      return false;
    }
  };
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
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
            {intl.formatMessage({ id: 'global.edit' })}
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDel(record);
              actionRef.current?.reload();
            }}
          >
            {intl.formatMessage({ id: 'global.delete' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'banks.accountBankNo' }),
      dataIndex: 'accountBankNo',
    },
    {
      title: intl.formatMessage({ id: 'banks.bankName' }),
      dataIndex: 'bankName',
    },
    {
      title: intl.formatMessage({ id: 'banks.bic' }),
      dataIndex: 'bic',
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={async (params = {}, sort = {}) => {
          try {
            const result = await query({
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
        headerTitle=""
        actionRef={actionRef}
        rowKey="accountBankNo"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> {intl.formatMessage({ id: 'global.create' })}
          </Button>,
        ]}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
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
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          values={stepFormValues}
          onCancel={() => handleUpdateModalVisible(false)}
          modalVisible={updateModalVisible}
          onSubmit={async (value) => {
            const success = await handleSaveAndUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
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
