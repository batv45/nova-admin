import {
  ERROR_NO_TIP_STATUS,
  ERROR_STATUS,
} from './config'
import { useAuthStore } from '@/store'
import { fetchUpdateToken } from '@/service'
import { local } from '@/utils'

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * @description: 处理请求成功，但返回后端服务器报错
 * @param {Response} response
 * @return {*}
 */
export function handleResponseError(response: Response) {
  const error: Service.RequestError = {
    errorType: 'Response Error',
    code: 0,
    msg: ERROR_STATUS.default,
    data: null,
  }
  const errorCode: ErrorStatus = response.status as ErrorStatus
  const msg = ERROR_STATUS[errorCode] || ERROR_STATUS.default
  Object.assign(error, { code: errorCode, msg })

  showError(error)

  return error
}

/**
 * @description:
 * @param {Record} data 接口返回的后台数据
 * @param {Service} config 后台字段配置
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Required<Service.BackendConfig>) {
  const { codeKey, msgKey } = config
  const error: Service.RequestError = {
    errorType: 'Business Error',
    code: data[codeKey],
    msg: data[msgKey],
    data: data.data,
  }

  showError(error)

  return error
}

/**
 * @description: 统一成功和失败返回类型
 * @param {any} data
 * @param {boolean} isSuccess
 * @return {*} result
 */
export function handleServiceResult(data: any, isSuccess: boolean = true) {
  const result = {
    isSuccess,
    errorType: null,
    ...data,
  }
  return result
}

/**
 * @description: 处理接口token刷新
 * @return {*}
 */
export async function handleRefreshToken() {
  const authStore = useAuthStore()
  const { data } = await fetchUpdateToken({ refreshToken: local.get('refreshToken') })
  if (data) {
    local.set('accessToken', data.accessToken)
    local.set('refreshToken', data.refreshToken)
  }
  else {
    // 刷新失败，退出
    await authStore.resetAuthStore()
  }
}

export function showError(error: Service.RequestError) {
  // 如果error不需要提示,则跳过
  const code = Number(error.code)
  if (ERROR_NO_TIP_STATUS.includes(code))
    return

  window.$message.error(error.msg)
}
