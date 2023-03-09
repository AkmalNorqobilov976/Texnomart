import { useAuthStore } from '@/store/authStore'
import nProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    component: () => import('@/views/bridgeIndex.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/product/index.vue')
      },
      {
        path: 'update/:id',
        name: 'product-update',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/views/product/update.vue')
      }
    ]
  },
  {
    path: '/auth/signin',
    component: () => import('@/views/auth/signin.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  nProgress.start();
  if ( to.meta.requiresAuth && authStore.token ) {
    next()
    nProgress.done()
  } else if(to.meta.requiresAuth && !authStore.token) {
      next(`/auth/signin?redirect=${to.path}`);
      nProgress.done();
  } else {
   next()
   nProgress.done();
  }
})
export default router
