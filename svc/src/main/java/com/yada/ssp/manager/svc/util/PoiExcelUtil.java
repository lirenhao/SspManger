package com.yada.ssp.manager.svc.util;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class PoiExcelUtil {

    private final static Logger logger = LoggerFactory.getLogger("com.yada.ssp.manager.svc.util.PoiExcelUtil");
    private final static String xls = "xls";
    private final static String xlsx = "xlsx";

    /**
     * 导出excel到本地
     */
    public static void exportExcelX(Connection conn, String sql, String[] headers, int fieldCount, String filePath, String fileName) throws SQLException {
        OutputStream out = null;
        HSSFWorkbook workbook = null;
        try {
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            out = new FileOutputStream(filePath + fileName);
            workbook = new HSSFWorkbook();
            HSSFCellStyle style = workbook.createCellStyle();
            style.setAlignment(HorizontalAlignment.CENTER);
            // 生成一个(带标题)表格
            HSSFSheet sheet = workbook.createSheet("对账流水");
            HSSFRow row = sheet.createRow(0);
            for (short i = 0; i < headers.length; i++) {
                HSSFCell cell = row.createCell(i);
                HSSFRichTextString text = new HSSFRichTextString(headers[i]);
                cell.setCellValue(text);
                cell.setCellStyle(style);
            }
            int rowCount = 1;
            while (rs.next()) {
                HSSFRow detailrow = sheet.createRow(rowCount);
                for (int i = 0; i < fieldCount; i++) {
                    HSSFCell cell = detailrow.createCell(i);
                    String ss = rs.getString(i + 1) + "";
                    if (rs.getString(i + 1) == null)
                        cell.setCellValue("");
                    else
                        cell.setCellValue(rs.getString(i + 1) + "");
                    cell.setCellStyle(style);
                }
                rowCount++;
            }
            rs.close();
            st.close();
            workbook.write(out);
        } catch (Exception e) {
            logger.error("导出EXCEL出现异常：" + e);
            e.printStackTrace();
        } finally {
            try {
                workbook.close();
                out.close();
            } catch (IOException e) {
                logger.error("EXCEL导出流关闭异常：" + e);
            }
        }

    }

    /**
     * 读入excel文件，解析后返回
     *
     * @param file        EXCEL文件
     * @param lastCellNum 文件列数
     * @return
     * @throws IOException
     */
    public static List<String[]> readExcelOneSheet(MultipartFile file, int lastCellNum) throws IOException {
        //检查文件
        checkFile(file);
        //获得Workbook工作薄对象
        Workbook workbook = getWorkBook(file);
        List<String[]> list = new ArrayList<String[]>();
        if (workbook != null) {

            //获得当前sheet工作表
            Sheet sheet = workbook.getSheetAt(0);
            if (sheet == null) {
                return null;
            }
            //获得当前sheet的开始行
            int firstRowNum = sheet.getFirstRowNum();
            //获得当前sheet的结束行
            int lastRowNum = sheet.getLastRowNum();
            //循环除了第一行的所有行
            for (int rowNum = firstRowNum + 1; rowNum <= lastRowNum; rowNum++) {
                //获得当前行
                Row row = sheet.getRow(rowNum);
                if (row == null) {
                    continue;
                }
                if (row.getCell(0) == null && row.getCell(1) == null) {
                    break;
                }
                //获得当前行的开始列
                int firstCellNum = 0;
                //获得当前行的列数
                String[] cells = new String[lastCellNum];
                //循环当前行
                for (int cellNum = firstCellNum; cellNum < lastCellNum; cellNum++) {
                    Cell cell = row.getCell(cellNum);
                    cells[cellNum] = getCellValue(cell);
                }
                list.add(cells);
            }
            workbook.close();
        }
        return list;
    }


    public static void checkFile(MultipartFile file) throws IOException {
        //判断文件是否存在
        if (null == file) {
            logger.error("文件不存在！");
            throw new FileNotFoundException("文件不存在！");
        }
        //获得文件名
        String fileName = file.getOriginalFilename();
        //判断文件是否是excel文件
        if (!fileName.endsWith(xls) && !fileName.endsWith(xlsx)) {
            logger.error(fileName + "不是excel文件");
            throw new IOException(fileName + "不是excel文件");
        }
    }

    public static Workbook getWorkBook(MultipartFile file) {
        //获得文件名
        String fileName = file.getOriginalFilename();
        //创建Workbook工作薄对象，表示整个excel
        Workbook workbook = null;
        try {
            //获取excel文件的io流
            InputStream is = file.getInputStream();
            //根据文件后缀名不同(xls和xlsx)获得不同的Workbook实现类对象
            if (fileName.endsWith(xls)) {
                //2003
                workbook = new HSSFWorkbook(is);
            } else if (fileName.endsWith(xlsx)) {
                //2007
                workbook = new XSSFWorkbook(is);
            }
        } catch (IOException e) {
            logger.info(e.getMessage());
        }
        return workbook;
    }

    public static String getCellValue(Cell cell) {
        String cellValue = "";
        if (cell == null) {
            return cellValue;
        }
        //判断数据的类型
        switch (cell.getCellType()) {
            case NUMERIC: //数字
                cellValue = String.valueOf(cell.getNumericCellValue());
                break;
            case STRING: //字符串
                cellValue = String.valueOf(cell.getStringCellValue());
                break;
            case BOOLEAN: //Boolean
                cellValue = String.valueOf(cell.getBooleanCellValue());
                break;
            case FORMULA: //公式
                cellValue = String.valueOf(cell.getCellFormula());
                break;
            case BLANK: //空值
                cellValue = "";
                break;
            case ERROR: //故障
                cellValue = "非法字符";
                break;
            default:
                cellValue = "未知类型";
                break;
        }
        return cellValue;
    }

}
