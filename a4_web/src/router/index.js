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
        path: 'eda',
        name: 'eda',
        component: () => import('../views/page/Eda.vue')
      },
      {
        path: 'power',
        name: 'power',
        component: () => import('../views/page/Power.vue')
      },
      {
        path: 'upload',
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
