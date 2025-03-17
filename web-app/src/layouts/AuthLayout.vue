<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container class="bg-gray-50">
        <div class="h-screen flex  ">
          <!-- Left Side - Branding -->
          <div class="bg-gradient-to-br w-[55%] from-primary-400 to-primary-600 flex flex-col">
              <img src="/images/onboarding-business.svg" width="100%" height="100%" alt="Affilgate" class="w-full h-full" />
                    
          </div>
  
          <!-- Right Side - Content -->
          <div class="flex w-[45%] items-center justify-center p-12">
            <router-view />
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  // No additional logic needed
  </script>
  
  <style scoped>
  .q-layout {
    background-color: rgb(249, 250, 251);
  }
  </style>