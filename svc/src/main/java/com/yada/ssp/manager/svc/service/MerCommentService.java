package com.yada.ssp.manager.svc.service;

import com.yada.ssp.manager.svc.dao.MerCommentDao;
import com.yada.ssp.manager.svc.dao.MerReplyDao;
import com.yada.ssp.manager.svc.dao.MerchantDao;
import com.yada.ssp.manager.svc.model.MerComment;
import com.yada.ssp.manager.svc.model.MerReply;
import com.yada.ssp.manager.svc.query.MerCommentQuery;
import com.yada.ssp.manager.svc.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MerCommentService {

    private final MerCommentDao merCommentDao;
    private final MerReplyDao merReplyDao;
    private final MerchantDao merchantDao;

    @Autowired
    public MerCommentService(MerCommentDao merCommentDao, MerReplyDao merReplyDao, MerchantDao merchantDao) {
        this.merCommentDao = merCommentDao;
        this.merReplyDao = merReplyDao;
        this.merchantDao = merchantDao;
    }

    public Page<MerComment> findAll(MerCommentQuery query, Pageable pageable) {
        return merCommentDao.findAll(query, pageable);
    }

    public MerComment findOne(String commentId) {
        return merCommentDao.getOne(commentId);
    }

    @Transactional
    public void reply(String commentId, String userId, String content) {
        MerComment merComment = merCommentDao.getOne(commentId);
        merComment.setStatus("1");
        merCommentDao.saveAndFlush(merComment);

        MerReply merReply = new MerReply();
        merReply.setComment(merComment);
        merReply.setUserId(userId);
        merReply.setContent(content);
        merReply.setCreateTime(DateUtil.getCurDateTime());
        merReplyDao.saveAndFlush(merReply);
    }
}
