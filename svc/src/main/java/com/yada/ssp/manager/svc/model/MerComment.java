package com.yada.ssp.manager.svc.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "T_WEB_MER_COMMENT")
public class MerComment {

    public static final String TABLE_ALIAS = "MERCHANT COMMENT";
    public static final String ALIAS_MERCHANT_ID= "MERCHANT ID";
    public static final String ALIAS_MERCHANT_NAME = "MERCHANT NAME";
    public static final String ALIAS_STATUS = "COMMENT STATUS";
    public static final String ALIAS_CREATE_TIME = "CREATE TIME";
    public static final String ALIAS_CONTENT = "CONTENT";

    @Id
    private String commentId;

    @Column
    private String merchantId;

    @Column
    private String content;

    @Column
    private String createTime;

    @Column
    private String status;

    //回复
    @OneToMany(mappedBy = "comment")
    private List<MerReply> replies;

    //商户
    @OneToOne(targetEntity = Merchant.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "merchantId", referencedColumnName = "merchantId", insertable=false, updatable=false)
    private Merchant merchant;

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<MerReply> getReplies() {
        return replies;
    }

    public void setReplies(List<MerReply> replies) {
        this.replies = replies;
    }

    public Merchant getMerchant() {
        return merchant;
    }

    public void setMerchant(Merchant merchant) {
        this.merchant = merchant;
    }
}
