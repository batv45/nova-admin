/**
 *Environment type of background service
 * - dev: Background development environment
 * - test: Background test environment
 * - prod: Background production environment
 */
type ServiceEnvType = 'dev' | 'test' | 'prod'

interface ImportMetaEnv {
  /** Project basic address */
  readonly VITE_BASE_URL: string
  /** Project title */
  readonly VITE_APP_NAME: string
  /** Open the request agent */
  readonly VITE_HTTP_PROXY?: 'Y' | 'N'
  /** Whether to turn on packing and compression */
  readonly VITE_BUILD_COMPRESS?: 'Y' | 'N'
  /** Compression algorithm type */
  readonly VITE_COMPRESS_TYPE?:
    | 'gzip'
    | 'brotliCompress'
    | 'deflate'
    | 'deflateRaw'
  /** Routing mode */
  readonly VITE_ROUTE_MODE?: 'hash' | 'web'
  /** Routing loading mode */
  readonly VITE_ROUTE_LOAD_MODE: 'static' | 'dynamic'
  /** Loading page for the first time */
  readonly VITE_HOME_PATH: string
  /** Copyright information */
  readonly VITE_COPYRIGHT_INFO: string
  /** 是否自动刷新token */
  readonly VITE_AUTO_REFRESH_TOKEN: 'Y' | 'N'
  /** Default language */
  readonly VITE_DEFAULT_LANG: App.lang
  /** Environment type of back -end service */
  readonly MODE: ServiceEnvType
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
