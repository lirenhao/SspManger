import { PlusOutlined } from '@ant-design/icons';
import { Divider, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import { TableListItem } from './data';
import { fetchQuery } from './service';
import Form from './components/Form';


const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [record, setRecord] = useState<Partial<TableListItem>>({});

  const handleUpdate = (record: TableListItem) => {
    setIsUpdate(true);
    setRecord(record);
  }

  const handleDelete = () => {

  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <>
          <a onClick={() => handleUpdate(record)} >
            {intl.formatMessage({ id: 'global.edit' })}
          </a>
          <Divider type="vertical" />
          <a onClick={handleDelete}>
            {intl.formatMessage({ id: 'global.delete' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'api.org.id' }),
      dataIndex: 'orgId',
    },
    {
      title: intl.formatMessage({ id: 'api.org.name' }),
      dataIndex: 'orgName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'api.org.type' }),
      dataIndex: 'orgType',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'api.org.type.0' }) },
        '1': { text: intl.formatMessage({ id: 'api.org.type.1' }) },
        '2': { text: intl.formatMessage({ id: 'api.org.type.2' }) },
        '3': { text: intl.formatMessage({ id: 'api.org.type.3' }) },
      },
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="orgId"
        toolBarRender={() => [
          <Button type="primary" onClick={() => setIsCreate(true)}>
            <PlusOutlined />{intl.formatMessage({ id: 'global.create' })}
          </Button>,
        ]}
        options={{ density: false, fullScreen: true, reload: true, setting: false }}
        request={async (params = {}, sort = {}) => {
          try {
            const result = await fetchQuery({
              ...params,
              size: params.pageSize,
              page: params.current as number - 1,
              sort: Object.keys(sort).map(key => `${key},desc${sort[key].replace('end', '')}`),
            });
            return {
              data: result.content,
              page: result.totalPages,
              total: result.totalElements,
              success: true,
            }
          } catch (err) {
            return {
              data: [],
              success: false,
            }
          }
        }}
        columns={columns}
      />
      <Form
        title={intl.formatMessage({ id: 'role.createCompoent' })}
        info={{}}
        modalVisible={isCreate}
        onCancel={() => setIsCreate(false)}
        onSubmit={() => { }}
      />
      <Form
        title={intl.formatMessage({ id: 'role.createCompoent' })}
        info={record}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={() => { }}
      />
    </PageContainer>
  );
};

export default TableList;
