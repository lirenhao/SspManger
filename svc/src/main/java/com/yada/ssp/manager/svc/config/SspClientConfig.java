package com.yada.ssp.manager.svc.config;

import com.yada.sdk.net.IPackageSplitterFactory;
import com.yada.ssp.manager.svc.net.MockSspClient;
import com.yada.ssp.manager.svc.net.SspClient;
import com.yada.ssp.manager.svc.net.SspPkgSplitterFactory;
import com.yada.ssp.manager.svc.net.TcpSspClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.InetSocketAddress;

@Configuration
public class SspClientConfig {

    @Bean
    public SspClient sspClient(SspClientProperties properties) {
        if (properties.isMock()) {
            return new MockSspClient();
        } else {
            InetSocketAddress hostAddress = new InetSocketAddress(properties.getHostName(), properties.getPort());
            IPackageSplitterFactory pkgSplitterFactory = new SspPkgSplitterFactory(properties.getLenSize(), properties.getVer());
            return new TcpSspClient(hostAddress, pkgSplitterFactory, properties.getTimeOut());
        }
    }
}
