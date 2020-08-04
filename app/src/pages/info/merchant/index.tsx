import React, { useState, useRef } from 'react';
import { TreeSelect } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, useModel } from 'umi';
import { TableListItem } from './data';
import { fetchQuery, fetchGet, fetchOrgTree } from './service';
import Show from './components/Show';

const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const orgId = initialState?.currentUser?.orgId;

  const [isView, setIsView] = useState<boolean>(false);
  const [info, setInfo] = useState<Partial<TableListItem>>({});
  const [orgTree, setOrgTree] = useState<DataNode[]>([]);

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
  }, []);

  const handleView = async (id: string) => {
    try {
      const info = await fetchGet(id);
      setInfo(info);
      setIsView(true);
    } catch (err) {

    }
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <a onClick={() => handleView(record.merchantId)}>
          {intl.formatMessage({ id: 'merchant.view', defaultMessage: 'VIEW' })}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'merchant.orgId', defaultMessage: '' }),
      dataIndex: 'orgId',
      renderFormItem: (item, { onChange, ...rest }) => (
        <TreeSelect treeDefaultExpandAll treeData={orgTree}
          {...item.formItemProps} {...rest} onChange={onChange}
        />
      ),
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'merchant.merchantId', defaultMessage: '' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'merchant.merNameChnAbbr', defaultMessage: '' }),
      dataIndex: 'merNameChnAbbr',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merchant.merNameEngAbbr', defaultMessage: '' }),
      dataIndex: 'merNameEngAbbr',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merchant.merchantType', defaultMessage: '' }),
      dataIndex: 'merchantType',
      valueEnum: {
        'J': { text: intl.formatMessage({ id: 'merchant.merchantType.J', defaultMessage: 'SUB GROUP' }) },
        'D': { text: intl.formatMessage({ id: 'merchant.merchantType.D', defaultMessage: 'OUTLETS' }) },
        'O': { text: intl.formatMessage({ id: 'merchant.merchantType.O', defaultMessage: 'ORGANISATION' }) },
      },
    },
    {
      title: intl.formatMessage({ id: 'merchant.merStatus', defaultMessage: '' }),
      dataIndex: 'merStatus',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'merchant.merStatus.0', defaultMessage: 'PENDING' }) },
        '1': { text: intl.formatMessage({ id: 'merchant.merStatus.1', defaultMessage: 'NORMAL' }) },
        '3': { text: intl.formatMessage({ id: 'merchant.merStatus.3', defaultMessage: 'TERMINATED' }) },
      },
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
      <Show
        title={intl.formatMessage({ id: 'merchant.view.title' })}
        info={info}
        modalVisible={isView}
        onCancel={() => setIsView(false)}
      />
    </PageContainer>
  );
};

export default TableList;
