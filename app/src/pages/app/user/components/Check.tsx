import React from 'react';
import { Form, Modal, Select, Input, Checkbox } from 'antd';
import { useIntl } from 'umi';
import { TableListItem, MerchantData, TerminalsData, AppRoleData, CcyTypeData } from '../data';
import { fetchAllMer, fetchTermByMerNo, fetchAppRoles, fetchCcyTypes, fetchExistId } from '../service';

interface FormProps {
  title: string;
  info: Partial<TableListItem>;
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
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

const FormView: React.FC<FormProps> = (props) => {
  const { title, info, modalVisible, onCancel, onSubmit } = props;

  const intl = useIntl();
  const [form] = Form.useForm();

  const [merchants, setMerchants] = React.useState<MerchantData[]>([]);
  const [terminals, setTerminals] = React.useState<TerminalsData[]>([]);
  const [appRoles, setAppRoles] = React.useState<AppRoleData[]>([]);
  const [ccyTypes, setCcyTypes] = React.useState<CcyTypeData[]>([]);

  React.useEffect(() => {
    form.resetFields();
    if (info.merNo) {
      fetchTermByMerNo(info.merNo).then(setTerminals);
    } else {
      fetchAllMer().then(setMerchants);
    }
    fetchAppRoles().then(setAppRoles);
    fetchCcyTypes().then(setCcyTypes);
  }, [info]);

  const handleMerChange = async (merNo: string) => {
    await fetchTermByMerNo(merNo).then(setTerminals);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      termNo: undefined,
    });
  }

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => form.submit()}
      okText={intl.formatMessage({ id: 'global.submit' })}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={info}
        onFinish={values => onSubmit({ ...info, ...values, roles: values.roles.join(',') } as TableListItem)}
      >
        {info.merNo ? (
          <Form.Item label={intl.formatMessage({ id: 'appUser.merNo' })}>
            {info.merNo}
          </Form.Item>
        ) : (
            <Form.Item
              name="merNo"
              label={intl.formatMessage({ id: 'appUser.merNo' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'appUser.merNo.required' }),
                },
              ]}
            >
              <Select allowClear showSearch onChange={(value: string) => handleMerChange(value)} >
                {
                  merchants.map(item => (<Select.Option value={item.merchantId}>{`${item.merchantId}-${item.merNameEng}`}</Select.Option>))
                }
              </Select>
            </Form.Item>
          )}
        <Form.Item
          name="termNo"
          label={intl.formatMessage({ id: 'appUser.termNo' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appUser.termNo.required' }),
            },
          ]}
        >
          <Select>
            {
              terminals.map(item => (<Select.Option value={item.terminalId}>{item.terminalId}</Select.Option>))
            }
          </Select>
        </Form.Item>
        {info.loginName ? (
          <Form.Item label={intl.formatMessage({ id: 'appUser.loginName' })}>
            {info.loginName}
          </Form.Item>
        ) : (
            <Form.Item
              name="loginName"
              label={intl.formatMessage({ id: 'appUser.loginName' })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'appUser.loginName.required' }),
                },
                {
                  validator: (_, loginName) => {
                    const merNo = form.getFieldValue('merNo');
                    if (!merNo || merNo === '')
                      return Promise.reject(intl.formatMessage({ id: 'appUser.merNo.required' }));
                    return loginName === ''
                      ? Promise.resolve()
                      : fetchExistId(merNo, loginName).then((result: boolean) =>
                        result
                          ? Promise.reject(intl.formatMessage({ id: 'global.createExists' }))
                          : Promise.resolve(),
                      )
                  }
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        <Form.Item
          name="userName"
          label={intl.formatMessage({ id: 'appUser.userName' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appUser.userName.required' }),
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ccyType"
          label={intl.formatMessage({ id: 'appUser.ccyType' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appUser.ccyType.required' }),
            }
          ]}
        >
          <Select>
            {
              ccyTypes.map(item => (<Select.Option value={item.ccyType}>{item.ccyName}</Select.Option>))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="roles"
          label={intl.formatMessage({ id: 'appUser.roles' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'appUser.roles.required' }),
            }
          ]}
        >
          <Checkbox.Group options={appRoles.map(item => ({ label: item.id, value: item.id }))} />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default FormView;
