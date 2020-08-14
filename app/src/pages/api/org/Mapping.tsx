import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import { TableListItem } from './data';
import { fetchQuery, fetchGet, fetchMapping } from './service';
import Mers from './components/Mers';

const Mapping: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [info, setInfo] = useState<Partial<TableListItem>>({});

  const beforeUpdate = async (id: string) => {
    try {
      const info = await fetchGet(id);
      setInfo(info);
      setIsUpdate(true);
    } catch (err) {

    }
  }

  const handleUpdate = async (orgId: string, merNos: string[]) => {
    try {
      await fetchMapping(orgId, merNos);
      setIsUpdate(false);
    } catch (err) {

    }
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <a onClick={() => beforeUpdate(record.orgId)}>
          {intl.formatMessage({ id: 'apiOrg.operate.mapping' })}
        </a>
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
      <Mers
        title={intl.formatMessage({ id: 'api.org.mapping.title' })}
        info={info}
        modalVisible={isUpdate}
        onCancel={() => setIsUpdate(false)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default Mapping;
