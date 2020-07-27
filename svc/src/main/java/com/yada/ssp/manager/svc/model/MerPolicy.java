package com.yada.ssp.manager.svc.model;

import javax.persistence.*;

@Entity
@Table(name = "T_WEB_MER_POLICY")
public class MerPolicy {

    public static final String TABLE_ALIAS = "MERCHANT POLICY";
    public static final String ALIAS_ID= "ID";
    public static final String ALIAS_TITLE = "TITLE";
    public static final String ALIAS_CONTENT = "CONTENT";
    public static final String ALIAS_CREATE_TIME = "CREATE TIME";
    public static final String ALIAS_UPDATE_TIME = "UPDATE TIME";
    public static final String ALIAS_STATUS = "STATUS";

    @Id
    private String id;

    @Column
    private String title;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column
    private String content;

    @Column
    private String createTime;

    @Column
    private String updateTime;

    @Column
    private String status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
