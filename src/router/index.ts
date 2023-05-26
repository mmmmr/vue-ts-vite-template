import * as VueRouter from 'vue-router'
import login from '@/pages/login.vue'
import layout from '@/pages/layout/index.vue'
import { getToken } from '@/utils/vv'
import {useUserStoreWithOut} from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {storeToRefs} from 'pinia'
import { ElMessageBox } from 'element-plus'

const routes = [
  { path: '/login', component: login, name: 'login' },
  { path: '/layout', component: layout, name: 'layout' },
  { path: '/', redirect: '/layout' }// 重定向到指定页面
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})

const userInfo = useUserStoreWithOut()

router.beforeEach((to, from, next) => {
  
  NProgress.start()
  if (to.path === '/login') {
    next()
    NProgress.done()
  } else if (to.path !== '/login') {
    const token = getToken()
    if (!token) {
      next({path: '/login'})
      return
    }
    const { menuList } = storeToRefs(userInfo)
    if (!menuList.value.length) {
      userInfo.getMenu().then(() => {
        next({...to})
        NProgress.done()
      }).catch (err => {
        ElMessageBox.alert('获取菜单信息失败!', '警告', {
          confirmButtonText: '点击返回登录页',
          callback: () => {
            next({path: '/login', replace: true})
          },
        })
      })
    } else if(!(to.name && router.hasRoute(to.name))){
      ElMessageBox.confirm(
        '您没有目标菜单权限!',
        '警告',
        {
          confirmButtonText: '重新加载页面权限',
          cancelButtonText: '取消跳转',
          type: 'warning',
          closeOnHashChange: false,
          closeOnPressEscape: false,
          closeOnClickModal: false,
          showClose: false
        }
      )
        .then(() => {
          userInfo.clearMenu()
          next({...to, replace: true})
        })
        .catch(() => {
          next({...from, replace: true})
        })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  }
})

export default router