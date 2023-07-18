import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: "/home",
    name: "home",
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/data',
        name: 'data',
        component: () => import('../views/page/DataSet.vue')
      },
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../views/page/HomePage.vue')
      },
      {
        path: '/showError',
        name: 'showError',
        component: () => import('../views/page/ErrorData.vue')
      },
      {
        path: '/eda',
        name: 'eda',
        component: () => import('../views/page/Eda.vue')
      },
      {
        path: '/power',
        name: 'power',
        component: () => import('../views/page/Power.vue')
      },
      {
        path: '/upload',
        name: 'upload',
        component: () => import('../views/page/Upload.vue')
      }
    ]
  },
]

export const router = createRouter( {
  routes: routes,
  history: createWebHashHistory(),
})

export default router
