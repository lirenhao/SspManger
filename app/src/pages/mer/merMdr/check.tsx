/* eslint-disable import/no-named-as-default-member */
import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import CheckViewForm from './components/CheckViewForm';
import { TableListItem, checkStateEnum, operEnmu, cardAssoEnum, feeTypeEnum } from './data.d';
import CheckForm from './components/CheckForm';
import { query, saveCheck, get, getCheck } from './service';

const handleSaveCheck = async (fields: TableListItem, intl: IntlShape) => {
  const hide = message.loading(intl.formatMessage({ id: 'global.running' }));

  try {
    await saveCheck({ ...fields });
    hide();
    message.success(intl.formatMessage({ id: 'global.success' }));
    return true;
  } catch (error) {
    hide();
    message.error(intl.formatMessage({ id: 'global.error' }));
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalViewVisible, handleModalViewVisible] = useState<boolean>(false);
  const [after, setAfter] = React.useState<Partial<TableListItem>>({});
  const [before, setBefore] = React.useState<Partial<TableListItem>>({});
  const [isCheck, setIsCheck] = React.useState<boolean>(false);

  const beforeCheck = async (params: TableListItem) => {
    try {
      const info = await get(params);
      const checkInfo = await getCheck(params);
      setAfter(info);
      setBefore(checkInfo);
    } catch (err) {
      console.error(err.message);
    }
  };

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
              beforeCheck(record);
              handleModalViewVisible(true);
            }}
          >
            <FormattedMessage id="global.view" />
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              beforeCheck(record);
              setIsCheck(true);
            }}
          >
            <FormattedMessage id="global.check" />
          </a>
        </>
      ),
    },
    {
      dataIndex: 'lsId',
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: intl.formatMessage({ id: 'merMdr.merchantId' }),
      dataIndex: 'merchantId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merMdr.feeType' }),
      dataIndex: 'feeType',
      hideInSearch: true,
      valueEnum: feeTypeEnum,
    },
    {
      title: intl.formatMessage({ id: 'merMdr.cardOrgNum' }),
      dataIndex: 'cardOrgNum',
      initialValue: undefined,
      valueEnum: cardAssoEnum,
    },

    {
      title: intl.formatMessage({ id: 'merMdr.tranCnt' }),
      dataIndex: 'tranCnt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merMdr.tranAmt' }),
      dataIndex: 'tranAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merMdr.fee' }),
      dataIndex: 'fee',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merMdr.feeMinAmt' }),
      dataIndex: 'feeMinAmt',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'merMdr.checkState' }),
      dataIndex: 'checkState',
      initialValue: undefined,
      valueEnum: checkStateEnum,
    },

    {
      title: intl.formatMessage({ id: 'merMdr.startDate' }),
      dataIndex: 'startDate',
      initialValue: undefined,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merMdr.closeDate' }),
      dataIndex: 'closeDate',
      initialValue: undefined,
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'merMdr.operation' }),
      dataIndex: 'operation',
      initialValue: undefined,
      valueEnum: operEnmu,
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
              sort: Object.keys(sort).map((key) => `${key},desc${sort[key]?.replace('end', '')}`),
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
        rowKey="lsId"
        columns={columns}
      />

      <CheckViewForm
        onCancel={() => handleModalViewVisible(false)}
        modalVisible={createModalViewVisible}
        before={before}
        after={after}
      />
      <CheckForm
        onCancel={() => setIsCheck(false)}
        modalVisible={isCheck}
        before={before}
        after={after}
        onSubmit={async (value) => {
          const success = await handleSaveCheck(value, intl);
          if (success) {
            setIsCheck(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </PageContainer>
  );
};

export default TableList;
