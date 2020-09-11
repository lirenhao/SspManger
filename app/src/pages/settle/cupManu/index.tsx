/* eslint-disable import/no-named-as-default-member */
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';

import { TableListItem, statusEnum, TableListParams } from './data.d';
import { query, download, handle } from './service';

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [downloadparams, setDownloadParams] = useState<TableListParams>({});

  const columns: ProColumns<TableListItem>[] = [
    // {
    //   title: intl.formatMessage({ id: 'global.operate' }),
    //   dataIndex: 'option',
    //   valueType: 'option',

    //   render: (_, record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           handle({ lsId: record.lsId ? record.lsId : '' });
    //         }}
    //       >
    //         <FormattedMessage id="global.operate" />
    //       </a>
    //     </>
    //   ),
    // },
    {
      title: intl.formatMessage({ id: 'cup.lsId' }),
      dataIndex: 'lsId',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.settleDate' }),
      dataIndex: 'settleDate',
      valueType: 'date',
    },

    {
      title: intl.formatMessage({ id: 'cup.merchantId' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'cup.terminalId' }),
      dataIndex: 'terminalId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.messageType' }),
      dataIndex: 'messageType',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'cup.pan' }),
      dataIndex: 'pan',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.tranAmt' }),
      dataIndex: 'tranAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.tranDate' }),
      dataIndex: 'tranDate',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.tranTime' }),
      dataIndex: 'tranTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.rrn' }),
      dataIndex: 'rrn',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.authCode' }),
      dataIndex: 'authCode',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'cup.feeReceivable' }),
      dataIndex: 'feeReceivable',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'cup.feePayable' }),
      dataIndex: 'feePayable',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cup.status' }),
      dataIndex: 'status',
      initialValue: undefined,
      valueEnum: statusEnum,
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
        rowKey="lsId"
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
