/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/svc/web': {
      target: 'http://localhost:8085/',
      changeOrigin: true,
      pathRewrite: {
        '^/svc/web': '',
      },
      logLevel: 'debug',
    },
    '/svc/ssp': {
      target: 'http://localhost:8084/',
      changeOrigin: true,
      pathRewrite: {
        '^/svc/ssp': '',
      },
      logLevel: 'debug',
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
