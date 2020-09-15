import {  message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import UpdateForm from './components/ViewForm';
import { TableListItem } from './data';
import { save,query  } from './service';

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



// const handleGet = async (fields: TableListItem) => {
//   const hide = message.loading('global.running');
//   try {
//     await getMcc({ ...fields });
//     hide();
//     message.success('global.success');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('global.error');
//     return false;
//   }
// };

const TableList: React.FC<{}> = () => {
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
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            <FormattedMessage id="global.edit" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'riskMonitoring.riskCode' }),
      dataIndex: 'riskCode',
      hideInSearch:true
    },
    {
      title: intl.formatMessage({ id: 'riskMonitoring.riskName' }),
      dataIndex: 'riskName',
      hideInSearch:true
    },
    {
        title: intl.formatMessage({ id: 'riskMonitoring.value' }),
        dataIndex: 'value',
        hideInSearch:true
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
        rowKey="mcc"
        toolBarRender={() => [
        ]}
        columns={columns}
      />
    
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          intl={intl}
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
