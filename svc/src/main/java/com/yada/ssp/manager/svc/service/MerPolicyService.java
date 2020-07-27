package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerPolicyDao;
import com.yada.ssp.manager.svc.model.MerPolicy;
import com.yada.ssp.net.GwHttpClient;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
public class MerPolicyService {

    @Value("${gw-client.user.url}")
    private String userUrl;

    private final MerPolicyDao merPolicyDao;
    private final GwHttpClient gwHttpClient;

    @Autowired
    public MerPolicyService(MerPolicyDao merPolicyDao, GwHttpClient gwHttpClient) {
        this.merPolicyDao = merPolicyDao;
        this.gwHttpClient = gwHttpClient;
    }

    public List<MerPolicy> findAll() {
        return merPolicyDao.findAll();
    }

    public MerPolicy findOne(String commentId) {
        return merPolicyDao.getOne(commentId);
    }

    @Transactional
    public void saveAndUpdate(MerPolicy merPolicy) {
        merPolicy.setStatus("0");
        merPolicy.setUpdateTime(DateUtil.getCurDateTime());
        if (!exists(merPolicy.getId())) {
            merPolicy.setCreateTime(DateUtil.getCurDateTime());
        }
        merPolicyDao.saveAndFlush(merPolicy);
    }

    public boolean exists(String id) {
        return merPolicyDao.existsById(id);
    }

    public String issue(String id) {
        if ("login".equals(id)) {
            try {
                gwHttpClient.putJson(String.format("%s/%s", userUrl, "policy"), "");
                return String.format("[%s] Policy Issue Success !", id);
            } catch (IOException e) {
                e.printStackTrace();
                return String.format("[%s] Policy Issue Failed !", id);
            }
        } else {
            return String.format("[%s] Policy Issue Failed !", id);
        }
    }
}
