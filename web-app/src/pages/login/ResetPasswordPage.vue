<template>
    <section>
        <h2 class="font-semibold text-gray-700 text-2xl mt-64 mb-3 text-center flex gap-3">
            Réinitialisation du mot de passe
        </h2>
        <form @submit.prevent="handleResetPassword">
            <Input label="Nouveau mot de passe" v-model="form.password" placeholder="*********" type="password" :error="validation.password" />
            <Input label="Confirmer le mot de passe :" v-model="form.password_confirmation" placeholder="*********" type="password" :error="validation.password_confirmation" />
            <Button
                type="submit"
                label="Réinitialiser le mot de passe"
                class="bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold w-full mt-4"
                :disabled="loading" />
        </form>
    </section>

    <!-- TODO MAKE THIS INTO A COMPONENT, Change Feedback Dialog Component to this UI -->
    <!-- Dialog Reset Password Success -->
    <q-dialog v-model="reset_success">
        <q-card class="!rounded-3xl py-3">
            <q-card-section class="flex flex-col items-center">
                <!-- TODO(FADY): -->
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45Z"
                        fill="#4CAF50" />
                    <path
                        d="M34.6001 14.5996L21.0001 28.1996L15.4001 22.5996L12.6001 25.3996L21.0001 33.7996L37.4001 17.3996L34.6001 14.5996Z"
                        fill="#CCFF90" />
                </svg>

                <div class="text-3xl text-center font-bold">Mot de passe réinitialisé</div>
            </q-card-section>

            <q-card-section class="q-pt-none !text-muted text-center">
                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre
                nouveau mot de passe.
            </q-card-section>

            <q-card-actions align="center">
                <q-btn flat label="Se reconnecter" class="bg-[#278D62] text-white py-2 rounded-2xl mt-4 w-52 normal-case" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
    import { resetPassword } from 'src/api/auth';
    import Button from 'src/components/basic/Button.vue';
    import Input from 'src/components/basic/Input.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const route = useRouter();

    const reset_success = ref(false)
    const loading = ref(false)
    const validation = ref({
        token: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const form = ref({
        token: route.currentRoute.value.query.token ?? '',
        email: route.currentRoute.value.query.email ?? '',
        password: "",
        password_confirmation: ""
    })

    async function handleResetPassword() {
        loading.value = true
        try {
            await resetPassword(form.value).then((res) => {
                if (!res.status) {
                    validation.value = res.error
                } else {
                    validation.value = {
                        token: "",
                        email: "",
                        password: "",
                        password_confirmation: ""
                    }
                    reset_success.value = true

                    setTimeout(() => {
                        route.push({ name: 'login' })
                    }, 2000);
                };
            });
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            loading.value = false;
        }
    }

</script>