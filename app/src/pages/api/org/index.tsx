import { PlusOutlined } from '@ant-design/icons';
import { Divider, Modal, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import { TableListItem } from './data';
import { fetchQuery, fetchGet, fetchSave, fetchUpdate, fetchDel } from './service';
import Form from './components/Form';
import Show from './components/Show';

const { confirm } = Modal;

const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const [isView, setIsView] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [info, setInfo] = useState<Partial<TableListItem>>({});

  const handleView = async (id: string) => {
    try {
      const info = await fetchGet(id);
      setInfo(info);
      setIsView(true);
    } catch (err) {

    }
  }

  const handleCreate = async (record: TableListItem) => {
    try {
      await fetchSave(record);
      setIsCreate(false);
      await actionRef.current?.reload();
    } catch (err) {

    }
  }

  const beforeUpdate = async (id: string) => {
    try {
      const info = await fetchGet(id);
      setInfo(info);
      setIsUpdate(true);
    } catch (err) {

    }
  }

  const handleUpdate = async (record: TableListItem) => {
    try {
      await fetchUpdate(record);
      setIsUpdate(false);
      await actionRef.current?.reload();
    } catch (err) {

    }
  }

  const handleDelete = (orgId: string) => {
    confirm({
      title: intl.formatMessage({ id: 'api.org.delete' }, { orgId }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchDel(orgId)
          await actionRef.current?.reload();
        } catch (err) {

        }
      }
    });
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <>
          <a onClick={() => beforeUpdate(record.orgId)}>
            {intl.formatMessage({ id: 'global.edit' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.orgId)}>
            {intl.formatMessage({ id: 'global.delete' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleView(record.orgId)}>
            {intl.formatMessage({ id: 'global.view' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'api.org.orgId' }),
      dataIndex: 'orgId',
    },
    {
      title: intl.formatMessage({ id: 'api.org.orgName' }),
      dataIndex: 'orgName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'api.org.orgType' }),
      dataIndex: 'orgType',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'api.org.orgType.0' }) },
        '1': { text: intl.formatMessage({ id: 'api.org.orgType.1' }) },
        '2': { text: intl.formatMessage({ id: 'api.org.orgType.2' }) },
        '9': { text: intl.formatMessage({ id: 'api.org.orgType.9' }) },
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
              sort: Object.keys(sort).map(key => `${key},desc${sort[key]?.replace('end', '')}`),
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
      <Show
        title={intl.formatMessage({ id: 'api.org.view.title' })}
        info={info}
        modalVisible={isView}
        onCancel={() => setIsView(false)}
      />
      <Form
        title={intl.formatMessage({ id: 'api.org.create.title' })}
        info={{}}
        modalVisible={isCreate}
        onCancel={() => setIsCreate(false)}
        onSubmit={handleCreate}
      />
      <Form
        title={intl.formatMessage({ id: 'api.org.update.title' })}
        info={info}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default TableList;
