import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Modal, Button, TreeSelect, notification } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, useModel } from 'umi';
import { TableListItem, MerchantData } from './data';
import {
  fetchOrgTree, fetchOrgMap, fetchAllMer, fetchMerByOrgId,
  fetchQuery, fetchGet, fetchSave, fetchUpdate, fetchDel, fetchResetPwd
} from './service';
import Form from './components/Form';

const { confirm } = Modal;

const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = React.useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const orgId = initialState?.currentUser?.orgId;

  const [isCreate, setIsCreate] = React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<Partial<TableListItem>>({});
  const [orgTree, setOrgTree] = React.useState<DataNode[]>([]);
  const [orgMap, setOrgMap] = React.useState<Object>({});
  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
    fetchOrgMap().then(setOrgMap);
    fetchAllMer().then(setMerchants);
    fetchMerByOrgId(orgId || '');
  }, []);

  const handleCreate = async (record: TableListItem) => {
    try {
      await fetchSave({
        ...record,
        id: `${record.id}@admin`,
      });
      setIsCreate(false);
      actionRef.current?.reload();
    } catch (err) {
      console.log(err.message);
    }
  }

  const beforeUpdate = async (id: string) => {
    try {
      const result = await fetchGet(id);
      setInfo(result);
      setIsUpdate(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleUpdate = async (record: TableListItem) => {
    try {
      await fetchUpdate(record);
      setIsUpdate(false);
      actionRef.current?.reload();
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleDelete = (id: string) => {
    confirm({
      title: intl.formatMessage({ id: 'webUser.delete' }, { id }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchDel(id)
          actionRef.current?.reload();
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  }

  const handleResetPwd = (id: string) => {
    confirm({
      title: intl.formatMessage({ id: 'webUser.reset' }, { id }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchResetPwd(id)
          notification.success({
            message: intl.formatMessage({ id: 'webUser.reset.success' }, { id }),
          })
        } catch (err) {
          notification.error({
            message: intl.formatMessage({ id: 'webUser.reset.error' }, { id }),
          });
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
          <a onClick={() => handleDelete(record.id)}>
            {intl.formatMessage({ id: 'global.delete' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleResetPwd(record.id)}>
            {intl.formatMessage({ id: 'webUser.reset.action' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'webUser.orgId' }),
      dataIndex: 'orgId',
      renderFormItem: (item, { onChange, ...rest }) => (
        <TreeSelect treeDefaultExpandAll treeData={orgTree}
          {...item.formItemProps} {...rest} onChange={onChange}
        />
      ),
      renderText: key => orgMap[key],
    },
    {
      title: intl.formatMessage({ id: 'webUser.merchantId' }),
      dataIndex: 'id',
      renderText: text => text.split('@')[0],
    },
    {
      title: intl.formatMessage({ id: 'webUser.merchantName' }),
      dataIndex: 'id',
      renderText: text => merchants.filter(item => item.merchantId === text.split('@')[0])[0]?.merNameEng,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'webUser.email' }),
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'webUser.status' }),
      dataIndex: 'status',
      valueEnum: {
        '00': { text: intl.formatMessage({ id: 'webUser.status.00' }) },
        '01': { text: intl.formatMessage({ id: 'webUser.status.01' }) },
        '02': { text: intl.formatMessage({ id: 'webUser.status.02' }) },
        '03': { text: intl.formatMessage({ id: 'webUser.status.03' }) },
      },
      hideInSearch: true,
      hideInTable: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => setIsCreate(true)}>
            <PlusOutlined />{intl.formatMessage({ id: 'global.create' })}
          </Button>,
        ]}
        options={{ density: false, fullScreen: true, reload: true, setting: false }}
        form={{ initialValues: { orgId } }}
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
      <Form
        title={intl.formatMessage({ id: 'webUser.create.title' })}
        info={{}}
        modalVisible={isCreate}
        onCancel={() => setIsCreate(false)}
        onSubmit={handleCreate}
      />
      <Form
        title={intl.formatMessage({ id: 'webUser.update.title' })}
        info={info}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default TableList;
