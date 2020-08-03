import React, { useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { IntlShape } from 'umi';
import { TableListItem } from '../data';
import formLayout from '../../../../formLayout';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<TableListItem>;
  intl: IntlShape;
}

export interface UpdateFormState {
  formVals: TableListItem;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, intl } = props;
  const [formVals] = useState<TableListItem>({
    id: props.values.id ? props.values.id : '',
    issuerIin: props.values.issuerIin ? props.values.issuerIin : '',
    issuerName: props.values.issuerName ? props.values.issuerName : '',
    cardLevel: props.values.cardLevel ? props.values.cardLevel : '',
    issuingRegion: props.values.issuingRegion ? props.values.issuingRegion : '',
    cardProduct: props.values.cardProduct ? props.values.cardProduct : '',
    pctBusinessType: props.values.pctBusinessType ? props.values.pctBusinessType : '',
    billingCurrency1: props.values.billingCurrency1 ? props.values.billingCurrency1 : 0,
    billingCurrency2: props.values.billingCurrency2 ? props.values.billingCurrency2 : 0,
    billingCurrency3: props.values.billingCurrency3 ? props.values.billingCurrency3 : 0,
    reserved: props.values.reserved ? props.values.reserved : '',
    binLength: props.values.binLength ? props.values.binLength : 0,
    bin: props.values.bin ? props.values.bin : '',
    panLength: props.values.panLength ? props.values.panLength : 0,
    cardType: props.values.cardType ? props.values.cardType : '',
    singleDualMessage: props.values.singleDualMessage ? props.values.singleDualMessage : '',
    transationTypeSupported: props.values.transationTypeSupported
      ? props.values.transationTypeSupported
      : 0,
    transationChannelSupported: props.values.transationChannelSupported
      ? props.values.transationChannelSupported
      : 0,
    networkOpened: props.values.networkOpened ? props.values.networkOpened : 0,
  });

  const [form] = Form.useForm();

  const renderContent = () => {
    return (
      <>
        <Form.Item name="issuerIin" label={intl.formatMessage({ id: 'cardbin.issueriin' })}>
          <Input />
        </Form.Item>
        <Form.Item name="issuerName" label={intl.formatMessage({ id: 'cardbin.issuername' })}>
          <Input />
        </Form.Item>
        <Form.Item name="cardLevel" label={intl.formatMessage({ id: 'cardbin.cardlevel' })}>
          <Input />
        </Form.Item>
        <Form.Item name="issuingRegion" label={intl.formatMessage({ id: 'cardbin.issuingregion' })}>
          <Input />
        </Form.Item>

        <Form.Item
          name="pctBusinessType"
          label={intl.formatMessage({ id: 'cardbin.pctbusinesstype' })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="billingCurrency1"
          label={intl.formatMessage({ id: 'cardbin.billingcurrency1' })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="billingCurrency2"
          label={intl.formatMessage({ id: 'cardbin.billingcurrency2' })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="billingCurrency3"
          label={intl.formatMessage({ id: 'cardbin.billingcurrency3' })}
        >
          <Input />
        </Form.Item>

        <Form.Item name="reserved" label={intl.formatMessage({ id: 'cardbin.reserved' })}>
          <Input />
        </Form.Item>

        <Form.Item name="binLength" label={intl.formatMessage({ id: 'cardbin.binlength' })}>
          <Input />
        </Form.Item>

        <Form.Item name="bin" label={intl.formatMessage({ id: 'cardbin.bin' })}>
          <Input />
        </Form.Item>

        <Form.Item name="panLength" label={intl.formatMessage({ id: 'cardbin.panlength' })}>
          <Input />
        </Form.Item>

        <Form.Item name="cardType" label={intl.formatMessage({ id: 'cardbin.cardtype' })}>
          <Input />
        </Form.Item>

        <Form.Item
          name="singleDualMessage"
          label={intl.formatMessage({ id: 'cardbin.singledualmessage' })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="transationTypeSupported"
          label={intl.formatMessage({ id: 'cardbin.transationtypesupported' })}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="transationChannelSupported"
          label={intl.formatMessage({ id: 'cardbin.transationchannelsupported' })}
        >
          <Input />
        </Form.Item>

        <Form.Item name="networkOpened" label={intl.formatMessage({ id: 'cardbin.networkopened' })}>
          <Input />
        </Form.Item>

        <Button name="clean" onClick={() => onCancel()}>
          {intl.formatMessage({ id: 'global.finish' })}
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={intl.formatMessage({ id: 'cardbin.viewCompoent' })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          issuerIin: formVals.issuerIin,
          issuerName: formVals.issuerName,
          cardLevel: formVals.cardLevel,
          issuingRegion: formVals.issuingRegion,
          cardProduct: formVals.cardProduct,
          pctBusinessType: formVals.pctBusinessType,
          billingCurrency1: formVals.billingCurrency1,
          billingCurrency2: formVals.billingCurrency2,
          billingCurrency3: formVals.billingCurrency3,
          reserved: formVals.reserved,
          binLength: formVals.binLength,
          bin: formVals.bin,
          panLength: formVals.panLength,
          cardType: formVals.cardType,
          singleDualMessage: formVals.singleDualMessage,
          transationTypeSupported: formVals.transationTypeSupported,
          transationChannelSupported: formVals.transationChannelSupported,
          networkOpened: formVals.networkOpened,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
