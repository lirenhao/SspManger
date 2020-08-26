import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, useModel } from 'umi';
import { TableListItem, MerchantData, CcyTypeData, CheckData } from './data';
import {
  fetchAllMer, fetchCcyTypes, fetchQuery, fetchGet, fetchGetCheck, fetchCheck
} from './service';
import Check from './components/Check';

const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = React.useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const orgId = initialState?.currentUser?.orgId;

  const [isCheck, setIsCheck] = React.useState<boolean>(false);
  const [after, setAfter] = React.useState<Partial<TableListItem>>({});
  const [before, setBefore] = React.useState<Partial<TableListItem>>({});

  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);
  const [ccyTypes, setCcyTypes] = React.useState<CcyTypeData[]>([]);

  React.useEffect(() => {
    fetchAllMer().then(setMerchants);
    fetchCcyTypes().then(setCcyTypes);
  }, []);

  const beforeCheck = async (merNo: string, loginName: string) => {
    try {
      const info = await fetchGet(merNo, loginName);
      const checkInfo = await fetchGetCheck(merNo, loginName);
      setAfter(info);
      setBefore(checkInfo);
      setIsCheck(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleCheck = async (merNo: string, loginName: string, record: CheckData) => {
    try {
      await fetchCheck(merNo, loginName, record);
      setIsCheck(false);
      actionRef.current?.reload();
    } catch (err) {
      console.log(err.message);
    }
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <>
          {
            record.checkState === '0' ? (
              <a onClick={() => beforeCheck(record.merNo, record.loginName)}>
                {intl.formatMessage({ id: 'global.check' })}
              </a>
            ) : null
          }
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
      renderText: text => merchants.filter(item => item.merchantId === text)[0]?.merNameEng,
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
      <Check
        title={intl.formatMessage({ id: 'appUser.check.title' })}
        before={before}
        after={after}
        modalVisible={isCheck}
        onCancel={() => setIsCheck(false)}
        onSubmit={handleCheck}
      />
    </PageContainer>
  );
};

export default TableList;
