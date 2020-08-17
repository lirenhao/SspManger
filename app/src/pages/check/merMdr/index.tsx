/* eslint-disable import/no-named-as-default-member */
import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';

import CheckForm from './components/CheckForm';
import ViewForm from './components/ViewForm';
import { TableListItem, checkStateEnum, operEnmu, cardAssoEnum, feeTypeEnum } from './data.d';
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
  const [modalViewVisible, handleModalViewVisible] = useState<boolean>(false);

  const [checkModalVisible, handleCheckModalVisible] = useState<boolean>(false);
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
          <Divider type="vertical" />
          <a
            onClick={() => {
              setStepFormValues(record);
              handleCheckModalVisible(true);
            }}
          >
            <FormattedMessage id="global.check" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'merMdr.merchantId' }),
      dataIndex: 'lsId',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: intl.formatMessage({ id: 'merMdr.merchantId' }),
      dataIndex: 'merchantId',
      // initialValue: undefined,
      // valueEnum: merchantTypeEnmu,
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
        rowKey="merchantId"
        columns={columns}
      />

      <ViewForm
        values={stepFormValues}
        onCancel={() => handleModalViewVisible(false)}
        modalVisible={modalViewVisible}
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
        values={stepFormValues}
        onCancel={() => handleCheckModalVisible(false)}
        modalVisible={checkModalVisible}
        onSubmit={async (value) => {
          const success = await handleSaveAndUpdate(value, intl);
          if (success) {
            handleCheckModalVisible(false);
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