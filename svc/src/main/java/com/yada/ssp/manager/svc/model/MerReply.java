package com.yada.ssp.manager.svc.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "T_WEB_MER_REPLY")
public class MerReply {

    public static final String TABLE_ALIAS = "MERCHANT REPLY";
    public static final String ALIAS_MERCHANT_ID= "MERCHANT ID";
    public static final String ALIAS_MERCHANT_NAME = "MERCHANT NAME";
    public static final String ALIAS_CONTENT = "CONTENT";
    public static final String ALIAS_CREATE_TIME = "CREATE TIME";

    @Id
    @GenericGenerator(name = "uuidGenerator", strategy = "uuid")
    @GeneratedValue(generator = "uuidGenerator")
    private String replyId;

    @Column
    private String userId;

    @Column
    private String merchantId;

    @Column
    private String content;

    @Column
    private String createTime;

    @ManyToOne
    @JoinColumn(name = "commentId", referencedColumnName = "commentId")
    private MerComment comment;


    public String getReplyId() {
        return replyId;
    }

    public void setReplyId(String replyId) {
        this.replyId = replyId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
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

    public MerComment getComment() {
        return comment;
    }

    public void setComment(MerComment comment) {
        this.comment = comment;
    }
}
