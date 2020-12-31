import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.4.1"
    id("io.spring.dependency-management") version "1.0.10.RELEASE"
    kotlin("jvm") version "1.4.21"
    kotlin("plugin.spring") version "1.4.21"
}

group = "com.yada.cloud"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
}

extra["springCloudVersion"] = "2020.0.0"

configurations.all {
    exclude("org.springframework.boot", "spring-boot-starter-logging")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
    implementation("org.springframework.boot:spring-boot-starter-log4j2")
    implementation("org.springframework.cloud:spring-cloud-starter-gateway")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
}

dependencyManagement {
    imports {
        mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

task("copyApp") {
    group = "app"
    description = "copy app build output"
    doLast {
        copy {
            from("../app/dist")
            into("src/main/resources/static")
        }
        copy {
            from("../app/dist")
            into( "../dist/app")
        }
    }
}

task("deleteApp") {
    group = "app"
    description = "delete app build output"
    doLast {
        delete("src/main/resources/static")
    }
}

task("buildApp") {
    group = "app"
    description = "build app"
    doLast {
        exec {
            workingDir("../app")
            commandLine("npm", "install")
        }
        exec {
            workingDir("../app")
            commandLine("npm", "run", "build")
        }
    }
}

task("buildSspSvc") {
    group = "svc"
    description = "build ssp svc"
    doLast {
        exec {
            workingDir("../svc")
            commandLine("mvn", "clean", "package")
        }
    }
}

task("buildWebSvc") {
    group = "svc"
    description = "build web svc"
    doLast {
        exec {
            workingDir("../webSvc")
            commandLine("gradle", "clean", "build")
        }
    }
}

task("buildGw") {
    group = "svc"
    description = "build gw svc"
    tasks["buildApp"].mustRunAfter("deleteApp")
    tasks["copyApp"].mustRunAfter("buildApp")
    tasks["bootJar"].mustRunAfter("clean", "copyApp")
}.dependsOn("clean", "deleteApp", "buildApp", "copyApp", "bootJar")

task("cleanJar") {
    group = "svc"
    description = "clean build output"
    doLast {
        delete("../dist")
    }
}

task("copyJar") {
    group = "svc"
    description = "copy build jar output to dist"
    doLast {
        copy {
            from ("../gw/build/libs/gw-0.0.1-SNAPSHOT.jar", "../gw/src/main/resources")
            into( "../dist/gw")
            include("*.jar", "application*", "log*")
        }
        copy {
            from ("../svc/target/svc-0.0.1-SNAPSHOT.jar", "../svc/src/main/resources")
            into ("../dist/svc")
            include("*.jar", "application*", "log*")
        }
        copy {
            from ("../webSvc/build/libs/web-0.0.1-SNAPSHOT.jar", "../webSvc/src/main/resources")
            into ("../dist/web")
            include("*.jar", "application*", "log*")
        }
    }
}

task("buildAll") {
    group = "build"
    description = "build all output to dist"
    tasks["copyJar"].mustRunAfter("cleanJar", "buildGw", "buildSspSvc", "buildWebSvc")
}.dependsOn("cleanJar", "buildGw", "buildSspSvc", "buildWebSvc", "copyJar")
