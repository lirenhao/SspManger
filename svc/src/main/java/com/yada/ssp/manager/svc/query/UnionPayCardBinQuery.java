package com.yada.ssp.manager.svc.query;

import com.yada.ssp.manager.svc.model.UnionPayCardBin;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by bjy on 2018/7/26.
 * 银联卡binQuery
 */
public class UnionPayCardBinQuery implements Specification<UnionPayCardBin> {

    private String id;
    private String issuerIin;
    private String issuerName;
    private String cardLevel;
    private String issuingRegion;
    private String cardProduct;
    private String pctBusinessType;
    private Long billingCurrency1;
    private Long billingCurrency2;
    private Long billingCurrency3;
    private String reserved;
    private Long binLength;
    private String bin;
    private Long panLength;
    private String cardType;
    private Long singleDualMessage;
    private Long transationTypeSupported;
    private Long transationChannelSupported;
    private Long networkOpened;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIssuerIin() {
        return issuerIin;
    }

    public void setIssuerIin(String issuerIin) {
        this.issuerIin = issuerIin;
    }

    public String getIssuerName() {
        return issuerName;
    }

    public void setIssuerName(String issuerName) {
        this.issuerName = issuerName;
    }

    public String getCardLevel() {
        return cardLevel;
    }

    public void setCardLevel(String cardLevel) {
        this.cardLevel = cardLevel;
    }

    public String getIssuingRegion() {
        return issuingRegion;
    }

    public void setIssuingRegion(String issuingRegion) {
        this.issuingRegion = issuingRegion;
    }

    public String getCardProduct() {
        return cardProduct;
    }

    public void setCardProduct(String cardProduct) {
        this.cardProduct = cardProduct;
    }

    public String getPctBusinessType() {
        return pctBusinessType;
    }

    public void setPctBusinessType(String pctBusinessType) {
        this.pctBusinessType = pctBusinessType;
    }

    public Long getBillingCurrency1() {
        return billingCurrency1;
    }

    public void setBillingCurrency1(Long billingCurrency1) {
        this.billingCurrency1 = billingCurrency1;
    }

    public Long getBillingCurrency2() {
        return billingCurrency2;
    }

    public void setBillingCurrency2(Long billingCurrency2) {
        this.billingCurrency2 = billingCurrency2;
    }

    public Long getBillingCurrency3() {
        return billingCurrency3;
    }

    public void setBillingCurrency3(Long billingCurrency3) {
        this.billingCurrency3 = billingCurrency3;
    }

    public String getReserved() {
        return reserved;
    }

    public void setReserved(String reserved) {
        this.reserved = reserved;
    }

    public Long getBinLength() {
        return binLength;
    }

    public void setBinLength(Long binLength) {
        this.binLength = binLength;
    }

    public String getBin() {
        return bin;
    }

    public void setBin(String bin) {
        this.bin = bin;
    }

    public Long getPanLength() {
        return panLength;
    }

    public void setPanLength(Long panLength) {
        this.panLength = panLength;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public Long getSingleDualMessage() {
        return singleDualMessage;
    }

    public void setSingleDualMessage(Long singleDualMessage) {
        this.singleDualMessage = singleDualMessage;
    }

    public Long getTransationTypeSupported() {
        return transationTypeSupported;
    }

    public void setTransationTypeSupported(Long transationTypeSupported) {
        this.transationTypeSupported = transationTypeSupported;
    }

    public Long getTransationChannelSupported() {
        return transationChannelSupported;
    }

    public void setTransationChannelSupported(Long transationChannelSupported) {
        this.transationChannelSupported = transationChannelSupported;
    }

    public Long getNetworkOpened() {
        return networkOpened;
    }

    public void setNetworkOpened(Long networkOpened) {
        this.networkOpened = networkOpened;
    }

    @Override
    public Predicate toPredicate(Root<UnionPayCardBin> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> list = new LinkedList<>();

        if (null != id && !"".equals(id)) {
            list.add(cb.equal(root.get("id").as(String.class), id));
        }
        if (null != issuerIin && !"".equals(issuerIin)) {
            list.add(cb.equal(root.get("issuerIin").as(String.class), issuerIin));
        }
        if (null != issuerName && !"".equals(issuerName)) {
            list.add(cb.equal(root.get("issuerName").as(String.class), issuerName));
        }
        if (null != cardLevel && !"".equals(cardLevel)) {
            list.add(cb.equal(root.get("cardLevel").as(String.class), cardLevel));
        }
        if (null != issuingRegion && !"".equals(issuingRegion)) {
            list.add(cb.equal(root.get("issuingRegion").as(String.class), issuingRegion));
        }
        if (null != cardProduct && !"".equals(cardProduct)) {
            list.add(cb.equal(root.get("cardProduct").as(String.class), cardProduct));
        }
        if (null != pctBusinessType && !"".equals(pctBusinessType)) {
            list.add(cb.equal(root.get("pctBusinessType").as(String.class), pctBusinessType));
        }
        if (null != billingCurrency1) {
            list.add(cb.equal(root.get("billingCurrency1").as(Long.class), billingCurrency1));
        }
        if (null != billingCurrency2) {
            list.add(cb.equal(root.get("billingCurrency2").as(Long.class), billingCurrency2));
        }
        if (null != billingCurrency3) {
            list.add(cb.equal(root.get("billingCurrency3").as(Long.class), billingCurrency3));
        }
        if (null != reserved && !"".equals(reserved)) {
            list.add(cb.equal(root.get("reserved").as(String.class), reserved));
        }
        if (null != binLength) {
            list.add(cb.equal(root.get("binLength").as(Long.class), binLength));
        }
        if (null != bin && !"".equals(bin)) {
            list.add(cb.equal(root.get("bin").as(String.class), bin));
        }
        if (null != panLength) {
            list.add(cb.equal(root.get("panLength").as(Long.class), panLength));
        }
        if (null != cardType && !"".equals(cardType)) {
            list.add(cb.equal(root.get("cardType").as(String.class), cardType));
        }
        if (null != singleDualMessage) {
            list.add(cb.equal(root.get("singleDualMessage").as(Long.class), singleDualMessage));
        }
        if (null != transationTypeSupported) {
            list.add(cb.equal(root.get("transationTypeSupported").as(Long.class), transationTypeSupported));
        }
        if (null != transationChannelSupported) {
            list.add(cb.equal(root.get("transationChannelSupported").as(Long.class), transationChannelSupported));
        }
        if (null != networkOpened) {
            list.add(cb.equal(root.get("networkOpened").as(Long.class), networkOpened));
        }

        if (list.size() > 0) {
            criteriaQuery.where(list.toArray(new Predicate[list.size()]));
        }

        return criteriaQuery.getRestriction();
    }
}
