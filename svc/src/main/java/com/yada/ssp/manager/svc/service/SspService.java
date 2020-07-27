package com.yada.ssp.manager.svc.service;

import com.yada.ssp.net.SspClient;
import com.yada.ssp.net.SspResult;
import com.yada.ssp.util.TlvPacker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

@Service
public class SspService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final SspClient sspClient;

    @Autowired
    public SspService(SspClient sspClient) {
        this.sspClient = sspClient;
    }

    /**
     * CCPAY静态码获取
     *
     * @param merNo 商户号
     * @return 调用结果, success是成功、failed是失败
     */
    public SspResult getStaticCode(String merNo) {
        Map<String, String> reqMap = new HashMap<>();

        reqMap.put("931", "03");
        reqMap.put("042", merNo);
        String reqStr = TlvPacker.packer(reqMap);
        SspResult result = new SspResult();
        try {
            logger.info("CCPAY静态码获取的请求报文是[{}]", reqStr);
            // 发起静态码获取请求
            ByteBuffer respBuffer = sspClient.send(ByteBuffer.wrap(reqStr.getBytes()));
            String respStr = new String(respBuffer.array());
            logger.info("CCPAY静态码获取的返回报文是[{}]", respStr);

            Map<String, String> respMap = TlvPacker.unPacker(respStr);
            result.setRespMsg(respMap.get("040"));
            if ("00".equals(respMap.get("039"))) {
                result.setRespCode("success");
                result.setQrCode(handleQrCode(respMap.get("066")));
            } else {
                result.setRespCode("failed");
            }
        } catch (IOException e) {
            result.setRespCode("failed");
            result.setRespMsg(e.getMessage());
            logger.warn("CCPAY静态码获取异常,请求报文是[{}],异常信息是[{}]", reqStr, e.getMessage());
        }
        return result;
    }

    /**
     * CCPAY静态码回调地址设置
     *
     * @param merNo 商户号
     * @return 调用结果, success是成功、failed是失败
     */
    public SspResult setCallbackPath(String merNo) {
        Map<String, String> reqMap = new HashMap<>();

        reqMap.put("931", "10");
        reqMap.put("042", merNo);
        String reqStr = TlvPacker.packer(reqMap);
        SspResult result = new SspResult();
        try {
            logger.info("CCPAY静态码回调地址设置的请求报文是[{}]", reqStr);
            // 发起静态码回调地址设置请求
            ByteBuffer respBuffer = sspClient.send(ByteBuffer.wrap(reqStr.getBytes()));
            String respStr = new String(respBuffer.array());
            logger.info("CCPAY静态码回调地址设置的返回报文是[{}]", respStr);

            Map<String, String> respMap = TlvPacker.unPacker(respStr);
            result.setRespCode("00".equals(respMap.get("039")) ? "success" : "failed");
            result.setRespMsg(respMap.get("040"));
        } catch (IOException e) {
            result.setRespCode("failed");
            result.setRespMsg(e.getMessage());
            logger.warn("CCPAY静态码获取异常,请求报文是[{}],异常信息是[{}]", reqStr, e.getMessage());
        }
        return result;
    }

    /**
     * 处理返回的静态码 截取做decoder解码
     *
     * @param qrCode 静态码
     * @return 处理后的值
     */
    String handleQrCode(String qrCode) {
        if (null != qrCode && !"".equals(qrCode)) {
            String[] array = qrCode.split("data=");
            return array.length > 1 ? URLDecoder.decode(array[1]) : qrCode;
        } else {
            return qrCode;
        }
    }
}
