import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';
import { fetchGetAllMer } from '../service';

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

  const [form] = Form.useForm();
  const curFieldValue = form.getFieldsValue();
  form.setFieldsValue({ ...{}, ...curFieldValue });

  const [merchants, setMerchants] = React.useState<
    { merchantId: ''; merNameChn: ''; merNameEng: '' }[]
  >([]);

  React.useEffect(() => {
    fetchGetAllMer().then(setMerchants);
  }, []);

  const renderMerChantOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];

    merchants.forEach((element) => {
      OptionArr.push(
        <Option key={element.merchantId} value={element.merchantId}>
          {element.merNameChn}
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

  // const renderTerminalIdOption = () => {
  //   const { Option } = Select;
  //   const OptionArr: JSX.Element[] = [];

  //   terminals.forEach((element)=>{
  //     OptionArr.push(
  //       <Option key={element.terminalId} value={element.terminalId}>
  //         {element.terminalId}
  //       </Option>,
  //     );
  //   })
  //   return OptionArr;
  // };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    onSubmit({ ...{ merchant: {} }, ...fieldsValue });
  };

  // const handleMerChange = (value: string, thisForm: FormInstance, onChange?: (value: any) => void) => {
  //   if (onChange) onChange(value);
  //   if (value) {
  //     thisForm.setFieldsValue({
  //       ...thisForm.getFieldsValue(),
  //       terminalId: undefined,
  //     });

  //     console.error(thisForm.getFieldsValue())
  //     getTerminal(value).then(setTerminals);
  //   }
  // }

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'ccpay.merchantId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'ccpay.merchantIdNecessary' }),
            },
          ]}
        >
          <Select>{renderMerChantOption()}</Select>
        </Form.Item>
        <Form.Item
          name="ccpayMerName"
          label={intl.formatMessage({ id: 'ccpay.ccpayMerName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'ccpay.ccpayMerNameNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ccpayMerPass"
          label={intl.formatMessage({ id: 'ccpay.ccpayMerPass' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'ccpay.ccpayMerPassNecessary' }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fee"
          label={intl.formatMessage({ id: 'ccpay.feeCreate' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'ccpay.feeCreateNecessary' }),
            },
            {
              validator: (_, value) => {
                if (!isNumber(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'ccpay.feeCreateFormat' }));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'ccpay.create' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => handleSubmit()}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
