import React, { useRef } from 'react';
import { Form, Modal, Input } from 'antd';
import { IntlShape } from 'umi';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem, ViewItem } from '../data';
// import formLayout from '../../../../formLayout';
import { show } from '../service';

interface CreateFormProps {
  intl: IntlShape;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

// export interface FormValueType extends Partial<TableListItem> {
//   mcc?: string;
//   remark?: string;
// }

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, intl } = props;
  // const {riskId} = values;
  const formLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 8 },
    },
  };

  const [form] = Form.useForm();
  form.setFieldsValue(props.values);
  const actionRef = useRef<ActionType>();

  // const handleSubmit = async () => {
  //   const fieldsValue = await form.validateFields();
  //   onSubmit({ ...formVals, ...fieldsValue });
  // };

  const renderContent = () => {
    return (
      <>
        <Form.Item name="riskDate" label={intl.formatMessage({ id: 'riskReport.riskDate' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'riskReport.merchantId' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="riskCode" label={intl.formatMessage({ id: 'riskReport.riskCode' })}>
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  const columns: ProColumns<ViewItem>[] = [
    {
      title: intl.formatMessage({ id: 'riskReport.merchantId' }),
      dataIndex: 'merchantId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'riskReport.terminalId' }),
      dataIndex: 'terminalId',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'riskReport.cardNo' }),
      dataIndex: 'cardNo',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'riskReport.tranCode' }),
      dataIndex: 'tranCode',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'riskReport.tranDate' }),
      dataIndex: 'tranDate',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'riskReport.tranTime' }),
      dataIndex: 'tranTime',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'riskReport.tranAmt' }),
      dataIndex: 'tranAmt',
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Modal
        destroyOnClose
        title={intl.formatMessage({ id: 'riskReport.updateCompoent' })}
        visible={modalVisible}
        onCancel={() => onCancel()}
        onOk={() => onCancel()}
      >
        <Form {...formLayout} form={form}>
          {renderContent()}

          <ProTable<ViewItem>
            request={async (params = {}, sort = {}) => {
              try {
                const result: any[] = await show(props.values.riskId ? props.values.riskId : '', {
                  ...params,
                  size: params.pageSize,
                  page: (params.current as number) - 1,
                  sort: Object.keys(sort).map(
                    (key) => `${key},desc${sort[key].replace('end', '')}`,
                  ),
                });
                return {
                  data: result,
                  page: 0,
                  total: result.length,
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
            rowKey="riskId"
            columns={columns}
          />
        </Form>
      </Modal>
    </>
  );
};

export default CreateForm;
