import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import CheckForm from './components/CheckForm';
import CheckViewForm from './components/CheckViewForm';

import { TableListItem, checkStateEnum, merchantTypeEnmu, operEnmu } from './data.d';
import { queryCheck, get, getCheck, saveCheck } from './service';

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
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

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

  //

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Divider type="vertical" />
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
      title: intl.formatMessage({ id: 'merAddon.merchantId' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'merAddon.cName' }),
      dataIndex: ['merchant', 'merNameChn'],
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.eName' }),
      dataIndex: ['merchant', 'merNameEng'],
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.merchantType' }),
      dataIndex: ['merchant', 'merchantType'],
      initialValue: undefined,
      valueEnum: merchantTypeEnmu,
    },

    {
      title: intl.formatMessage({ id: 'merAddon.ccyType' }),
      dataIndex: 'ccyType',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.internationalCode' }),
      dataIndex: 'internationalCode',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.checkState' }),
      dataIndex: 'checkState',
      initialValue: undefined,
      valueEnum: checkStateEnum,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.checkReason' }),
      dataIndex: 'checkReason',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.operation' }),
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
            const result = await queryCheck({
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
        rowKey="merchantId"
        columns={columns}
      />
      <CheckViewForm
        onCancel={() => handleModalViewVisible(false)}
        modalVisible={createModalViewVisible}
        before={before}
        after={after}
      />

      <CheckForm
        // values={stepFormValues}
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
