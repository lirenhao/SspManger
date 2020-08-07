import { PlusOutlined } from '@ant-design/icons';
import { Divider, Modal, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import { TableListItem } from './data';
import { fetchQuery, fetchGet, fetchPut, fetchIssue } from './service';
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
      const result = await fetchGet(id);
      setInfo(result);
      setIsView(true);
    } catch (err) {

    }
  }

  const handleCreate = async (record: TableListItem) => {
    try {
      await fetchPut(record);
      setIsCreate(false);
      actionRef.current?.reloadAndRest();
    } catch (err) {

    }
  }

  const beforeUpdate = async (id: string) => {
    try {
      const result = await fetchGet(id);
      setInfo(result);
      setIsUpdate(true);
    } catch (err) {

    }
  }

  const handleUpdate = async (record: TableListItem) => {
    try {
      await fetchPut(record);
      setIsUpdate(false);
      actionRef.current?.reloadAndRest();
    } catch (err) {

    }
  }

  const handleDelete = (id: string) => {
    confirm({
      title: intl.formatMessage({ id: 'policy.delete' }, { id }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchIssue(id)
          actionRef.current?.reloadAndRest();
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
          <a onClick={() => beforeUpdate(record.id)}>
            {intl.formatMessage({ id: 'global.edit' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleView(record.id)}>
            {intl.formatMessage({ id: 'global.view' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.id)}>
            {intl.formatMessage({ id: 'policy.operate.issue' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'policy.id' }),
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'policy.title.feild' }),
      dataIndex: 'title',
    },
    {
      title: intl.formatMessage({ id: 'policy.createTime' }),
      dataIndex: 'createTime',
      renderText: (text: string) => text,
    },
    {
      title: intl.formatMessage({ id: 'policy.updateTime' }),
      dataIndex: 'updateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        search={false}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => setIsCreate(true)}>
            <PlusOutlined />{intl.formatMessage({ id: 'global.create' })}
          </Button>,
        ]}
        options={{ density: false, fullScreen: true, reload: true, setting: false }}
        request={async () => {
          try {
            const result = await fetchQuery();
            return {
              data: result,
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
        title={intl.formatMessage({ id: 'policy.view.title' })}
        info={info}
        modalVisible={isView}
        onCancel={() => setIsView(false)}
      />
      <Form
        title={intl.formatMessage({ id: 'policy.create.title' })}
        info={{}}
        modalVisible={isCreate}
        onCancel={() => setIsCreate(false)}
        onSubmit={handleCreate}
      />
      <Form
        title={intl.formatMessage({ id: 'policy.update.title' })}
        info={info}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default TableList;
