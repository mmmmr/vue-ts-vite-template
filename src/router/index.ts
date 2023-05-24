import * as VueRouter from 'vue-router'
import login from '@/pages/login.vue'


const routes = [
  { path: '/login', component: login },
  // { path: '/about', component: About },
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else if (to.path !== '/login') {
    next({path: '/login'})
  }
})

export default router