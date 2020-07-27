package com.yada.ssp.manager.svc.net;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.ConnectionKeepAliveStrategy;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class GwHttpClient {

    @Value("${gw-client.token}")
    private String token;

    private HttpClientBuilder clientBuilder;
    private RequestConfig requestConfig;

    @Autowired
    public GwHttpClient() {
        Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
                .register("http", PlainConnectionSocketFactory.getSocketFactory())
                .build();
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
        connectionManager.setMaxTotal(256);
        connectionManager.setDefaultMaxPerRoute(256);

        ConnectionKeepAliveStrategy keepAliveStrategy = new DefaultConnectionKeepAliveStrategy() {
            public long getKeepAliveDuration(HttpResponse response, HttpContext context) {
                long keepAliveDuration = super.getKeepAliveDuration(response, context);
                if (keepAliveDuration == -1) {
                    keepAliveDuration = 10 * 1000; // 45 seconds
                }
                return keepAliveDuration;
            }
        };

        clientBuilder = HttpClients.custom()
                .setConnectionManager(connectionManager)
                .setKeepAliveStrategy(keepAliveStrategy);

        // 设置请求超时时间
        requestConfig = RequestConfig.custom()
                .setSocketTimeout(60000)
                .setConnectTimeout(60000)
                .setConnectionRequestTimeout(60000)
                .build();
    }

    public String getJson(String url) throws IOException {
        CloseableHttpClient client = clientBuilder.build();

        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Authorization", String.format("Basic %s", token));
        httpGet.setConfig(requestConfig);

        HttpResponse httpResponse = client.execute(httpGet);
        if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
            throw new IOException(String.format("%s : %s", url, httpResponse.getStatusLine().getStatusCode()));
        }
        HttpEntity httpEntity = httpResponse.getEntity();
        return EntityUtils.toString(httpEntity);
    }

    public String postJson(String url, String data) throws IOException {
        CloseableHttpClient client = clientBuilder.build();

        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Authorization", String.format("Basic %s", token));
        httpPost.setConfig(requestConfig);

        StringEntity postEntity = new StringEntity(data);
        postEntity.setContentType("application/json");
        httpPost.setEntity(postEntity);

        HttpResponse httpResponse = client.execute(httpPost);
        if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
            throw new IOException(String.format("%s : %s", url, httpResponse.getStatusLine().getStatusCode()));
        }
        HttpEntity httpEntity = httpResponse.getEntity();
        return EntityUtils.toString(httpEntity);
    }

    public String putJson(String url, String data) throws IOException {
        CloseableHttpClient client = clientBuilder.build();

        HttpPut httpPut = new HttpPut(url);
        httpPut.setHeader("Authorization", String.format("Basic %s", token));
        httpPut.setConfig(requestConfig);

        StringEntity putEntity = new StringEntity(data);
        putEntity.setContentType("application/json");
        httpPut.setEntity(putEntity);

        HttpResponse httpResponse = client.execute(httpPut);
        if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
            throw new IOException(String.format("%s : %s", url, httpResponse.getStatusLine().getStatusCode()));
        }
        HttpEntity httpEntity = httpResponse.getEntity();
        return EntityUtils.toString(httpEntity);
    }

    public String delJson(String url) throws IOException {
        CloseableHttpClient client = clientBuilder.build();

        HttpDelete httpDelete = new HttpDelete(url);
        httpDelete.setHeader("Authorization", String.format("Basic %s", token));
        httpDelete.setConfig(requestConfig);

        HttpResponse httpResponse = client.execute(httpDelete);
        if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
            throw new IOException(String.format("%s : %s", url, httpResponse.getStatusLine().getStatusCode()));
        }
        HttpEntity httpEntity = httpResponse.getEntity();
        return EntityUtils.toString(httpEntity);
    }
}
