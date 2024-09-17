import { request } from '../http'

// Get all routing information
export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes')
}

// Get all user information
export function fetchUserPage() {
  return request.Get<Service.ResponseResult<Entity.User[]>>('/userPage')
}
// Getting all the corner list
export function fetchRoleList() {
  return request.Get<Service.ResponseResult<Entity.Role[]>>('/role/list')
}

/**
 * Request to obtain dictionary list
 *
 * @param code - Dictionary coding, used to screen a specific dictionary list
 * @returns Back dictionary list data
 */
export function fetchDictList(code?: string) {
  const params = { code }
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/list', { params })
}
