<template>
    <section>
        <h2 class="font-semibold text-gray-700 text-2xl mb-3 mt-64 flex gap-3">
            Entrez l'adresse e-mail associée à votre compte.
        </h2>
        <form @submit.prevent="handleForgotPassword">
            <Input label="Adresse email" v-model="email" placeholder="Adresse email" type="email" :error="validation.email" />
            <Button
                type="submit"
                label="Envoyer le lien de réinitialisation"
                class="bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold w-full mt-4"
                :disabled="loading" />
        </form>
    </section>

    <!-- TODO MAKE THIS INTO A COMPONENT, Change Feedback Dialog Component to this UI -->
    <!-- Dialog Link Email Sent -->
    <q-dialog v-model="verified">
        <q-card class="!rounded-3xl py-3">
            <q-card-section class="flex flex-col items-center">
                <!-- TODO(FADY): clean up dont include svg inside ur component -->
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 35.598 12.402 45 24 45Z"
                        fill="#F97316" />
                    <path
                        d="M34.6001 14.5996L21.0001 28.1996L15.4001 22.5996L12.6001 25.3996L21.0001 33.7996L37.4001 17.3996L34.6001 14.5996Z"
                        fill="#FFEDD5" />
                </svg>

                <div class="text-3xl text-center font-bold">Vérifiez vos emails</div>
            </q-card-section>

            <q-card-section class="q-pt-none !text-muted text-center">
                Un lien pour réinitialiser votre mot de passe a été envoyé à l'adresse e-mail fournie. Vérifiez votre
                boîte de réception.
            </q-card-section>

            <q-card-actions align="center">
                <q-btn flat label="OK" class="bg-[#F97316] text-white py-2 rounded-2xl mt-4 w-24" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
    import { forgotPasswordLink } from 'src/api/auth';
    import Button from 'src/components/basic/Button.vue';
    import Input from 'src/components/basic/Input.vue';
    import { ref } from 'vue';

    const verified = ref(false)
    const email = ref('')

    const loading = ref(false)
    const validation = ref({
        email: "",
    })

    async function handleForgotPassword() {
        loading.value = true
        try {
            await forgotPasswordLink({
                email: email.value
            }).then((res) => {
                if (!res.status) {
                    validation.value = res.error
                } else {
                    validation.value = {
                        email: "",
                    }
                    verified.value = true
                    email.value = ''
                };
            });
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            loading.value = false;
        }
    }

</script>