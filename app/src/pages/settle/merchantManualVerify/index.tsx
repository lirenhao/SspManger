/* eslint-disable import/no-named-as-default-member */
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';

import CreateForm from './components/CreateForm';
import CheckForm from './components/CheckForm';
import ViewForm from './components/ViewForm';
import { TableListItem, checkStateEnum, operEnmu } from './data.d';
import { query, save, check, fetchGetAllMer, getMerEnum } from './service';

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const handleSaveAndUpdate = async (fields: TableListItem) => {
    const hide = message.loading(intl.formatMessage({ id: 'global.running' }));

    try {
      await save({ ...fields });
      hide();
      message.success(intl.formatMessage({ id: 'global.success' }));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({ id: 'global.error' }));
      return false;
    }
  };

  const handleCheck = async (fields: TableListItem) => {
    const hide = message.loading(intl.formatMessage({ id: 'global.running' }));

    try {
      await check({ ...fields });
      hide();
      message.success(intl.formatMessage({ id: 'global.success' }));
      return true;
    } catch (error) {
      hide();
      message.error(intl.formatMessage({ id: 'global.error' }));
      return false;
    }
  };
  const actionRef = useRef<ActionType>();
  const [viewVisible, handleModalViewVisible] = useState(false);
  const [checkVisible, handleModalCheckVisible] = useState(false);
  const [manualVisible, handelVisibleManual] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const [merchants, setMerchants] = React.useState({});

  React.useEffect(() => {
    fetchGetAllMer().then((mer) => {
      const merEnum = getMerEnum(mer);
      setMerchants(merEnum);
    });
  }, []);

  /**
   * 添加
   * @param fields
   */

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
            {intl.formatMessage({ id: 'global.view' })}
          </a>

          {/* <a
            onClick={() => {
              setStepFormValues(record);
              handleModalCheckVisible(true);
            }}
          >
            {intl.formatMessage({ id: 'global.check' })}
          </a> */}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.lsId' }),
      dataIndex: 'lsId',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.inputDate' }),
      dataIndex: 'inputDate',
      valueType: 'date',
    },

    {
      title: intl.formatMessage({ id: 'manualSettle.merchantId' }),
      dataIndex: 'merchantId',
      valueEnum: merchants,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.tranAmt' }),
      dataIndex: 'tranAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.fee' }),
      dataIndex: 'fee',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.settleAmt' }),
      dataIndex: 'settleAmt',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.settleDate' }),
      dataIndex: 'settleDate',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.checkState' }),
      dataIndex: 'checkState',
      initialValue: undefined,
      valueEnum: checkStateEnum,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.checkReason' }),
      dataIndex: 'checkReason',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'manualSettle.operation' }),
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
            const queryParams = {
              ...params,
              size: params.pageSize,
              page: (params.current as number) - 1,
              sort: Object.keys(sort).map((key) => `${key},desc${sort[key]?.replace('end', '')}`),
            };
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
              handelVisibleManual(true);
            }}
          >
            <PlusOutlined /> {intl.formatMessage({ id: 'global.create' })}
          </Button>,
        ]}
      />

      <CreateForm
        onCancel={() => handelVisibleManual(false)}
        modalVisible={manualVisible}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value);
          if (success) {
            handelVisibleManual(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <ViewForm
        values={stepFormValues}
        onCancel={() => handleModalViewVisible(false)}
        modalVisible={viewVisible}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value);
          if (success) {
            handleModalViewVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <CheckForm
        values={stepFormValues}
        onCancel={() => handleModalCheckVisible(false)}
        modalVisible={checkVisible}
        onSubmit={async (value) => {
          const success = await handleCheck(value);
          if (success) {
            handleModalCheckVisible(false);
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
