package com.yada.ssp.manager.web.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "yada.security")
class SecurityConfigProperties(
        var defaultPwd: String = "111111",
        var pwdStrength: Int = 1,
        var roles: Map<String, Array<String>>
)