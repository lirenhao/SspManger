import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { queryCcy, saveCcy, removeCcy } from './service';

/**
 * 添加
 * @param fields
 */

const handleSaveAndUpdate = async (fields: TableListItem, intl: IntlShape) => {
  const hide = message.loading(intl.formatMessage({ id: 'global.running' }));

  try {
    await saveCcy({ ...fields });
    hide();
    message.success(intl.formatMessage({ id: 'global.success' }));
    return true;
  } catch (error) {
    hide();
    message.error(intl.formatMessage({ id: 'global.error' }));
    return false;
  }
};

/**
 * 添加
 * @param fields
 */
const handleDel = async (fields: TableListItem, intl: IntlShape) => {
  const hide = message.loading(intl.formatMessage({ id: 'global.running' }));
  try {
    await removeCcy({ ...fields });
    hide();
    message.success(intl.formatMessage({ id: 'global.success' }));
    return true;
  } catch (error) {
    hide();
    message.success(intl.formatMessage({ id: 'global.error' }));
    return false;
  }
};

// const handleGet = async (fields: TableListItem) => {
//   const hide = message.loading('global.running');
//   try {
//     await getCcy({ ...fields });
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDel(record, intl);
              actionRef.current?.reload();
            }}
          >
            <FormattedMessage id="global.delete" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'currency.ccyType' }),
      dataIndex: 'ccyType',
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'currency.ccyTypeNecessary' }),
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'currency.ccyName' }),
      dataIndex: 'ccyName',
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'currency.ccyNameNecessary' }),
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'currency.eName' }),
      dataIndex: 'ccyEname',
    },

    {
      title: intl.formatMessage({ id: 'currency.symbol' }),
      dataIndex: 'ccySymbol',
      hideInSearch: true,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={(params, sorter, filter) => queryCcy({ ...params, sorter, filter })}
        headerTitle=""
        actionRef={actionRef}
        rowKey="ccyType"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="global.create" />
          </Button>,
        ]}
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
        intl={intl}
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
