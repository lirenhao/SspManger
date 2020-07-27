package com.yada.ssp.manager.svc.controller;

import com.yada.security.model.User;
import com.yada.security.service.OrgService;
import com.yada.util.ReportUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Controller
@RequestMapping("report")
public class ReportController extends BaseController {
    private String reportFilePath="/jasper";
    @Autowired
    private OrgService orgService;
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private DataSource dataSource;

    /**
     *
     * 商户查询统计
     * */
    @RequestMapping("/curMerSettleList")
    public String curMerSettleList(HttpServletRequest request) {
        request.setAttribute("reportName", "curMerSettleList");
        request.setAttribute("reportNameC", "curMerSettleList");
        return "/ssp_pages/report/curMerSettleList";
    }


    /**
     * ireport页面转换类
     */
    /**
     * 报表处理页面
     */
    @RequestMapping("/reportToHTML")
    public String reportToHTML(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Connection conn = getConnection();
        try {
            ReportUtil reportUtil = new ReportUtil();
            ServletContext context = RequestContextUtils.getWebApplicationContext(request).getServletContext();
            reportUtil.reportToHTML(conn, response, request, context);
        } catch (Exception e) {

            e.printStackTrace();

        } finally {
            conn.close();

        }
        return null;
    }

    @RequestMapping("/reportToHTMLORIG")
    public String reportToHTMLORIG(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Connection conn = getConnection();
        try {
            ReportUtil reportUtil = new ReportUtil();
            ServletContext context = RequestContextUtils.getWebApplicationContext(request).getServletContext();
            reportUtil.reportToHTMLORIG(conn, response, request, context);
        } catch (Exception e) {

            e.printStackTrace();

        } finally {
            conn.close();

        }
        return null;
    }

    @RequestMapping("/reportToPDF")
    public String reportToPDF(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Connection conn = getConnection();
        try {
            ReportUtil reportUtil = new ReportUtil();
            ServletContext context = RequestContextUtils.getWebApplicationContext(request).getServletContext();
            reportUtil.reportToPDF(conn, response, request, context);
        } catch (Exception e) {

            e.printStackTrace();

        } finally {
            conn.close();

        }
        return null;


    }

    @RequestMapping("/reportToExcel")
    public String reportToExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Connection conn = getConnection();
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("curUser");
        String loginName = user.getLoginName();
        try {
            ReportUtil reportUtil = new ReportUtil();
            ServletContext context = RequestContextUtils.getWebApplicationContext(request).getServletContext();
            reportUtil.reportToExcel(conn, response, request, context,reportFilePath,loginName);
        } catch (Exception e) {

            e.printStackTrace();

        } finally {
            conn.close();

        }
        return null;


    }

    @RequestMapping("/reportToXML")
    public String reportToXML(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Connection conn = getConnection();
        try {
            ReportUtil reportUtil = new ReportUtil();
            ServletContext context = RequestContextUtils.getWebApplicationContext(request).getServletContext();
            reportUtil.reportToXML(conn, response, request, context);
        } catch (Exception e) {

            e.printStackTrace();

        } finally {
            conn.close();

        }
        return null;


    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

}
