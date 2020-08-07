import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import assert from 'assert';
import { Form, Select, Upload, Button, message } from 'antd';
import { TableListItem } from './data';

// import { RcCustomRequestOptions } from 'antd/es/upload/interface';
// import { TableListItem } from './data.d';
import { save, getOrg } from './service';
import formLayout from '../../../formLayout';
import { UploadFile } from 'antd/lib/upload/interface';

/**
 * 添加
 * @param fields
 */

const TableList: React.FC<{}> = () => {
  const intl = useIntl();
  const [orgData, setOrg] = useState({});
  const [form] = Form.useForm();

  const initialState: { file: any; uploading: boolean } = {
    file: undefined,
    uploading: false,
  };

  // const initialFileListState : {fileList:any[]} = {
  //   fileList: [],
  // }

  const uploadFileList: UploadFile[] = [];

  const initialFileListState = {
    fileList: uploadFileList,
  };

  // const initialFileListState = {
  //   fileList: [
  //     {
  //       uid: '-1',
  //       name: intl.formatMessage({ id: 'uploadTmk.waitForAdd' }),
  //       status: 'done',
  //       url: '',
  //       type:'',
  //     },
  //   ],
  // };
  const [fileListState, setFileListState] = useState(initialFileListState);

  const [uploadState, setUploadState] = useState(initialState);

  const handleSave = () => {
    if (uploadState.file == null) {
      message.error(intl.formatMessage({ id: 'global.error' }));
      return;
    }

    form.validateFields().then(() => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(uploadState.file);
      reader.onload = () => {
        // const reader = localFile.target;
        assert.equal(true, reader != null && reader.result instanceof ArrayBuffer);
        if (reader.result instanceof ArrayBuffer) {
          const localFile: Blob = new Blob([reader.result]);
          const result: TableListItem = {
            file: localFile,
            orgId: form.getFieldValue('orgId'),
          };

          const hide = message.loading(intl.formatMessage({ id: 'global.running' }));
          save(result).then(
            () => {
              hide();
              message.success(intl.formatMessage({ id: 'global.success' }));
            },
            () => {
              hide();
              message.error(intl.formatMessage({ id: 'global.error' }));
              return false;
            },
          );
        }
      };
    });
  };

  const uploadProps = {
    name: 'file',
    // customRequest:handleSaveAndUpdate,
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file: any) => {
      uploadState.file = file;
      setUploadState(uploadState);

      return false;
    },
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
        <Upload {...uploadProps} fileList={fileListState.fileList}>
          <Button>
            <UploadOutlined /> Select
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleSave}
          // disabled={uploadState.file == null}
          loading={uploadState.uploading}
          style={{ marginTop: 16 }}
        >
          {uploadState.uploading ? 'Uploading' : 'Start Upload'}
        </Button>
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
