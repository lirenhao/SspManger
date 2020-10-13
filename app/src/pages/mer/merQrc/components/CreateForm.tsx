import React, { useState } from 'react';
import { Form, Modal, Select, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useIntl } from 'umi';
import { SelectValue } from 'antd/lib/select';
import { TableListItem, useCaseEnmu, cardAssoEnum } from '../data.d';
import { getCcyType, getTerminal, fetchGetAllMer, getMerEnum } from '../service';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
}

export interface CreateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl();

  const { modalVisible, onCancel, onSubmit } = props;
  const ccyArray: { ccyType: string; ccyName: string }[] = [];
  const [ccyData, setCcy] = useState(ccyArray);
  // const [orgTree, setOrgTree] = useState<DataNode[]>([]);
  const terminalsArray: { terminalId: string }[] = [];
  const [terminals, setTerminals] = useState(terminalsArray);
  const [merchants, setMerchants] = React.useState({});
  const formVals = {
    merchantId: '',
    terminal: '',
    useCase: '',
    ccyCode: '',
    qrValue: '',
    cardAsso: '',
  };

  const [form] = Form.useForm();
  const curFieldValue = form.getFieldsValue();
  form.setFieldsValue({ ...formVals, ...curFieldValue });

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

  React.useEffect(() => {
    getCcyType().then(setCcy);
    fetchGetAllMer().then((mer) => {
      const merEnum = getMerEnum(mer);
      setMerchants(merEnum);
    });
  }, []);

  const renderMerchantOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(merchants).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {merchants[key]}
        </Option>,
      );
    });
    return OptionArr;
  };

  const renderUseCaseOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(useCaseEnmu).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {useCaseEnmu[key]}
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

  const renderTerminalIdOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];

    terminals.forEach((element) => {
      OptionArr.push(
        <Option key={element.terminalId} value={element.terminalId}>
          {element.terminalId}
        </Option>,
      );
    });
    return OptionArr;
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...{ merchant: {}, ccyCode: {} }, ...fieldsValue });
  };

  // const handleMerChange = (
  //   e: React.FocusEvent<HTMLInputElement>,
  //   thisForm: FormInstance,
  //   onChange?: (value: any) => void,
  // ) => {
  //   if (onChange) onChange(e.target.value);
  //   if (e.target.value) {
  //     thisForm.setFieldsValue({
  //       ...thisForm.getFieldsValue(),
  //       terminalId: undefined,
  //     });

  //     getTerminal(e.target.value).then(setTerminals);
  //   }
  // };

  const handleMerChange = (value: SelectValue, thisForm: FormInstance) => {
    if (value) {
      thisForm.setFieldsValue({
        ...thisForm.getFieldsValue(),
        terminalId: undefined,
      });
      getTerminal(value.toString()).then(setTerminals);
    }
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'merQrc.merchantId' })}>
          <Select onChange={(selectValue) => handleMerChange(selectValue, form)}>
            {renderMerchantOption()}
          </Select>
          {/* <Input onBlur={(e) => handleMerChange(e, form, undefined)}/> */}
        </Form.Item>

        <Form.Item name="terminalId" label={intl.formatMessage({ id: 'merQrc.terminalId' })}>
          <Select>{renderTerminalIdOption()}</Select>
        </Form.Item>

        <Form.Item name="useCase" label={intl.formatMessage({ id: 'merQrc.useCase' })}>
          <Select>{renderUseCaseOption()}</Select>
        </Form.Item>

        <Form.Item name="ccyType" label={intl.formatMessage({ id: 'merQrc.ccyType' })}>
          <Select>{renderCcyOption()}</Select>
        </Form.Item>
        <Form.Item name="cardAsso" label={intl.formatMessage({ id: 'merQrc.cardAsso' })}>
          <Select>{renderCardAssoOption()}</Select>
        </Form.Item>
        <Form.Item name="qrValue" label={intl.formatMessage({ id: 'merQrc.qrValue' })}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'merQrc.create' })}
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
