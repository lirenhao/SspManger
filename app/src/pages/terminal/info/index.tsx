/* eslint-disable import/no-named-as-default-member */
import { message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';

import ViewForm from './components/ViewForm';
import { TableListItem } from './data.d';
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

const TableList: React.FC<{}> = () => {
  const [modalViewVisible, handleModalViewVisible] = useState(false);
  const [viewValues, setViewValues] = useState({});
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
              setViewValues(record);
              handleModalViewVisible(true);
            }}
          >
            <FormattedMessage id="global.view" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'terminal.terminalId' }),
      dataIndex: 'terminalId',
    },

    {
      title: intl.formatMessage({ id: 'terminal.merchantId' }),
      dataIndex: 'merchantId',
    },
    {
      title: intl.formatMessage({ id: 'terminal.orgId' }),
      dataIndex: ['org', 'name'],
      // valueEnum: merchantTypeEnmu
    },
    {
      title: intl.formatMessage({ id: 'terminal.terminalType' }),
      dataIndex: 'terminalType',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.status' }),
      dataIndex: 'status',
    },

    {
      dataIndex: 'attribute',
      title: intl.formatMessage({ id: 'terminal.attribute' }),
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.wildcardFlag' }),
      dataIndex: 'wildcardFlag',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.tranCtl' }),
      dataIndex: 'tranCtl',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.signFlag' }),
      dataIndex: 'signFlag',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.batchNo' }),
      dataIndex: 'batchNo',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.terminalParam' }),
      dataIndex: 'terminalParam',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.tmkZmk' }),
      dataIndex: 'tmkZmk',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.terminalBrand' }),
      dataIndex: 'terminalBrand',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.terminalModel' }),
      dataIndex: 'terminalModel',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.batchNo' }),
      dataIndex: 'batchNo',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.lineCondition' }),
      dataIndex: 'lineCondition',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.installAddress' }),
      dataIndex: 'installAddress',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.installDate' }),
      dataIndex: 'installDate',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.person' }),
      dataIndex: 'person',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.telephone' }),
      dataIndex: 'telephone',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.counterName' }),
      dataIndex: 'counterName',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.counterPhone' }),
      dataIndex: 'counterPhone',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.terminalDesc' }),
      dataIndex: 'terminalDesc',
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: intl.formatMessage({ id: 'terminal.areaCode' }),
      dataIndex: 'areaCode',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.timeZone' }),
      dataIndex: 'timeZone',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.hisInstallAddress' }),
      dataIndex: 'hisInstallAddress',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.recodeStat' }),
      dataIndex: 'recodeStat',
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: intl.formatMessage({ id: 'terminal.recodeStat' }),
      dataIndex: 'recodeStat',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.lastoperFlag' }),
      dataIndex: 'lastoperFlag',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.modifyOper' }),
      dataIndex: 'modifyOper',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.modifyDate' }),
      dataIndex: 'modifyDate',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'terminal.createDate' }),
      dataIndex: 'createDate',
      hideInSearch: true,
      hideInTable: true,
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
        rowKey="terminalId"
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined /> <FormattedMessage id="global.create" />
        //   </Button>,
        // ]}
        columns={columns}
      />

      <ViewForm
        values={viewValues}
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
    </PageContainer>
  );
};

export default TableList;
