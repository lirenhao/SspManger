import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Select, Upload, Button } from 'antd';

import { UploadFile } from 'antd/lib/upload/interface';
import { getOrg } from './service';
import formLayout from '../../../formLayout';

/**
 * 添加
 * @param fields
 */

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const [orgData, setOrg] = useState({});
  const [form] = Form.useForm();
  const [uploadDisable, setUploadDisable] = useState(true);

  const uploadFileList: UploadFile[] = [];

  const initialFileListState = {
    fileList: uploadFileList,
  };

  const [fileListState, setFileListState] = useState(initialFileListState);

  const uploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    action: '/svc/ssp/pospOrgTmk/upload',
    disabled: uploadDisable,
    data: { orgId: form.getFieldValue('orgId') },
    onChange(info: any) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setFileListState({ fileList });
    },
  };

  React.useEffect(() => {
    getOrg().then(setOrg);
  }, []);

  const renderOrgOption = () => {
    const { Option } = Select;
    const OptionArr: JSX.Element[] = [];
    Object.keys(orgData).forEach((key) => {
      OptionArr.push(
        <Option key={key} value={key}>
          {' '}
          {orgData[key]}{' '}
        </Option>,
      );
    });
    return OptionArr;
  };

  function handleChange(value: any) {
    if (value == null) {
      setUploadDisable(true);
    } else {
      setUploadDisable(false);
    }
  }

  const renderContent = () => {
    return (
      <>
        <Form.Item
          name="orgId"
          label={intl.formatMessage({ id: 'orgtmk.orgId' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'orgtmk.orgIdNecessary' }),
            },
          ]}
        >
          <Select
            showSearch
            onChange={handleChange}
            style={{ width: 200 }}
            placeholder={intl.formatMessage({ id: 'orgtmk.orgIdNecessary' })}
            optionFilterProp="children"
            filterOption={(input, option) => {
              if (option == null) {
                return false;
              }
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
          >
            {renderOrgOption()}
          </Select>
        </Form.Item>
        <Form.Item label={intl.formatMessage({ id: 'uploadTmk.waitForAdd' })}>
          <Upload {...uploadProps} fileList={fileListState.fileList}>
            <Button>
              <UploadOutlined /> {intl.formatMessage({ id: 'uploadTmk.waitForAdd' })}
            </Button>
          </Upload>
        </Form.Item>
      </>
    );
  };

  return (
    <PageContainer>
      <Form {...formLayout} form={form}>
        {renderContent()}
      </Form>
    </PageContainer>
  );
};

export default TableList;
