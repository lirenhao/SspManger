import React, { useState } from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';
import { getCcyType, getCountryCode } from '../service';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel, onSubmit, values } = props;

  const ccyArray: { ccyType: string; ccyName: string }[] = [];
  const [ccyData, setCcy] = useState(ccyArray);
  const countryArray: { internationalCode: string; codeName: string }[] = [];
  const [countryData, setCountry] = useState(countryArray);

  React.useEffect(() => {
    getCcyType().then(setCcy);
  }, []);
  React.useEffect(() => {
    getCountryCode().then(setCountry);
  }, []);

  const formVals = {
    merchantId: props.values.merchantId,
    ccyType: props.values.ccyType,
    internationalCode: props.values.internationalCode,
    checkState: props.values.checkState,
    checkReason: props.values.checkReason,
    operation: props.values.operation,
    merchant: {
      merchantId: props.values.merchant ? props.values.merchant.merchantId : '',
      merNameChn: props.values.merchant ? props.values.merchant.merNameChn : '',
      merNameEng: props.values.merchant ? props.values.merchant.merNameEng : '',
      merchantType: props.values.merchant ? props.values.merchant.merchantType : '',
    },
  };

  const [form] = Form.useForm();
  form.setFieldsValue(formVals);

  const emptyVal = {};
  form.setFieldsValue({ ...emptyVal, ...values });

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...{ merchant: {} }, ...values, ...fieldsValue });
  };

  const renderCcyOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    ccyData.forEach((element) => {
      OptionArr.push(
        <Option key={element.ccyType} value={element.ccyType}>
          {element.ccyName}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderCountryOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    countryData.forEach((element) => {
      OptionArr.push(
        <Option key={element.internationalCode} value={element.internationalCode}>
          {element.codeName}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merAddon.merchantId' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="ccyType" label={intl.formatMessage({ id: 'merAddon.ccyType' })}>
          <Select>{renderCcyOption()}</Select>
        </Form.Item>
        <Form.Item
          name="internationalCode"
          label={intl.formatMessage({ id: 'merAddon.internationalCode' })}
        >
          <Select>{renderCountryOption()}</Select>
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merAddon.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          merchantId: formVals.merchantId,
          ccyType: formVals.ccyType,
          internationalCode: formVals.internationalCode,
          checkState: formVals.checkState,
          checkReason: formVals.checkReason,
          operation: formVals.operation,
          merchant: {
            merchantId: formVals.merchant.merchantId,
            merNameChn: formVals.merchant.merNameChn,
            merNameEng: formVals.merchant.merNameEng,
            merchantType: formVals.merchant.merchantType,
          },
        }}
        // initialValues={values}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
