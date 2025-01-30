<template>
    <header class="flex items-center justify-center gap-2 mt-12">
        <img src="../../assets/logo.png" class="w-8 h-8"/>

        <span class="text-primary-600 font-bold text-3xl font-primary">CAMSHA</span>
    </header>
    <section class="max-w-lg mt-64">
        <h2 class="font-semibold text-gray-700 text-2xl mb-3 text-center flex gap-3">
            Un e-mail de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.
        </h2>
        <form class="flex flex-col mt-6" @submit.prevent="resendEmail">
            <Button
                type="submit"
                :disable="timeLeft > 0" 
                :label="timeLeft > 0 ? `Renvoyer l’email dans ${timeLeft} secondes...` : 'Renvoyer l’email'" 
                :loading="loading" 
                class="bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold w-full mt-4"

            />
        </form>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { resentEmailVerification } from 'src/api/auth';
import Button from 'src/components/basic/Button.vue';
import { useAuthStore } from 'src/stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

onMounted(async () => {
    await authStore.verifyEmailStatus();
})


const loading = ref(false)
const timeLeft = ref(0);
let interval = null;

async function resendEmail() {
    if (loading.value || timeLeft.value > 0) return;

    loading.value = true
    timeLeft.value = 60

    interval = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
            clearInterval(interval);
        }
    }, 1000);

    try {
        await resentEmailVerification();
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email", error);
    } finally {
        loading.value = false;
    }
}

</script>