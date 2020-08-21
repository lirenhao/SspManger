import React, { useState, useRef } from 'react';
import { TreeSelect } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, useModel } from 'umi';
import { TableListItem } from './data';
import { fetchQuery, fetchGet, fetchOrgTree, fetchPutSubs } from './service';
import Subs from './components/Subs';

const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const orgId = initialState?.currentUser?.orgId;

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [info, setInfo] = useState<Partial<TableListItem>>({});
  const [orgTree, setOrgTree] = useState<DataNode[]>([]);

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
  }, []);

  const beforeUpdate = async (id: string) => {
    try {
      const info = await fetchGet(id);
      setInfo(info);
      setIsUpdate(true);
    } catch (err) {

    }
  }

  const handleUpdate = async (merNo: string, subNos: string[]) => {
    try {
      await fetchPutSubs(merNo, subNos);
      setIsUpdate(false);
    } catch (err) {

    }
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <a onClick={() => beforeUpdate(record.merchantId)}>
          {intl.formatMessage({ id: 'webSubs.mapping', defaultMessage: 'MAPPING' })}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'webSubs.orgId', defaultMessage: '' }),
      dataIndex: 'orgId',
      renderFormItem: (item, { onChange, ...rest }) => (
        <TreeSelect treeDefaultExpandAll treeData={orgTree}
          {...item.formItemProps} {...rest} onChange={onChange}
        />
      ),
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'webSubs.merchantId', defaultMessage: '' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'webSubs.merNameChnAbbr', defaultMessage: '' }),
      dataIndex: 'merNameChnAbbr',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'webSubs.merNameEngAbbr', defaultMessage: '' }),
      dataIndex: 'merNameEngAbbr',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="merchantId"
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
      <Subs
        title={intl.formatMessage({ id: 'webSubs.mapping.title' })}
        info={info}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default TableList;
