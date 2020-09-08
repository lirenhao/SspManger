/* eslint-disable import/no-named-as-default-member */
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';

import { TableListItem, TableListParams } from './data.d';
import { query, download,fetchGetAllMer,getMerEnum } from './service';

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [downloadparams, setDownloadParams] = useState<TableListParams>({});
  const [merchants, setMerchants] = React.useState({});

React.useEffect(() => {
  fetchGetAllMer().then(mer=>{
    const merEnum = getMerEnum(mer);
    setMerchants(merEnum)
  });
}, []);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'settleDetail.lsId' }),
      dataIndex: 'lsId',
      hideInSearch: true,
      hideInForm: true,
      hideInTable:true,
    },
    {
      title: intl.formatMessage({ id: 'settleList.merchantId' }),
      dataIndex: 'merchantId',
      valueEnum: merchants,
      hideInTable:true,
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.terminalId' }),
      dataIndex: 'terminalId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.cardNo' }),
      dataIndex: 'cardNo',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'settleDetail.tranDate' }),
      dataIndex: 'tranDate',
      hideInSearch:true
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.tranTime' }),
      dataIndex: 'tranTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.tranAmt' }),
      dataIndex: 'tranAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.fee' }),
      dataIndex: 'fee',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'settleDetail.settleAmt' }),
      dataIndex: 'settleAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.settleDate' }),
      dataIndex: 'settleDate',
      valueType: 'dateRange',
      hideInTable:true
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.tranName' }),
      dataIndex: 'tranName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'settleDetail.rrn' }),
      dataIndex: 'rrn',
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

            const result = await query(queryParams);
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
        rowKey="merchantId"
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              download(downloadparams);
            }}
          >
            <CloudDownloadOutlined /> <FormattedMessage id="global.download" />
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
