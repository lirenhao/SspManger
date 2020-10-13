/* eslint-disable import/no-named-as-default-member */
import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';

import CreateForm from './components/CreateForm';
import CheckViewForm from './components/CheckViewForm';

import CheckForm from './components/CheckForm';
import { TableListItem, checkStateEnum, operEnmu, useCaseEnmu, cardAssoEnum } from './data.d';
import { query, save, get, getCheck, getCcyType, saveCheck } from './service';

const ccyArr = {};

const TableList: React.FC<{}> = () => {
  const [createModalViewVisible, handleModalViewVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const ccyArray: { ccyType: string; ccyName: string }[] = [];
  const [ccyData, setCcy] = useState(ccyArray);
  const intl = useIntl();
  /**
   * 添加
   * @param fields
   */
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

  const handleSaveCheck = async (fields: TableListItem) => {
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
  const actionRef = useRef<ActionType>();
  React.useEffect(() => {
    getCcyType().then(setCcy);
  }, []);

  const [after, setAfter] = React.useState<Partial<TableListItem>>({});
  const [before, setBefore] = React.useState<Partial<TableListItem>>({});

  const [isCheck, setIsCheck] = React.useState<boolean>(false);

  const beforeCheck = async (params: TableListItem) => {
    try {
      const info = await get(params);
      setAfter(info);
      const checkInfo = await getCheck(params);
      setBefore(checkInfo);
    } catch (err) {
      console.error(err.message);
    }
  };

  ccyData.forEach((element) => {
    ccyArr[element.ccyType] = { text: element.ccyName, status: element.ccyType };
  });

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
            {intl.formatMessage({ id: 'global.view' })}
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              beforeCheck(record);
              setIsCheck(true);
            }}
          >
            {intl.formatMessage({ id: 'global.check' })}
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
      title: intl.formatMessage({ id: 'merQrc.merchantId' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'merQrc.terminalId' }),
      dataIndex: 'terminalId',
    },
    {
      title: intl.formatMessage({ id: 'merQrc.ccyCode' }),
      dataIndex: 'ccyCode',
      initialValue: undefined,
      valueEnum: ccyArr,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'merQrc.ccyCode' }),
      dataIndex: 'ccyType',
      initialValue: undefined,
      valueEnum: ccyArr,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merQrc.useCase' }),
      dataIndex: 'useCase',
      initialValue: undefined,
      valueEnum: useCaseEnmu,
    },
    {
      title: intl.formatMessage({ id: 'merQrc.cardAsso' }),
      dataIndex: 'cardAsso',
      initialValue: undefined,
      valueEnum: cardAssoEnum,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merQrc.qrValue' }),
      dataIndex: 'qrValue',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'merQrc.checkState' }),
      dataIndex: 'checkState',
      initialValue: undefined,
      valueEnum: checkStateEnum,
    },
    {
      title: intl.formatMessage({ id: 'merQrc.operation' }),
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

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
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
          const success = await handleSaveCheck(value);
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
