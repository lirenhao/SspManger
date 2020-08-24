package com.yada.ssp.manager.web.config

import com.yada.ssp.manager.web.security.IPwdDigestService
import com.yada.ssp.manager.web.security.IPwdStrengthService
import com.yada.ssp.manager.web.security.PwdDigestService
import com.yada.ssp.manager.web.security.PwdStrengthService
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties(SecurityConfigProperties::class)
open class SecurityConfig(private val config: SecurityConfigProperties) {

    @Bean
    open fun pwdDigestService(): IPwdDigestService = PwdDigestService(config.defaultPwd)

    @Bean
    open fun pwdStrengthService(): IPwdStrengthService = PwdStrengthService(config.pwdStrength)
}
