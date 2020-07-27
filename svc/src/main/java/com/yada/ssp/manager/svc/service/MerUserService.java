package com.yada.ssp.manager.svc.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yada.ssp.manager.svc.dao.MerUserDao;
import com.yada.ssp.manager.svc.dao.MerchantDao;
import com.yada.ssp.manager.svc.model.MerUser;
import com.yada.ssp.manager.svc.model.MerUserPK;
import com.yada.ssp.manager.svc.model.Merchant;
import com.yada.ssp.net.GwHttpClient;
import com.yada.ssp.manager.svc.query.MerUserQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MerUserService {

    @Value("${gw-client.user.url}")
    private String userUrl;
    @Value("#{'${gw-client.user.roles:}'.split(',')}")
    private List<String> roles;

    private final MerUserDao merUserDao;
    private final MerchantDao merchantDao;
    private final GwHttpClient gwHttpClient;

    @Autowired
    public MerUserService(MerUserDao merUserDao, MerchantDao merchantDao, GwHttpClient gwHttpClient) {
        this.merUserDao = merUserDao;
        this.merchantDao = merchantDao;
        this.gwHttpClient = gwHttpClient;
    }

    public Page<MerUser> findAll(MerUserQuery query, Pageable pageable) {
        return merUserDao.findAll(query, pageable);
    }

    public List<MerUser> findAll() {
        return merUserDao.findAll();
    }

    public MerUser findOne(String merchantId, String userId) {
        return merUserDao.getOne(new MerUserPK(merchantId, userId));
    }

    public String create(MerUser merUser) {
        try {
            merUser.setUserId("admin");
            Merchant merchant = merchantDao.getOne(merUser.getMerchantId());
            JSONObject user = new JSONObject();
            user.put("id", String.format("%s@%s", merUser.getMerchantId(), merUser.getUserId()));
            user.put("orgId", merchant.getOrg().getOrgId());
            user.put("emailAddress", merUser.getEmailAddress());
            user.put("status", "01");
            JSONArray jsonRoles = new JSONArray();
            jsonRoles.addAll(roles);
            user.put("roles", jsonRoles);
            gwHttpClient.postJson(userUrl, user.toJSONString());
            merUserDao.saveAndFlush(merUser);
            return String.format("[%s] User Create Success !", merUser.getMerchantId());
        } catch (IOException e) {
            e.printStackTrace();
            return String.format("[%s] User Create Failed !", merUser.getMerchantId());
        }
    }

    public String update(MerUser merUser) {
        try {
            JSONObject user = new JSONObject();
            user.put("emailAddress", merUser.getEmailAddress());
            gwHttpClient.putJson(
                    String.format("%s/%s", userUrl, String.format("%s@%s", merUser.getMerchantId(), merUser.getUserId())),
                    user.toJSONString()
            );
            merUserDao.saveAndFlush(merUser);
            return String.format("[%s] User Update Success !", merUser.getMerchantId());
        } catch (IOException e) {
            e.printStackTrace();
            return String.format("[%s] User Update Failed !", merUser.getMerchantId());
        }
    }

    public String delete(String merchantId, String userId) {
        try {
            gwHttpClient.delJson(String.format("%s/%s", userUrl, String.format("%s@%s", merchantId, userId)));
            merUserDao.deleteById(new MerUserPK(merchantId, userId));
            return String.format("[%s] User Delete Success !", merchantId);
        } catch (IOException e) {
            e.printStackTrace();
            return String.format("[%s] User Delete Failed !", merchantId);
        }
    }

    public String resetPwd(String merchantId, String userId) {
        try {
            gwHttpClient.putJson(String.format("%s/%s/reset", userUrl, String.format("%s@%s", merchantId, userId)), "");
            MerUser merUser = merUserDao.getOne(new MerUserPK(merchantId, userId));
            merUserDao.saveAndFlush(merUser);
            return String.format("[%s] Reset PassWord Success !", merchantId);
        } catch (IOException e) {
            e.printStackTrace();
            return String.format("[%s] Reset PassWord Failed !", merchantId);
        }
    }
}
