import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import ViewForm from './components/ViewForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem, checkStateEnum, merchantTypeEnmu, operEnmu } from './data.d';
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
// const merchantTypeArr = {};
// const operArr = {};

// Object.keys(checkStateEnum).forEach((key) => {
//   checkStateArr[key] = { text: checkStateEnum[key], status: key };
// });

// Object.keys(merchantTypeEnmu).forEach((key) => {
//   merchantTypeArr[key] = { text: merchantTypeEnmu[key], status: key };
// });

// Object.keys(operEnmu).forEach((key) => {
//   operArr[key] = { text: operEnmu[key], status: key };
// });

const TableList: React.FC<{}> = () => {
  const [createModalViewVisible, handleModalViewVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
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
              handleUpdateModalVisible(true);
            }}
          >
            <FormattedMessage id="global.edit" />
          </a>
          <Divider type="vertical" />
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
        columns={columns}
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
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          values={stepFormValues}
          onCancel={() => handleUpdateModalVisible(false)}
          modalVisible={updateModalVisible}
          onSubmit={async (value) => {
            const success = await handleSaveAndUpdate(value, intl);
            if (success) {
              handleUpdateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
