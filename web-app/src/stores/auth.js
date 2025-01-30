import {defineStore} from 'pinia'
import {getAuthenticatedUser, login, register} from "src/api/auth";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user')) || null,
    remember_me: JSON.parse(localStorage.getItem('remember_me')) || false,
    initialized: false,
    finishedOnboarding: false
  }),

  getters: {
    isAuthenticated: state => !!state.token,
    emailVerified: state => state.user?.email_verified,
  },

  actions: {
    async login(credentials) {
      const response = await login(credentials)
      if (!response.status) return response;
      const { token, user, remember_me } = response.data;

      this.token = token;
      this.user = user;
      this.remember_me = remember_me;

      if (remember_me) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('remember_me', JSON.stringify(remember_me));
        // Clear session storage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('remember_me', JSON.stringify(remember_me));
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      return response;
    },
    async register(credentials) {
      const response = await register(credentials);
      if (!response.status) return response;
      const { token, user } = response.data;

      this.token = token;
      this.user = user;
      // TODO: the current implementation supports remember me for register we can change this later if needed
      this.remember_me = true; 

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('remember_me', JSON.stringify(this.remember_me));
      
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      return response;
    },

    logout() {
      // Clear both storage methods
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('remember_me');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('remember_me');

      // Reset store state
      this.token = '';
      this.user = null;
      this.remember_me = false;
    },

    async verifyEmailStatus() {
      // TODO: TEMPORARY FIX
      // This is added to fetch company or candidate data when user registered it
      if (!this.emailVerified || !this.finishedOnboarding){
        const response = await getAuthenticatedUser();
        if (!response.status) return response;
        
        const { user } = response.data;
        this.user = user;
        
        if (this.remember_me) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      }
    },

    async initAuth() {
      const rememberMe = JSON.parse(localStorage.getItem('remember_me')) || false;
      
      if (rememberMe) {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
      } else {
        this.token = sessionStorage.getItem('token');
        this.user = JSON.parse(sessionStorage.getItem('user') || 'null');
      }

      if (this.token) {
        await this.verifyEmailStatus();
      }

      this.initialized = true;
    }
  }
})



// EXPLANATION: the objective of the following code is to synchronize the token between tabs. When a user logs out from one tab, the token is removed from the local storage. The event listener listens for the storage event and checks if the token is removed. If the token is removed, the user is logged out and redirected to the login page. If the token is updated, the token is updated in the store and the page is reloaded. This is useful when a user logs in from one tab and the token is updated in another tab. The token is updated in the store and the page is reloaded to reflect the changes.
window.addEventListener('storage', (event) => {
  const authStore = useAuthStore();

  if (event.key === 'token') {
    authStore.token = event.newValue;
    window.location.reload();
  }
})