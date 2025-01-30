<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import Input from "components/basic/Input.vue"
  import { useAuthStore } from "src/stores/auth";
  import { useUserStore } from "src/stores/user";
  import Button from "src/components/basic/Button.vue";
  import { test } from "src/api/auth";

  const route = useRouter()

  const form = ref({
        email: "",
        password: "",
        remember_me: false
    })

  const saving = ref(false)
  const validation = ref({
    email: "",
    password: "",
  })

  const { login } = useAuthStore()
  const userStore = useUserStore()

  async function handleSubmit() {
        saving.value = true

        await login(form.value).then((res) => {
            if (!res.status) {
                validation.value = res.error
            } else {
                validation.value = {
                  email: "",
                  password: "",
                }
                // Redirect first to onboarding in case he didn't finish
                // if he did finish, he will be redirected to the dashboard
                // TODO Check if this is correct later
                userStore.setUser().then(() => {
                    route.push({ name: 'onboarding-user' })
                })
            };
            
        }).finally(() => {
            saving.value = false
        })
    }
   const openDialog=ref(false)
</script>

<template>
  <section>
    <h2 class="font-semibold text-gray-700 text-3xl mt-52 mb-12 text-center">Content de vous revoir 👋</h2>
    <form @submit.prevent="handleSubmit" class="flex flex-col mt-6">
      <Input label="Adresse email" v-model="form.email" placeholder="Adresse email" type="email" :error="validation.email" />
      <Input label="Mot de passe" v-model="form.password" placeholder="*********" type="password" :error="validation.password" />
      <div class="flex justify-between items-center">
        <div class="inline-flex items-center">
            <label for="remember_me" class="flex items-center cursor-pointer relative">
                <input 
                    v-model="form.remember_me"
                    type="checkbox" 
                    class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-sm border border-slate-300 checked:bg-primary-500" id="remember_me" />
                <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="#278D62"/>
                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#278D62"/>
                        <path d="M11.3332 5.5L6.74984 10.0833L4.6665 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </label>
            <span class="text-sm ml-2">Se souvenir de moi</span>
        </div> 
        <span class="font-bold text-slate-800 underline"> 
          <router-link :to="{ name: 'reset-password-email' }">Mot de passe oublié ? </router-link>
        </span>
      </div>
      <Button 
          type="submit"
          label="Se connecter" 
          class="bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold w-full mt-6"
          :loading="saving"
        
      />
      <CandidatureConfirmationDialog v-model="openDialog"/>
    </form>
    <div class="flex items-center mt-8">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-4 text-gray-500">Ou</span>
        <div class="flex-1 border-t border-gray-300"></div>
    </div>
    <div class="w-full flex justify-center gap-4 mt-4">
      <button
        class="flex-1 flex items-center justify-center gap-4 px-3 py-2 rounded-[30px] border border-solid border-[rgba(74,67,236,0.20)] bg-white w-[200px]">
        <img src="~assets/icons/linkedin.png" alt="LinkedIn" class="w-5 h-5" />
        <p>Linkedin</p>
      </button>
      <button
        class="flex-1 flex items-center justify-center gap-4 px-3 py-2 rounded-[30px] border border-solid border-[rgba(74,67,236,0.20)] bg-white w-[200px]">
        <img src="~assets/icons/google.png" alt="LinkedIn" class="w-5 h-5" />
        <p>Google</p>
      </button>
    </div>
    <div class="text-center mt-6">
      <span class="text-[#919CA7]">Vous n’êtes pas encore inscrit ?
        <router-link :to="{ name: 'register' }" class="text-[#278D62] font-semibold">S’inscrire</router-link>
      </span>
    </div>
  </section>
</template>
