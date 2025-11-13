import { createRouter, createWebHashHistory } from 'vue-router'

const ElementForm = () => import('../views/element-plus/FormView.vue')
const ElementData = () => import('../views/element-plus/DataView.vue')

// 请求管理
const BasicView = () => import('../views/bingwu-request-manager/BasicView.vue')
const Demo1 = () => import('../views/demo/demo1.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页 - Element Plus基础组件
    {
      path: '/',
      name: 'home',
      component: Demo1,
      meta: {
        title: 'demo',
        parent: 'demo',
      },
    },
    // Element Plus路由组
    {
      path: '/element-plus/form',
      name: 'element-form',
      component: ElementForm,
      meta: {
        title: '表单组件',
        parent: 'Element Plus',
      },
    },
    {
      path: '/element-plus/data',
      name: 'element-data',
      component: ElementData,
      meta: {
        title: '数据展示',
        parent: 'Element Plus',
      },
    },

    // 请求管理
    {
      path: '/bingwu-request-manager/basic',
      name: 'bingwu-request-manager-basic',
      component: BasicView,
      meta: {
        title: '基本示例',
        parent: '请求管理',
      },
    },
    // 关于页
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '关于',
      },
    },
    {
      path: '/demo/demo1',
      name: 'demo1',
      component: Demo1,
      meta: {
        title: 'demo1',
        parent: 'demo',
      },
    },
  ],
})

export default router
