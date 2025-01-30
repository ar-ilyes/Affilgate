<template>
    <section>
        <h2 class="font-semibold text-gray-700 text-3xl  mt-32 mb-3 text-center">Hello ! Inscrivez-vous ici 👋</h2>
        <form @submit.prevent="handleSubmit" class="flex flex-col mt-12 ">
            <div class="w-full flex gap-4">
                <div class="flex-1">
                    <Input label="Nom" v-model="form.last_name" placeholder="Nom" :error="validation.first_name" required-label="true" />
                </div>
                <div class="flex-1">
                    <Input label="Prénom" v-model="form.first_name" placeholder="Prénom" :error="validation.last_name" required-label="true" />
                </div>
            </div>
            <Input label="Adresse email" v-model="form.email" placeholder="Adresse email" type="email" :error="validation.email" required-label="true" />
            <Input label="Mot de passe" v-model="form.password" placeholder="*********" type="password" :error="validation.password" required-label="true" />
            <Input label="Confirmation du mot de passe" v-model="form.password_confirmation" placeholder="*********"
                type="password" :error="validation.password_confirmation" required-label="true" />
            <div class="inline-flex items-center">
                <label for="acceptTerms" class="flex items-center cursor-pointer relative">
                    <input 
                        v-model="form.accept_terms"
                        type="checkbox" 
                        class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-sm border border-slate-300 checked:bg-primary-500" id="acceptTerms" />
                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="#278D62"/>
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#278D62"/>
                            <path d="M11.3332 5.5L6.74984 10.0833L4.6665 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </label>
                <span class="text-sm ml-2">
                    J'accepte les 
                    <router-link :to="{ name: 'main' }" class="italic font-bold text-slate-800 hover:underline">
                        termes
                    </router-link>
                    et 
                    <router-link :to="{ name: 'main' }" class="italic font-bold text-slate-800 hover:underline">
                        conditions énoncés
                    </router-link>
                    dans le contrat d'utilisation.
                </span>
            </div> 
            <Button 
                type="submit"
                label="S'enregistrer" 
                class="bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold w-full mt-6"
                :loading="saving" 
                :disable="!form.accept_terms"
            />
        </form>
        <div class="flex items-center mt-8">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="px-4 text-gray-500">Ou</span>
            <div class="flex-1 border-t border-gray-300"></div>
        </div>
        <div class="w-full flex justify-center gap-6 mt-4">
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
            <span class="text-[#919CA7]">Avez-vous déjà un compte ?
                <router-link :to="{ name: 'login' }" class="text-[#278D62] font-semibold">Se connecter</router-link>
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
    import Button from 'src/components/basic/Button.vue';
    import Input from 'src/components/basic/Input.vue';
    import { useAuthStore } from 'src/stores/auth';
    import { useUserStore } from 'src/stores/user';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const route = useRouter()

    const form = ref({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        accept_terms: false,
    })

    const saving = ref(false)
    const validation = ref({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        accept_terms: ""
    })
    const { register } = useAuthStore()
    const userStore = useUserStore()

    async function handleSubmit() {
        saving.value = true

        await register(form.value).then((res) => {
            if (!res.status) {
                validation.value = res.error
            } else {
                validation.value = {
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    accept_terms: ""
                }
                userStore.setUser().then(() => {
                    route.push({ name: 'email-sent' })
                })
            };            
        }).finally(() => {
            saving.value = false
        })
    }

</script>