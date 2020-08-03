import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';
import ViewForm from './components/ViewForm';
// import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryAll } from './service';

/**
 * 添加
 * @param fields
 */
const TableList: React.FC<{}> = () => {
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
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
              handleViewModalVisible(true);
              setStepFormValues(record);
            }}
          >
            <FormattedMessage id="global.view" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'cardbin.issueriin' }),
      dataIndex: 'issuerIin',
    },
    {
      title: intl.formatMessage({ id: 'cardbin.issuername' }),
      dataIndex: 'issuerName',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'cardbin.cardlevel' }),
      dataIndex: 'cardLevel',
    },
    {
      title: intl.formatMessage({ id: 'cardbin.issuingregion' }),
      dataIndex: 'issuingRegion',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cardbin.pctbusinesstype' }),
      dataIndex: 'pctBusinessType',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'cardbin.binlength' }),
      dataIndex: 'binLength',
    },
    {
      title: intl.formatMessage({ id: 'cardbin.bin' }),
      dataIndex: 'bin',
    },
    {
      title: intl.formatMessage({ id: 'cardbin.cardtype' }),
      dataIndex: 'cardType',
      hideInSearch: true,
    },
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'cardProduct',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'pctBusinessType',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'billingCurrency1',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'billingCurrency2',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'billingCurrency3',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'reserved',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'panLength',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'singleDualMessage',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'transationTypeSupported',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'transationChannelSupported',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      dataIndex: 'networkOpened',
      hideInSearch: true,
      hideInTable: true,
    },
  ];

  // columns = columns.map((colValue)=>{
  //   return {...colValue,...columnAddation};
  // })

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={async (params = {}, sort = {}) => {
          try {
            const result = await queryAll({
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
        rowKey="id"
        columns={columns}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <ViewForm
          intl={intl}
          values={stepFormValues}
          onCancel={() => handleViewModalVisible(false)}
          modalVisible={viewModalVisible}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
