import React from 'react';
import { Form, Modal, Select, Input, DatePicker } from 'antd';
import { useIntl } from 'umi';
import { SelectValue } from 'antd/lib/select';
import { FormInstance } from 'antd/lib/form';
import { TableListItem, cardAssoEnum, feeTypeEnum } from '../data.d';

import { fetchGetAllMer } from '../service';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

export interface CreateFormState {
  formVals: TableListItem;
}

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16 },
  },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();

  const { modalVisible, onCancel, onSubmit } = props;
  const formVals = {
    lsId: '',
    merchantId: '',
    feeType: '',
    tranCnt: '',
    tranAmt: '',
    fee: '',
    feeMinAmt: '',
    startDate: '',
    closeDate: '',
    cardOrgNum: '',
    checkState: '',
    operation: '',
    merchant: {
      merchantId: '',
      merNameChn: '',
      merNameEng: '',
      merchantType: '',
    },
  };

  const [form] = Form.useForm();
  const curFieldValue = form.getFieldsValue();
  form.setFieldsValue({ ...formVals, ...curFieldValue });

  const [tranAmtDisable, setTranAmtDisable] = React.useState<boolean>(false);
  const [tranCntDisable, setTranCntDisable] = React.useState<boolean>(false);

  const [merchants, setMerchants] = React.useState<
    { merchantId: ''; merNameChn: ''; merNameEng: '' }[]
  >([]);

  React.useEffect(() => {
    fetchGetAllMer().then(setMerchants);
  }, []);

  const handleFeeTypeChange = (value: SelectValue, thisForm: FormInstance) => {
    if (value === '1') {
      thisForm.setFieldsValue({ tranAmt: null });
      setTranAmtDisable(true);
      setTranCntDisable(false);
    } else if (value === '2') {
      thisForm.setFieldsValue({ tranCnt: null });
      setTranCntDisable(true);
      setTranAmtDisable(false);
    }
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

  const renderFeeTypeOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(feeTypeEnum).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {feeTypeEnum[key]}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderCardAssoOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(cardAssoEnum).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {cardAssoEnum[key]}
        </Option>,
      );
    });
    return OptionArr;
  };

  const isNumber = (val: string) => {
    const regPos = /^\d+(\.\d+)?$/; /* 非负浮点数 */
    const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; /* 负浮点数 */
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({
      ...fieldsValue,
      ...{
        startDate: form.getFieldValue('startDate').format('YYYYMMDD'),
        checkState: '0',
        merchant: { merchantId: form.getFieldValue('merchantId') },
      },
    });
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'merMdr.merchantId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'merMdr.merchantIdNecessary' }),
            },
          ]}
        >
          <Select>{renderMerChantOption()}</Select>
        </Form.Item>

        <Form.Item
          name="feeType"
          label={intl.formatMessage({ id: 'merMdr.feeType' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'merMdr.feeTypeNecessary' }),
            },
          ]}
        >
          <Select onChange={(selectValue) => handleFeeTypeChange(selectValue, form)}>
            {renderFeeTypeOption()}
          </Select>
        </Form.Item>

        <Form.Item
          name="cardOrgNum"
          label={intl.formatMessage({ id: 'merMdr.cardOrgNum' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'merMdr.cardOrgNumNecessary' }),
            },
          ]}
        >
          <Select>{renderCardAssoOption()}</Select>
        </Form.Item>

        <Form.Item
          name="tranCnt"
          label={intl.formatMessage({ id: 'merMdr.tranCnt' })}
          hidden={tranCntDisable}
        >
          <Input disabled={tranCntDisable} />
        </Form.Item>

        <Form.Item
          name="tranAmt"
          label={intl.formatMessage({ id: 'merMdr.tranAmt' })}
          hidden={tranAmtDisable}
        >
          <Input disabled={tranAmtDisable} />
        </Form.Item>
        <Form.Item
          name="fee"
          label={intl.formatMessage({ id: 'merMdr.feeCreate' })}
          extra={intl.formatMessage({ id: 'merMdr.feeCreateExtra' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'merMdr.feeCreateNecessary' }),
            },
            {
              validator: (_, value) => {
                if (!isNumber(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'merMdr.feeCreateFormat' }));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="feeMinAmt" label={intl.formatMessage({ id: 'merMdr.feeMinAmt' })}>
          <Input />
        </Form.Item>

        <Form.Item name="startDate" label={intl.formatMessage({ id: 'merMdr.startDate' })}>
          <DatePicker format="YYYYMMDD" />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merMdr.create' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form {...formLayout} form={form} preserve={false}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
