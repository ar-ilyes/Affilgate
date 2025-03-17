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
      },
      {
        path: 'accountprofile',
        component: () => import('pages/Business/AccountProfilePage.vue'),
        name: "accountprofile",
      },
      {
        path: 'myProducts',
        component: () => import('pages/Business/MyProductsPage.vue'),
        name: "myProducts",
      },
      {
        path: 'myProducts/:id',
        component: () => import('pages/Products/ProductDetailsCreatorPage.vue'),
        name: "myProductsEdit",
      },
      {
        path: 'products/create',
        component: () => import('pages/Products/CreateProduct/ProductInformationPage.vue'),
        name: "create-product",
      },
      {
        path: 'products/create/marketing',
        component: () => import('pages/Products/CreateProduct/MarketingMaterialsPage.vue'),
        name: "create-product-marketing",
      },
      {
        path: 'invoices',
        component: () => import('pages/Business/InvoicesPage.vue'),
        name: "invoices",
      },
      {
        path: 'performances',
        component: () => import('pages/Business/PerformancePage.vue'),
        name: "performances",
      },
      {
        path: 'payment',
        component: () => import('pages/payment/PaymentPage.vue'),
        name: "payment",
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    name: "auth",
    meta: {middleware: [guest]},
    children: [
      {
        path: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
        name: "login",
      },
      {
        path: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
        name: "register",
      },
      {
        path: 'verify-email',
        component: () => import('pages/auth/VerifyEmailPage.vue'),
        name: "verify-email",
      },
      {
        path: 'forgot-password',
        component: () => import('pages/auth/ForgotPasswordPage.vue'),
        name: "forgot-password",
      },
      {
        path: 'check-email-password',
        component: () => import('src/pages/auth/CheckEmailPasswordPage.vue'),
        name: "check-email",
      },
      {
        path: 'reset-password',
        component: () => import('pages/auth/ResetPasswordPage.vue'),
        name: "reset-password",
      },
      {
        path: 'reset-success',
        component: () => import('pages/auth/ResetSuccessPage.vue'),
        name: "reset-success",
      }
    ]
  },
  {
    path: '/onboarding',
    component: () => import('layouts/AuthLayout.vue'),
    // meta: {middleware: [auth]},
    children: [
      {
        path: 'type',
        component: () => import('pages/onboarding/UserTypePage.vue'),
        name: "onboarding-type",
      },
      {
        path: 'personal-info',
        component: () => import('pages/onboarding/PersonalInfoPage.vue'),
        name: "onboarding-personal-info",
      },
      {
        path: 'business-info',
        component: () => import('pages/onboarding/BusinessInfoPage.vue'),
        name: "onboarding-business-info",
      },
      {
        path: 'marketing-preferences',
        component: () => import('pages/onboarding/MarketingPreferencesPage.vue'),
        name: "onboarding-marketing-preferences",
      }
    ]
  },
  {
    path: '/marketer',
    component: () => import('layouts/MainLayout.vue'),
    // meta: {middleware: [auth]},
    children: [
      {
        path: 'profile',
        component: () => import('pages/marketer/profile/ProfilePage.vue'),
        name: "profile",
      },
      {
        path: 'financials',
        component: () => import('pages/marketer/Financial/Financial.vue'),
        name: "financials",
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes