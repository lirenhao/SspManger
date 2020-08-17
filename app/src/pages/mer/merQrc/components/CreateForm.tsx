import React, { useState } from 'react';
import { Form, Modal, Select, TreeSelect, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DataNode } from 'antd/lib/tree';
import { useIntl } from 'umi';
import { TableListItem, useCaseEnmu, cardAssoEnum } from '../data.d';
import formLayout from '../../../../formLayout';
import { getCcyType, fetchOrgTree, getTerminal } from '../service';

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
  const [orgTree, setOrgTree] = useState<DataNode[]>([]);
  const terminalsArray: { terminalId: string }[] = [];
  const [terminals, setTerminals] = useState(terminalsArray);
  const formVals = {
    merchantId: '',
    terminal: '',
    useCase: '',
    ccyCode: {
      ccyName: '',
    },
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
  }, []);

  React.useEffect(() => {
    fetchOrgTree().then(setOrgTree);
  }, []);
  // React.useEffect(() => {
  //   console.error('orgSelect',orgSelect)
  //   if(orgSelect!=null&&orgSelect!==''){
  //     getTerminal(orgSelect).then(setTerminals);
  //   }
  // }, []);

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

    console.error('terminals', form.getFieldValue('merchantId'));
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

  // const treeOnChange = (merchantId:string)=>{
  //   console.error(form.getFieldValue('merchantId'))
  // }

  const handleMerChange = (
    value: string,
    thisForm: FormInstance,
    onChange?: (value: any) => void,
  ) => {
    if (onChange) onChange(value);
    if (value) {
      thisForm.setFieldsValue({
        ...thisForm.getFieldsValue(),
        terminalId: undefined,
      });

      console.error(thisForm.getFieldsValue());
      getTerminal(value).then(setTerminals);
    }
  };

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'merQrc.merchantId' })}
          // rules={[
          //   {
          //     validator: (_, value:any) =>{
          //       if(value === ''){
          //         Promise.resolve()
          //       }else{
          //         setOrgSelect(value)
          //         Promise.resolve()
          //       }
          //   },}
          // ]}
        >
          <TreeSelect
            treeDefaultExpandAll
            treeData={orgTree}
            onChange={(value: string) => handleMerChange(value, form, undefined)}
          />
        </Form.Item>

        <Form.Item name="terminalId" label={intl.formatMessage({ id: 'merQrc.terminalId' })}>
          <Select>{renderTerminalIdOption()}</Select>
        </Form.Item>

        <Form.Item name="useCase" label={intl.formatMessage({ id: 'merQrc.useCase' })}>
          <Select>{renderUseCaseOption()}</Select>
        </Form.Item>

        <Form.Item
          name={['ccyCode', 'ccyType']}
          label={intl.formatMessage({ id: 'merQrc.ccyType' })}
        >
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
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          merchantId: '',
          terminalId: '',
          useCase: '',
          qrValue: '',
          cardAsso: '',
          ccyCode: {
            ccyName: '',
          },
          checkState: '',
          checkReason: '',
          operation: '',
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
