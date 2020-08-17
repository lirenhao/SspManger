import React /* ,{useState} */ from 'react';
import { Form, Modal, Select, /* TreeSelect, */ Input, DatePicker } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, cardAssoEnum, feeTypeEnum } from '../data.d';
import formLayout from '../../../../formLayout';
import { /* fetchOrgTree, */ fetchGetAllMer } from '../service';

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

  // const [orgTree, setOrgTree] = useState<DataNode[]>([]);
  // React.useEffect(() => {
  //   fetchOrgTree().then(setOrgTree);
  // }, []);

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
    onSubmit({ ...{ merchant: {} }, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        {/* <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'merMdr.merchantId' })} rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'merMdr.merchantIdNecessary' }),
            },
          ]}
        >
          <TreeSelect treeDefaultExpandAll treeData={orgTree} 
        />
        </Form.Item> */}

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
          <Select>{renderFeeTypeOption()}</Select>
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

        <Form.Item name="tranCnt" label={intl.formatMessage({ id: 'merMdr.tranCnt' })}>
          <Input />
        </Form.Item>

        <Form.Item name="tranAmt" label={intl.formatMessage({ id: 'merMdr.tranAmt' })}>
          <Input />
        </Form.Item>
        <Form.Item
          name="fee"
          label={intl.formatMessage({ id: 'merMdr.feeCreate' })}
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
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
