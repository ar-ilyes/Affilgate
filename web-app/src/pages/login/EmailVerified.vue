<template>
     <header class="flex items-center justify-center gap-2 mt-12">
        <img src="../../assets/logo.png" class="w-8 h-8"/>
        <span class="text-primary-600 font-bold text-3xl">CAMSHA</span>
    </header>
    <section class="max-w-lg mt-64">
        <span class="flex justify-center mb-6">
            <img src="../../assets/icons/verified.svg"/>

        </span>
        <h2 class="font-semibold text-gray-700 text-2xl mb-3 text-center flex gap-3">
            Votre adresse e-mail a été confirmée. Vous pouvez maintenant accéder à l’application.
        </h2>
        <form class="flex flex-col mt-6">
            <!-- TODO ADD LINK TO PAGE WHERE USER CAN CONTINUE REGISTRATION (EITHER COMPANY OR CANDIDATE) -->
            <router-link :to="{ name: 'onboarding-user' }" class="text-[#278D62]">
                <Button 
                    type="button"
                    label="Continuer mon inscription"
                    class="bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold w-full mt-4"
                />
            </router-link>
        </form>
    </section>
</template>

<script setup lang="ts">
import Button from 'src/components/basic/Button.vue';



</script>