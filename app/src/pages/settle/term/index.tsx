/* eslint-disable import/no-named-as-default-member */
import { Button, DatePicker } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';

import { TableListItem, TableListParams } from './data.d';
import { query, download } from './service';

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [downloadparams, setDownloadParams] = useState<TableListParams>({});

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'termCount.month' }),
      dataIndex: 'month',
      hideInTable: true,
      renderFormItem: () => <DatePicker format="YYYYMM" picker="month" />,
    },

    {
      title: intl.formatMessage({ id: 'termCount.merNameEng' }),
      dataIndex: 'merNameEng',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'termCount.merchantId' }),
      dataIndex: 'merchantId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.terminalId' }),
      dataIndex: 'terminalId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.vendorName' }),
      dataIndex: 'vendorName',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'termCount.terminalBrand' }),
      dataIndex: 'terminalBrand',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.terminalModel' }),
      dataIndex: 'terminalModel',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.snNo' }),
      dataIndex: 'snNo',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.installAddress' }),
      dataIndex: 'installAddress',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.termStatus' }),
      dataIndex: 'termStatus',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.termCreateDate' }),
      dataIndex: 'termCreateDate',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.bankCustomerNum' }),
      dataIndex: 'bankCustomerNum',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'termCount.termModifyDate' }),
      dataIndex: 'termModifyDate',
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
            result.content.forEach(
              (element: {
                lsId: string;
                yearmon: string;
                orgId: string;
                terminalId: string;
                merchantId: string;
              }) => {
                // eslint-disable-next-line no-param-reassign
                element.lsId =
                  element.yearmon + element.orgId + element.terminalId + element.merchantId;
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
              download(downloadparams);
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
