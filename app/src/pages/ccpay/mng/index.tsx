/* eslint-disable import/no-named-as-default-member */
import { message, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import { PlusOutlined } from '@ant-design/icons';

import CreateForm from './components/CreateForm';
import ViewForm from './components/ViewForm';
import { TableListItem, checkStateEnum, operEnmu, ccyNotifyFlagEnum } from './data.d';
import { query, save } from './service';

/**
 * 添加
 * @param fields
 */
const handleSaveAndUpdate = async (fields: TableListItem, intl: IntlShape) => {
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

// const OptionArr = {};

// Object.keys(data).forEach((key) => {
//   OptionArr[key] = { text: data[key], status: key };
// });

// const checkStateArr = {};
// const useCaseArr = {};
// const operArr = {};

// Object.keys(checkStateEnum).forEach((key) => {
//   checkStateArr[key] = { text: checkStateEnum[key], status: key };
// });

// Object.keys(useCaseEnmu).forEach((key) => {
//   useCaseArr[key] = { text: useCaseEnmu[key], status: key };
// });

// Object.keys(operEnmu).forEach((key) => {
//   operArr[key] = { text: operEnmu[key], status: key };
// });

const TableList: React.FC<{}> = () => {
  const [createModalViewVisible, handleModalViewVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
      title: intl.formatMessage({ id: 'ccpay.merchantId' }),
      dataIndex: 'merchantId',
    },

    {
      title: intl.formatMessage({ id: 'ccpay.ccpayMerName' }),
      dataIndex: 'ccpayMerName',
    },
    {
      title: intl.formatMessage({ id: 'ccpay.notifyFlag' }),
      dataIndex: 'notifyFlag',
      hideInSearch: true,
      valueEnum: ccyNotifyFlagEnum,
    },
    {
      title: intl.formatMessage({ id: 'ccpay.fee' }),
      dataIndex: 'fee',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'ccpay.checkState' }),
      dataIndex: 'checkState',
      initialValue: undefined,
      valueEnum: checkStateEnum,
    },

    {
      title: intl.formatMessage({ id: 'ccpay.operation' }),
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
        rowKey="merchantId"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="global.create" />
          </Button>,
        ]}
        columns={columns}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value, intl);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <ViewForm
        values={stepFormValues}
        onCancel={() => handleModalViewVisible(false)}
        modalVisible={createModalViewVisible}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value, intl);
          if (success) {
            handleModalViewVisible(false);
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
