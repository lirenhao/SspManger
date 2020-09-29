/* eslint-disable import/no-named-as-default-member */
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';

import { TableListItem, TableListParams } from './data.d';
import { query, download } from './service';

const TableList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [downloadparams, setDownloadParams] = useState<TableListParams>({});
  const isSuccess = true;
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'settleList.settleDate' }),
      dataIndex: 'settleDate',
      valueType: 'dateRange',
    },

    {
      title: intl.formatMessage({ id: 'settleList.merchantId' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'settleList.merchantName' }),
      dataIndex: 'merNameEng',
    },
    {
      title: intl.formatMessage({ id: 'settleList.accountNo' }),
      dataIndex: 'accountNo',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'settleList.accountName' }),
      dataIndex: 'accountName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleList.accountBankName' }),
      dataIndex: 'accountBankName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleList.settleAmt' }),
      dataIndex: 'settleAmt',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={async (params = {}, sort = {}) => {
          try {
            const queryParams = {
              ...params,
              size: params.pageSize,
              page: (params.current as number) - 1,
              sort: Object.keys(sort).map((key) => `${key},desc${sort[key]?.replace('end', '')}`),
            };
            setDownloadParams(queryParams);

            const result = await query(isSuccess, queryParams);
            result.content.forEach(
              (element: { lsId: string; settleDate: string; merchantId: string }) => {
                // eslint-disable-next-line no-param-reassign
                element.lsId = element.settleDate + element.merchantId;
              },
            );
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
        rowKey="lsId"
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              download(isSuccess, downloadparams);
            }}
          >
            <CloudDownloadOutlined /> {intl.formatMessage({ id: 'global.download' })}
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
