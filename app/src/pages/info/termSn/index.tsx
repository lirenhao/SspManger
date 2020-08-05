import React, { useState, useRef } from 'react';
import { Select, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import { TableListItem, ApiOrgData, MerchantData, TerminalData } from './data';
import { fetchQuery, fetchDel, fetchApiOrg, fetchMer, fetchTerm } from './service';

const { confirm } = Modal;

const TableList: React.FC<{}> = () => {

  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const [apiOrgs, setApiOrgs] = useState<ApiOrgData[]>([]);
  const [merchants, setMerchants] = useState<MerchantData[]>([]);
  const [terminals, setTerminals] = useState<TerminalData[]>([]);

  React.useEffect(() => {
    fetchApiOrg().then(setApiOrgs);
    fetchMer().then(setMerchants);
  }, []);

  const handleDelete = async (vendorId: string, snNo: string) => {
    confirm({
      title: intl.formatMessage({ id: 'termSn.delete' }, { vendorId, snNo }),
      okType: 'danger',
      onOk: async () => {
        try {
          await fetchDel(vendorId, snNo);
          actionRef.current?.reload();
        } catch (err) {

        }
      }
    });
  }

  const handleMerChange = (value: string, form: FormInstance, onChange?: (value: any) => void) => {
    if (onChange) onChange(value);
    if (value) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        terminalId: undefined,
      });
      fetchTerm(value).then(setTerminals);
    }
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      render: (_, record) => (
        <a onClick={() => handleDelete(record.vendorId, record.snNo)}>
          {intl.formatMessage({ id: 'global.delete' })}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'termSn.vendorId' }),
      dataIndex: 'vendorId',
      renderFormItem: (item, { onChange, ...rest }) => (
        <Select allowClear {...item.formItemProps} {...rest} onChange={onChange}>
          {apiOrgs.map(item => (
            <Select.Option key={item.orgId} value={item.orgId}>
              {item.orgId}-{item.orgName}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: intl.formatMessage({ id: 'termSn.merchantId' }),
      dataIndex: 'merchantId',
      renderFormItem: (item, { onChange, ...rest }, form) => (
        <Select allowClear showSearch {...item.formItemProps} {...rest}
          onChange={value => handleMerChange(value, form, onChange)}
        >
          {merchants.map(item => (
            <Select.Option key={item.merchantId} value={item.merchantId}>
              {item.merchantId}-{item.merNameEng}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: intl.formatMessage({ id: 'termSn.terminalId' }),
      dataIndex: 'terminalId',
      renderFormItem: (item, { onChange, ...rest }) => (
        <Select allowClear {...item.formItemProps} {...rest} onChange={onChange}>
          {terminals.map(item => (
            <Select.Option key={item.terminalId} value={item.terminalId}>
              {item.terminalId}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: intl.formatMessage({ id: 'termSn.snNo' }),
      dataIndex: 'snNo',
    },
    {
      title: intl.formatMessage({ id: 'termSn.location' }),
      dataIndex: 'location',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="snNo"
        options={{ density: false, fullScreen: true, reload: true, setting: false }}
        request={async (params = {}, sort = {}) => {
          try {
            const result = await fetchQuery({
              ...params,
              size: params.pageSize,
              page: params.current as number - 1,
              sort: Object.keys(sort).map(key => `${key},desc${sort[key].replace('end', '')}`),
            });
            return {
              data: result.content,
              page: result.totalPages,
              total: result.totalElements,
              success: true,
            }
          } catch (err) {
            return {
              data: [],
              success: false,
            }
          }
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
