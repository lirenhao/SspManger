/* eslint-disable import/no-named-as-default-member */
import { TreeSelect } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import { DataNode } from 'antd/lib/tree';
import moment from 'moment';

import { TableListItem } from './data.d';
import { query, getCcyType, fetchOrgTree } from './service';

// const OptionArr = {};

// Object.keys(data).forEach((key) => {
//   OptionArr[key] = { text: data[key], status: key };
// });

// const checkStateArr = {};
// const useCaseArr = {};
// const operArr = {};
const ccyArr = {};

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
  const [orgTree, setOrgTree] = useState<DataNode[]>([]);

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
  }, []);
  const ccyArray: { ccyType: string; ccyName: string }[] = [];
  const [ccyData, setCcy] = useState(ccyArray);
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  React.useEffect(() => {
    getCcyType().then(setCcy);
  }, []);

  ccyData.forEach((element) => {
    ccyArr[element.ccyType] = { text: element.ccyName, status: element.ccyType };
  });

  const year = moment().format('YYYY').toString();


  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'hq.orgId', defaultMessage: '' }),
      dataIndex: 'orgId',
      renderFormItem: (item, { onChange, ...rest }) => (
        <TreeSelect
          treeDefaultExpandAll
          treeData={orgTree}
          {...item.formItemProps}
          {...rest}
          onChange={onChange}
        />
      ),
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.month' }),
      dataIndex: 'month',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.month' }),
      dataIndex: 'month',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.year' }),
      dataIndex: 'year',
      initialValue: year,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.merNum' }),
      dataIndex: 'merNum',
      // initialValue: undefined,
      // valueEnum: merchantTypeEnmu,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.merNumMonthPer' }),
      dataIndex: 'merNumMonthPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.merNumYearPer' }),
      dataIndex: 'merNumYearPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.addNum' }),
      dataIndex: 'addNum',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.lossNum' }),
      dataIndex: 'lossNum',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.curTran' }),
      dataIndex: 'curTran',
      hideInSearch: true,
    },

    {
      title: intl.formatMessage({ id: 'hq.curTranMonthPer' }),
      dataIndex: 'curTranMonthPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.curTranYearPer' }),
      dataIndex: 'curTranYearPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.sumTran' }),
      dataIndex: 'sumTran',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.sumTranMonthPer' }),
      dataIndex: 'sumTranMonthPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.sumTranYearPer' }),
      dataIndex: 'sumTranYearPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.posNum' }),
      dataIndex: 'posNum',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.posNumMonthPer' }),
      dataIndex: 'posNumMonthPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.posNumYearPer' }),
      dataIndex: 'posNumYearPer',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'hq.barNum' }),
      dataIndex: 'barNumbarNum',
      hideInSearch: true,
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
        rowKey="month"
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
