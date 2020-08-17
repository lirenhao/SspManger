import React from 'react';
import { Form, Modal, Input } from 'antd';
import { useIntl } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: TableListItem) => void;
  values: Partial<TableListItem>;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const ViewForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { modalVisible, onCancel } = props;
  const formVals = props.values;
  // const formVals = {
  //   lsId: props.values.lsId,
  //   merchantId:props.values.merchantId,
  //   feeType: feeTypeEnum[props.values.feeType?props.values.feeType:''],
  //   tranCnt:props.values.tranCnt,
  //   tranAmt:props.values.tranAmt,
  //   fee:props.values.fee,
  //   feeMinAmt:props.values.feeMinAmt,
  //   startDate: props.values.startDate,
  //   closeDate: props.values.closeDate,
  //   cardOrgNum:cardAssoEnum[props.values.cardOrgNum?props.values.cardOrgNum:''],
  //   checkState:checkStateEnum[props.values.checkState?props.values.checkState:''],
  //   operation:operEnmu[props.values.operation?props.values.operation:''],
  //   merchant:{
  //     merchantId : props.values.merchant?.merchantId,
  //     merNameChn:props.values.merchant?.merNameChn,
  //     merNameEng:props.values.merchant?.merNameEng,
  //     merchantType:props.values.merchant?.merchantType,
  //   }
  // }

  const [form] = Form.useForm();

  form.setFieldsValue(formVals);

  const renderContent = () => {
    return (
      <>
        <Form.Item name="terminalId" label={intl.formatMessage({ id: 'terminal.terminalId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="merchantId" label={intl.formatMessage({ id: 'terminal.merchantId' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="terminalType" label={intl.formatMessage({ id: 'terminal.terminalType' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="status" label={intl.formatMessage({ id: 'terminal.status' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="attribute" label={intl.formatMessage({ id: 'terminal.attribute' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="tranCtl" label={intl.formatMessage({ id: 'terminal.tranCtl' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="signFlag" label={intl.formatMessage({ id: 'terminal.signFlag' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="batchNo" label={intl.formatMessage({ id: 'terminal.batchNo' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="terminalParam"
          label={intl.formatMessage({ id: 'terminal.terminalParam' })}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item name="tmkZmk" label={intl.formatMessage({ id: 'terminal.tmkZmk' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="terminalBrand"
          label={intl.formatMessage({ id: 'terminal.terminalBrand' })}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="terminalModel"
          label={intl.formatMessage({ id: 'terminal.terminalModel' })}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="lineCondition"
          label={intl.formatMessage({ id: 'terminal.lineCondition' })}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="installAddress"
          label={intl.formatMessage({ id: 'terminal.installAddress' })}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name="installDate" label={intl.formatMessage({ id: 'terminal.installDate' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="person" label={intl.formatMessage({ id: 'terminal.person' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="telephone" label={intl.formatMessage({ id: 'terminal.telephone' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="counterName" label={intl.formatMessage({ id: 'terminal.counterName' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="counterPhone" label={intl.formatMessage({ id: 'terminal.counterPhone' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="terminalDesc" label={intl.formatMessage({ id: 'terminal.terminalDesc' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="areaCode" label={intl.formatMessage({ id: 'terminal.areaCode' })}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="timeZone" label={intl.formatMessage({ id: 'terminal.timeZone' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="timeZone" label={intl.formatMessage({ id: 'terminal.timeZone' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="hisInstallAddress"
          label={intl.formatMessage({ id: 'terminal.hisInstallAddress' })}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item name="recodeStat" label={intl.formatMessage({ id: 'terminal.recodeStat' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="lastoperFlag" label={intl.formatMessage({ id: 'terminal.lastoperFlag' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="modifyOper" label={intl.formatMessage({ id: 'terminal.modifyOper' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="modifyDate" label={intl.formatMessage({ id: 'terminal.modifyDate' })}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="createDate" label={intl.formatMessage({ id: 'terminal.createDate' })}>
          <Input disabled />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'terminal.updateCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => onCancel()}
    >
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default ViewForm;
