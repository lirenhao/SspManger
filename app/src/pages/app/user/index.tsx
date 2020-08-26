import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Modal, Button, notification } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, useModel } from 'umi';
import { TableListItem, MerchantData, CcyTypeData } from './data';
import {
  fetchAllMer, fetchCcyTypes, fetchQuery, fetchGet, fetchSave, fetchUpdate, fetchDel, fetchResetPwd
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

  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);
  const [ccyTypes, setCcyTypes] = React.useState<CcyTypeData[]>([]);

  React.useEffect(() => {
    fetchAllMer().then(setMerchants);
    fetchCcyTypes().then(setCcyTypes);
  }, []);

  const handleCreate = async (record: TableListItem) => {
    try {
      await fetchSave(record);
      setIsCreate(false);
      actionRef.current?.reload();
    } catch (err) {
      console.log(err.message);
    }
  }

  const beforeUpdate = async (merNo: string, loginName: string) => {
    try {
      const result = await fetchGet(merNo, loginName);
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

  const handleDelete = (merNo: string, loginName: string) => {
    confirm({
      title: intl.formatMessage({ id: 'appUser.delete' }, { id: merNo + loginName }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchDel(merNo, loginName);
          actionRef.current?.reload();
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  }

  const handleResetPwd = (merNo: string, loginName: string) => {
    confirm({
      title: intl.formatMessage({ id: 'appUser.reset' }, { id: merNo + loginName }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchResetPwd(merNo, loginName)
          notification.success({
            message: intl.formatMessage({ id: 'appUser.reset.success' }, { id: merNo + loginName }),
          })
        } catch (err) {
          notification.error({
            message: intl.formatMessage({ id: 'appUser.reset.error' }, { id: merNo + loginName }),
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
          <a onClick={() => beforeUpdate(record.merNo, record.loginName)}>
            {intl.formatMessage({ id: 'global.edit' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.merNo, record.loginName)}>
            {intl.formatMessage({ id: 'global.delete' })}
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleResetPwd(record.merNo, record.loginName)}>
            {intl.formatMessage({ id: 'appUser.reset.action' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'appUser.merNo' }),
      dataIndex: 'merNo',
      renderText: text => text.split('@')[0],
    },
    {
      title: intl.formatMessage({ id: 'appUser.merchantName' }),
      dataIndex: 'merNo',
      renderText: text => merchants.filter(item => item.merchantId === text.split('@')[0])[0]?.merNameEng,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'appUser.termNo' }),
      dataIndex: 'termNo',
    },
    {
      title: intl.formatMessage({ id: 'appUser.loginName' }),
      dataIndex: 'loginName',
    },
    {
      title: intl.formatMessage({ id: 'appUser.userName' }),
      dataIndex: 'userName',
    },
    {
      title: intl.formatMessage({ id: 'appUser.roles' }),
      dataIndex: 'roles',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'appUser.ccyType' }),
      dataIndex: 'ccyType',
      valueEnum: ccyTypes.reduce((a, b) => ({ ...a, [b.ccyType]: { text: b.ccyName } }), {}),
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'appUser.checkState' }),
      dataIndex: 'checkState',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'appUser.checkState.0' }) },
        '1': { text: intl.formatMessage({ id: 'appUser.checkState.1' }) },
        '2': { text: intl.formatMessage({ id: 'appUser.checkState.2' }) },
      },
    },

    {
      title: intl.formatMessage({ id: 'appUser.operation' }),
      dataIndex: 'operation',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'appUser.operation.0' }) },
        '1': { text: intl.formatMessage({ id: 'appUser.operation.1' }) },
        '2': { text: intl.formatMessage({ id: 'appUser.operation.2' }) },
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey={record => record.merNo + record.loginName}
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
        title={intl.formatMessage({ id: 'appUser.create.title' })}
        info={{}}
        modalVisible={isCreate}
        onCancel={() => setIsCreate(false)}
        onSubmit={handleCreate}
      />
      <Form
        title={intl.formatMessage({ id: 'appUser.update.title' })}
        info={{ ...info, roles: (info.roles as string)?.split(',') }}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default TableList;
