/* eslint-disable import/no-named-as-default-member */
import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';

import CreateForm from './components/CreateForm';
import ViewForm from './components/ViewForm';
import CheckForm from './components/CheckForm';
import { TableListItem, checkStateEnum, operEnmu, ccyNotifyFlagEnum } from './data.d';


import { query, save,get,fetchGetCheck,saveCheck } from './service';

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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  
  //
  const [after, setAfter] = React.useState<Partial<TableListItem>>({});
  const [before, setBefore] = React.useState<Partial<TableListItem>>({});
  
  const [isCheck, setIsCheck] = React.useState<boolean>(false);

  const beforeCheck = async (params: TableListItem) => {
    try {
      const info = await get(params);
      const checkInfo = await fetchGetCheck(params);
      setAfter(info);
      setBefore(checkInfo);
      setIsCheck(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  //

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
          
          <Divider type="vertical" />
          <a
            onClick={() => {
              beforeCheck(record);
            }}
          >
            <FormattedMessage id="global.check" />
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
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined /> <FormattedMessage id="global.create" />
        //   </Button>,
        // ]}
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
      <CheckForm
        // values={stepFormValues}
        onCancel={() => setIsCheck(false)}
        modalVisible={isCheck}
        before = {before}
        after = {after}
        onSubmit={async (value) => {
          const success = await handleSaveCheck(value,intl);
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
