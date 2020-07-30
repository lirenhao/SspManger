import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl, FormattedMessage, IntlShape } from 'umi';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { queryAll, save, remove } from './service';

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

/**
 * 添加
 * @param fields
 */
const handleDel = async (fields: TableListItem, intl: IntlShape) => {
  const hide = message.loading(intl.formatMessage({ id: 'global.running' }));
  try {
    await remove({ ...fields });
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
            <FormattedMessage id="currency.updateCompoent" />
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDel(record, intl);
              actionRef.current?.reload();
            }}
          >
            <FormattedMessage id="currency.delete" />
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'country.internationalCode' }),
      dataIndex: 'internationalCode',
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'country.internationalCodeNecessary' }),
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'country.cName' }),
      dataIndex: 'codeName',
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'country.cNameNecessary' }),
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'currency.eName' }),
      dataIndex: 'codeEname',
      rules: [
        {
          required: true,
          message: intl.formatMessage({ id: 'country.eNameNecessary' }),
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        request={(params, sorter, filter) => queryAll({ ...params, sorter, filter })}
        headerTitle=""
        actionRef={actionRef}
        rowKey="internationalCode"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="global.create" />
          </Button>,
        ]}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleSaveAndUpdate(value, intl);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="internationalCode"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          intl={intl}
          values={stepFormValues}
          onCancel={() => handleUpdateModalVisible(false)}
          modalVisible={updateModalVisible}
          onSubmit={async (value) => {
            const success = await handleSaveAndUpdate(value, intl);
            if (success) {
              handleModalVisible(false);
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