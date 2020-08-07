import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import CreateForm from './components/CreateForm';
import { TableListItem } from './data';
import { query, save, remove, getOrg } from './service';

/**
 * 添加
 * @param fields
 */
const handleSaveAndUpdate = async (fields: TableListItem, intl: IntlShape) => {
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
const handleDel = async (fields: TableListItem, intl: IntlShape) => {
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

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const [data, setOrg] = useState({});

  React.useEffect(() => {
    getOrg().then(setOrg);
  }, []);

  const OptionArr = {};

  Object.keys(data).forEach((key) => {
    OptionArr[key] = { text: data[key], status: key };
  });

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDel(record, intl);
              actionRef.current?.reload();
            }}
          >
            <FormattedMessage id="global.delete" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.orgId' }),
      dataIndex: 'orgId',
      initialValue: undefined,
      valueEnum: OptionArr,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.orgId' }),
      dataIndex: ['org', 'name'],
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.pwd1' }),
      dataIndex: 'tmkZmk',
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.pwd2' }),
      dataIndex: 'tmkWeb',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.terminalId' }),
      dataIndex: 'terminalId',
      hideInSearch: true,
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
              sort: Object.keys(sort).map((key) => `${key},desc${sort[key].replace('end', '')}`),
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
        rowKey="orgId"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="global.create" />
          </Button>,
        ]}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        orgData={data}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value, intl);
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