package com.yada.ssp.manager.svc.util;

import org.apache.commons.lang3.StringUtils;

public class XorUtil {

    public static String xorHex(String a, String b) {
        int len = a.length() >= b.length() ? a.length() : b.length();
        a = StringUtils.leftPad(a.toUpperCase(), len, "0");
        b = StringUtils.leftPad(b.toUpperCase(), len, "0");
        char[] chars = new char[len];
        for (int i = 0; i < chars.length; i++) {
            chars[i] = toHex(fromHex(a.charAt(i)) ^ fromHex(b.charAt(i)));
        }
        return new String(chars);
    }

    private static int fromHex(char c) {
        if (c >= '0' && c <= '9') {
            return c - '0';
        }
        if (c >= 'A' && c <= 'F') {
            return c - 'A' + 10;
        }
        if (c >= 'a' && c <= 'f') {
            return c - 'a' + 10;
        }
        throw new IllegalArgumentException();
    }

    private static char toHex(int nybble) {
        if (nybble < 0 || nybble > 15) {
            throw new IllegalArgumentException();
        }
        return "0123456789ABCDEF".charAt(nybble);
    }
}
