import vRequest from "@/utils/vRequest.ts"


/**
 * 登录
 * @param {*} params 
 * @returns 
 */
export const login = (params: any) => {
  return vRequest.post('login', params)
}

/**
 * 根据权限获取对应菜单
 */
export const getMenuList = () => {
  return vRequest.get('account/permmenu')
}

/**
 * 根据权限获取个人信息
 */
export const getUserInfo = () => {
  return vRequest.get('account/info')
}