package com.yada.ssp.manager.svc.net;

import java.io.IOException;
import java.nio.ByteBuffer;

public interface SspClient {

    public ByteBuffer send(ByteBuffer req) throws IOException;
}
