package com.yada.ssp.manager.svc.config;

import com.yada.ssp.common.hsm.SoftSspEncryption;
import com.yada.ssp.common.hsm.SspEncryption;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EncryptionConfig {

    @Value("${lmk}")
    private String lmk;

    @Bean
    public SspEncryption sspEncryption() {
        return new SoftSspEncryption(lmk);
    }
}
