/** Related type of request */
declare namespace Service {
  import type { Method } from 'alova'

  interface AlovaConfig {
    baseURL: string
    timeout?: number
    beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
  }

  /** Data structure configuration returned by the back -end interface */
  interface BackendConfig {
    /** Indicates the attribute field of the back -end request status code */
    codeKey?: string
    /** Indicates the attribute field of the back -end request data */
    dataKey?: string
    /** The attribute field of the back -end message */
    msgKey?: string
    /** The state defined in the back -end business */
    successCode?: number | string
  }

  type RequestErrorType = 'Response Error' | 'Business Error' | null
  type RequestCode = string | number

  interface RequestError {
    /** The error type of request service */
    errorType: RequestErrorType
    /** Error code */
    code: RequestCode
    /** error message */
    message: string
    /** Return data */
    data?: any
  }

  interface ResponseResult<T> extends RequestError {
    /** Is the request service successful */
    isSuccess: boolean
    /** The error type of request service */
    errorType: RequestErrorType
    /** Error code */
    code: RequestCode
    /** error message */
    message: string
    /** Return data */
    data: T
  }
}
