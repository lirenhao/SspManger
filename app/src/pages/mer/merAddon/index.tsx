import { message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import ViewForm from './components/ViewForm';
import UpdateForm from './components/UpdateForm';

import { TableListItem, checkStateEnum, merchantTypeEnmu, operEnmu } from './data.d';
import { query, save, remove } from './service';

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

const displayDelete = (params: TableListItem) => {
  return params.hasMerchantExtra && params.checkState !== '0';
};
const displayEdit = (params: TableListItem) => {
  if (!params.hasMerchantExtra) {
    return true;
  }
  if (params.checkState !== '0') {
    return true;
  }
  return false;
};

const handleDelCheck = async (fields: TableListItem, intl: IntlShape) => {
  const hide = message.loading(intl.formatMessage({ id: 'global.running' }));

  try {
    await remove({ ...fields });
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
            style={displayEdit(record) ? { display: 'block' } : { display: 'none' }}
            onClick={() => {
              setStepFormValues(record);
              handleUpdateModalVisible(true);
            }}
          >
            <FormattedMessage id="global.edit" />
          </a>
          <Divider
            type="vertical"
            style={displayEdit(record) ? { display: 'block' } : { display: 'none' }}
          />
          <a
            onClick={() => {
              setStepFormValues(record);
              handleModalViewVisible(true);
            }}
          >
            <FormattedMessage id="global.view" />
          </a>
          <Divider
            style={displayDelete(record) ? { display: 'block' } : { display: 'none' }}
            type="vertical"
          />
          <a
            style={displayDelete(record) ? { display: 'block' } : { display: 'none' }}
            onClick={() => {
              handleDelCheck(record, intl);
              actionRef.current?.reload();
            }}
          >
            <FormattedMessage id="global.delete" />
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
      dataIndex: 'merNameChn',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.eName' }),
      dataIndex: 'merNameEng',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'merAddon.merchantType' }),
      dataIndex: 'merchantType',
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

      {/* <CheckForm
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
      /> */}
    </PageContainer>
  );
};

export default TableList;
