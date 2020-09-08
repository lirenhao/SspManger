import React, { useState } from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, StatusEnum } from '../data.d';
import formLayout from '../../../../formLayout';

import { fetchGetAllMer } from '../service';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit } = props;
  const [formVals] = useState<TableListItem>({
    merchantId: '',
    maxTrxAmount: '',
    maxTrxCount: '',
    status: '0',
  });

  const [form] = Form.useForm();

  const [merchants, setMerchants] = React.useState<
  { merchantId: ''; merNameChn: ''; merNameEng: '' }[]
>([]);

React.useEffect(() => {
  fetchGetAllMer().then(setMerchants);
}, []);

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...formVals, ...fieldsValue });
  };

  const renderMerChantOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];

    merchants.forEach((element) => {
      OptionArr.push(
        <Option key={element.merchantId} value={element.merchantId}>
          {element.merchantId}-{element.merNameEng}
        </Option>,
      );
    });

    return OptionArr;
  };

  const renderStatusOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(StatusEnum).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {' '}
          {StatusEnum[key]}{' '}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'merLimit.merchantId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'global.required' }),
            },
          ]}
        >
        <Select>{renderMerChantOption()}</Select>
        </Form.Item>
        <Form.Item
          name="maxTrxCount"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'global.required' }),
            },
          ]}
          label={intl.formatMessage({ id: 'merLimit.maxTrxCount' })}
        >
          <Input />
        </Form.Item>
        <Form.Item name="maxTrxAmount" 
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'global.required' }),
                    },
                  ]}
          label={intl.formatMessage({ id: 'merLimit.maxTrxAmount' })}>
          <Input />
        </Form.Item>
        <Form.Item name="status" 
                          rules={[
                            {
                              required: true,
                              message: intl.formatMessage({ id: 'global.required' }),
                            },
                          ]}
        label={intl.formatMessage({ id: 'merLimit.status' })}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={intl.formatMessage({ id: 'merLimit.status' })}
          >
            {renderStatusOption()}
          </Select>
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merLimit.createCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
