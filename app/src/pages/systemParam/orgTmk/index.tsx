import {
  PlusOutlined,
  MailOutlined,
  UnlockOutlined,
  LockOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Button, message, Row, Col, Card } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { useIntl } from 'umi';
import CreateForm from './components/CreateForm';
import { TableListItem } from './data';
import { query, save, remove, getOrg, getScalar, getMerEnum, fetchGetAllMer } from './service';

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const intl = useIntl();
  /**
   * 添加
   * @param fields
   */
  const handleSaveAndUpdate = async (fields: TableListItem) => {
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
  const handleDel = async (fields: TableListItem) => {
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
  const actionRef = useRef<ActionType>();

  const [data, setOrg] = useState({});
  const [scalar, setScalar] = useState({ total: '', enable: '', unable: '', termNum: '' });

  const [merchants, setMerchants] = React.useState({});

  React.useEffect(() => {}, []);
  React.useEffect(() => {
    getOrg().then(setOrg);
    getScalar().then(setScalar);
    fetchGetAllMer().then((mer) => {
      const merEnum = getMerEnum(mer);
      setMerchants(merEnum);
    });
  }, []);

  const OptionArr = {};

  Object.keys(data).forEach((key) => {
    OptionArr[key] = { text: data[key], status: key };
  });

  const columns: ProColumns<TableListItem>[] = [
    {
      title: intl.formatMessage({ id: 'global.operate' }),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleDel(record);
              actionRef.current?.reload();
            }}
          >
            {intl.formatMessage({ id: 'global.delete' })}
          </a>
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.orgId' }),
      dataIndex: 'orgId',
      initialValue: undefined,
      valueEnum: OptionArr,
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.orgId' }),
      dataIndex: ['org', 'name'],
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.pwd1' }),
      dataIndex: 'tmkZmk',
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.pwd2' }),
      dataIndex: 'tmkWeb',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.terminalId' }),
      dataIndex: 'terminalId',
    },
    {
      title: intl.formatMessage({ id: 'orgtmk.merchantId' }),
      dataIndex: 'merchantId',
      hideInTable: true,
      valueEnum: merchants,
    },
  ];

  return (
    <>
      <PageContainer>
        <Row>
          <Col span={6}>
            <Card style={{ backgroundColor: 'blue', color: 'white', fontSize: '18px' }}>
              <MailOutlined /> {intl.formatMessage({ id: 'orgtmk.total' })}:{scalar.total}
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ backgroundColor: 'green', color: 'white', fontSize: '18px' }}>
              <UnlockOutlined /> {intl.formatMessage({ id: 'orgtmk.enable' })}:{scalar.enable}
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ backgroundColor: 'red', color: 'white', fontSize: '18px' }}>
              <LockOutlined /> {intl.formatMessage({ id: 'orgtmk.unable' })}:{scalar.unable}
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ backgroundColor: 'violet', color: 'white', fontSize: '18px' }}>
              <GlobalOutlined /> {intl.formatMessage({ id: 'orgtmk.termNum' })}:{scalar.termNum}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ProTable<TableListItem>
              request={async (params = {}, sort = {}) => {
                try {
                  const result = await query({
                    ...params,
                    size: params.pageSize,
                    page: (params.current as number) - 1,
                    sort: Object.keys(sort).map(
                      (key) => `${key},desc${sort[key]?.replace('end', '')}`,
                    ),
                  });
                  result.content.forEach(
                    (element: { orgIdTmkZmk: string; orgId: string; tmkZmk: string }) => {
                      // eslint-disable-next-line no-param-reassign
                      element.orgIdTmkZmk = element.orgId + element.tmkZmk;
                    },
                  );
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
              rowKey="orgIdTmkZmk"
              toolBarRender={() => [
                <Button type="primary" onClick={() => handleModalVisible(true)}>
                  <PlusOutlined /> {intl.formatMessage({ id: 'global.create' })}
                </Button>,
              ]}
              columns={columns}
            />
            <CreateForm
              onCancel={() => handleModalVisible(false)}
              modalVisible={createModalVisible}
              orgData={data}
              onSubmit={async (value) => {
                const success = await handleSaveAndUpdate(value);
                if (success) {
                  handleModalVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              }}
            />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default TableList;
