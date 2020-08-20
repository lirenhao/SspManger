import React /* ,{useState} */ from 'react';
import { Form, Modal, Select, /* TreeSelect, */ Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data.d';
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

  const [form] = Form.useForm();
  // const curFieldValue = form.getFieldsValue();
  // form.setFieldsValue(curFieldValue);

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
          label={intl.formatMessage({ id: 'manualSettle.merchantId' })} rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'manualSettle.merchantIdNecessary' }),
            },
          ]}
        >
          <TreeSelect treeDefaultExpandAll treeData={orgTree} 
        />
        </Form.Item> */}

        <Form.Item
          name="merchantId"
          label={intl.formatMessage({ id: 'manualSettle.merchantId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'manualSettle.merchantIdNecessary' }),
            },
          ]}
        >
          <Select>{renderMerChantOption()}</Select>
        </Form.Item>

        <Form.Item
          name="tranAmt"
          label={intl.formatMessage({ id: 'manualSettle.tranAmt' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'manualSettle.tranAmtNecessary' }),
            },
            {
              validator: (_, value) => {
                if (!isNumber(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'manualSettle.tranAmtFormat' }));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fee"
          label={intl.formatMessage({ id: 'manualSettle.feeCreate' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'manualSettle.feeCreateNecessary' }),
            },
            {
              validator: (_, value) => {
                if (!isNumber(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'manualSettle.feeCreateFormat' }));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="settleAmt"
          label={intl.formatMessage({ id: 'manualSettle.settleAmt' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'manualSettle.settleAmtNecessary' }),
            },
            {
              validator: (_, value) => {
                if (!isNumber(value)) {
                  return Promise.reject(intl.formatMessage({ id: 'manualSettle.settleAmtFormat' }));
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
      title={intl.formatMessage({ id: 'manualSettle.create' })}
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
