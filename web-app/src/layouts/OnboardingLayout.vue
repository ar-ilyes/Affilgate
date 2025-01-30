<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="flex h-screen bg-primary-500">
        <!-- <img src="../assets/landingImage.svg" class="w-screen h-screen absolute top-0 left-0" /> -->
        <!-- Left Section -->
        <div class="w-7/12 bg-primary-500 text-white flex flex-col justify-evenly py-10 pl-32">
          <div class="flex gap-x-2 mb-32 ">
            <!-- <img src="../assets/logo.png" class="w-8 h-8"/> -->
            <div class="flex flex-col">
              <div class="flex gap-x-5 items-center">
                <span class="font-bold text-3xl">CAMSHA</span>

                <div class="flex flex-row gap-x-2 items-center ">
                  <!-- <img src="../assets/icons/users.svg" /> -->
                  <span class="text-[12px]">Rejoignez nos utilisateurs et profitez de nos services !</span>
                </div>

              </div>

              <span>Smart hiring solution by <span class="font-semibold">SmartBubble</span>.</span>
            </div>


          </div>
          <div  class="max-w-xl">
            <div v-if="route.path.endsWith('register')">
              <h1 class="text-4xl font-bold max-w-lg">Ensemble, trouvons les futurs membres de votre équipe !</h1>
              <p class="mt-4">
                Complétez votre profil pour que nous puissions vous proposer les meilleures opportunités. Vous allez
                entrer vos informations de base, télécharger vos documents, et préciser vos préférences pour mieux
                adapter nos offres à vos attentes.
              </p>
            </div>
            <div v-if="route.path.endsWith('login')">
              <h1 class="text-4xl font-bold max-w-lg">Trouvez votre futur job !</h1>
              <p class="mt-4">
                Commencez dès aujourd'hui à publier vos offres et laissez-nous vous accompagner dans la recherche des meilleurs profils pour vos besoins.
              </p>
            </div>
            <div v-if="route.path.endsWith('visibility-offer')">
              <h1 class="text-4xl font-bold max-w-lg">Explorez des opportunités et connectez-vous avec des recruteurs.</h1>
              <p class="mt-4">
                Découvrez un réseau dynamique de recruteurs et de candidats. Complétez votre profil et commencez à faire grandir votre carrière ou trouver le talent idéal.              </p>
            </div>

            <p class="mt-10 text-sm">&copy;2024 CAMSHA. Tous droits réservés</p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="w-5/12 relative ">
          <div
            class="bg-[#FFFFFF61] absolute w-full h-[calc(100%-50px)] -left-8 top-[50%] -translate-y-[50%] rounded-l-[3rem] z-10">
          </div>
          <div class="bg-white flex flex-col px-16 relative rounded-l-[3rem] h-screen z-40">
            <router-view />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>