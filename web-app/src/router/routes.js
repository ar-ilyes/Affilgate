import { useUserStore } from 'src/stores/user';
import auth, { emailVerified, guest, onboardingUser } from './middleware/auth';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {},
    name: "main",
    children: [
      {
        path: '',
        redirect: '/marketplace'
      },
      {
        path: 'marketplace',
        component: () => import('pages/Marketplace/MarketplacePage.vue'),
        name: "marketplace",
      },
      {
        path: 'marketplace/:id',
        component: () => import('pages/Marketplace/ProductDetailsPage.vue'),
        name: "product-details",
      },
      {
        path: 'profile',
        component: () => import('pages/Business/ProfilePage.vue'),
        name: "profile",
      }
    ]
  },
  // {
  //   path: '/auth',
  //   component: () => import('layouts/AuthLayout.vue'),
  //   name: "auth",
  //   meta: {middleware: [guest]},
  //   children: [
  //     {
  //       path: 'login',
  //       component: () => import('pages/login/LoginPage.vue'),
  //       name: "login",
  //     },
  //     {
  //       path: 'register',
  //       component: () => import('pages/register/RegisterPage.vue'),
  //       name: "register",
  //     }
  //   ]
  // },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes