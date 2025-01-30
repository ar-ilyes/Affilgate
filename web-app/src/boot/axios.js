import {boot} from 'quasar/wrappers'
import axios from 'axios'
import {Notify} from "quasar";
import { useAuthStore } from 'src/stores/auth';

const baseURL = process.env.DEV ? process.env.BACKEND_API : ""
const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// todo production ??
const logger = console.log


export default boot(({app,router}) => {
  // const t = i18n.global.t;
    
  //TODO handling routing after login
  api.interceptors.request.use(
    config => {
      const authStore = useAuthStore()
      const token = authStore.token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );


  api.interceptors.response.use(
    function (response) {
      return {status: true, data: response.data}
    },
    function (error) {
      logger(error)
      if (error.response?.status === 401){
        const authStore = useAuthStore();
        authStore.logout()

        Notify.create({
          position: 'top-right',
          color: 'red',
          message: error.response?.data?.message ?? "une erreur s'est produite",
        })

      }else if (error.response?.status === 422) {
        // todo make it more generic
        let errors = error.response?.data?.errors
        Object.keys(errors).forEach(key => errors[key] = errors[key][0])
        return { status: false, error: errors }
      } else if (error.response?.status === 404) {
        Notify.create({
          position: 'top-right',
          color: 'red',
          message: "Ressource non trouvée",
          actions: [
            {
              label: 'retour', color: 'white', handler: () => {
                router.back()
              }
            },
            {
              label: 'accueil', color: 'white', handler: () => {
                router.replace({name: 'home'})
              }
            },
          ]
        })

      }
      else if (error.code == 'ERR_CANCELED') {
        //request canceled
        return { status: false, error: error }
      }
      else if (error.response?.status === 410 ) {
        return window.location = "/auth/login";
      }
      // error
      else {
        Notify.create({
          position: 'top-right',
          color: 'red',
          message: "une erreur s'est produite"
        });

        return {status: false, error: error}
      }
    }
  );

  app.config.globalProperties.$api = api
  app.config.globalProperties.$axios = axios
})

export {api}
