import { defineStore } from 'pinia'
import store from '@/store'
import { ref } from 'vue'
import vSession from '@/utils/vSession'
import { getMenuList, getUserInfo } from '@/api/system/login.js'

interface info {
  email: string,
  headImg: string
  loginIp: string
  name: string
  nickName: string
  phone: string
  remark: string
}

export const useUserInfoStore = defineStore('user', () => {
  const userInfo = ref<info>({
    email: '',
    headImg: '',
    loginIp: '',
    name: '',
    nickName: '',
    phone: '',
    remark: ''
  })

  const token = ref<string>('')

  const menuList = ref([])

  const perList = ref([])

  const routeList = ref([])

  async function login(t: string) {
    token.value = t
    vSession.set('token', token.value)
    await getInfo()
    // await getMenu()
  }

  // 获取用户信息
  function getInfo() {
    return new Promise(
      (resolve, reject) => {
        getUserInfo().then(res => {
          userInfo.value = res as info
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
    )
  }

  // 获取菜单&权限
  function getMenu() {
    return new Promise(
      (resolve, reject) => {
        getMenuList().then(res => {
          const {menus, perms} = res as any
          menuList.value = menus
          perList.value = perms
          formatMenuToRoute(menus)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
    )
  }

  // 清空菜单&权限
  function clearMenu() {
    menuList.value = []
    perList.value = []
  }

  type idType = string | number
  type menuDatType = idType | boolean
  type menuObj = Record<string, menuDatType>
  function formatMenuToRoute(menuList:[menuObj]) {
    const menuMap:Record<idType, {}> = {}
    menuList.forEach(it => {
      const label = it.id as string | number
      return menuMap[label] = it
    })
    console.log(menuMap)
  }


  return { userInfo, token, login, getInfo, getMenu, menuList, perList, clearMenu, routeList }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserInfoStore(store);
}
