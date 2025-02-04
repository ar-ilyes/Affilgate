// import { useUserStore } from 'src/stores/user';
// import auth, { emailVerified, guest, onboardingUser } from './middleware/auth';

// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     meta: {middleware: [auth, emailVerified]},
//     name: "main",
//     children: [
//       // SETTINGS PAGES
//       {
//         path: 'settings',
//         component: () => import('pages/settings/SettingsPage.vue'),
//         name: "settings",
//         meta: {middleware: []},
//       },
//     ]
//   },
//   {
//     path: '/auth',
//     component: () => import('layouts/OnboardingLayout.vue'),
//     name: "onboarding",
//     children: [
//       {
//         path: 'login',
//         component: () => import('pages/login/LoginPage.vue'),
//         name: "login",
//         meta: {middleware: [guest]},
//       },
//       {
//         path: 'reset-password-email',
//         component: () => import('pages/login/ResetEmailPage.vue'),
//         name: "reset-password-email",
//         meta: {middleware: [guest]},
//       },
//       {
//         path: 'reset-password',
//         component: () => import('pages/login/ResetPasswordPage.vue'),
//         name: "reset-password",
//         meta: {middleware: [guest]},
//       },
//       {
//         path: 'register',
//         component: () => import('pages/register/RegisterPage.vue'),
//         name: "register",
//         meta: {middleware: [guest]},
//       },
//     ]
//   },
//   {
//     path: '/auth/verify-email',
//     component: () => import('layouts/VerificationLayout.vue'),
//     name: "email-verification",
//     children: [
//       {
//         path: 'sent',
//         component: () => import('pages/login/EmailNotVerified.vue'),
//         name: "email-sent",
//         meta: {middleware: [auth, emailVerified]},
//       },
//       {
//         path: 'confirmed',
//         component: () => import('pages/login/EmailVerified.vue'),
//         name: "email-confirmed",
//         meta: {middleware: [auth, emailVerified]},
//       },
//     ]
//   },

//   // TODO Error page for unauthorized access
//   {
//     path: '/unauthorized',
//     component: () => import('pages/ErrorUnauthorized.vue'),
//     name: "unauthorized",
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes

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