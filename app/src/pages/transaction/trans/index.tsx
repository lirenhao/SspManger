/* eslint-disable import/no-named-as-default-member */
// import {  message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage /* IntlShape */ } from 'umi';
import ViewForm from './components/ViewForm';

import { TableListItem } from './data.d';
import { query } from './service';

const TableList: React.FC<{}> = () => {
  const [createModalViewVisible, handleModalViewVisible] = useState<boolean>(false);
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      dataIndex: 'option',
      valueType: 'option',

      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setStepFormValues(record);
              handleModalViewVisible(true);
            }}
          >
            <FormattedMessage id="global.view" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'trans.traceNo' }),
      dataIndex: 'traceNo',
    },

    {
      title: intl.formatMessage({ id: 'trans.tranAmt' }),
      dataIndex: 'tranAmt',
      // initialValue: undefined,
      // valueEnum: merchantTypeEnmu,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'trans.tranType' }),
      dataIndex: 'tranType',
    },
    {
      title: intl.formatMessage({ id: 'trans.channel' }),
      dataIndex: 'channel',
    },

    {
      title: intl.formatMessage({ id: 'trans.cardNo' }),
      dataIndex: 'cardNo',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'trans.tranAmt' }),
      dataIndex: 'tranAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'trans.merNo' }),
      dataIndex: 'merNo',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'trans.termNo' }),
      dataIndex: 'termNo',
    },

    {
      title: intl.formatMessage({ id: 'trans.rrn' }),
      dataIndex: 'rrn',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'trans.respCode' }),
      dataIndex: 'respCode',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'trans.merTraceNo' }),
      dataIndex: 'merTraceNo',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'trans.channelTraceNo' }),
      dataIndex: 'channelTraceNo',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={async (params = {}, sort = {}) => {
          try {
            const result = await query({
              ...params,
              size: params.pageSize,
              page: (params.current as number) - 1,
              sort: Object.keys(sort).map((key) => `${key},desc${sort[key].replace('end', '')}`),
            });
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
        rowKey="traceNo"
        columns={columns}
      />
      <ViewForm
        values={stepFormValues}
        onCancel={() => handleModalViewVisible(false)}
        modalVisible={createModalViewVisible}
        onSubmit={async () => {}}
      />
    </PageContainer>
  );
};

export default TableList;
