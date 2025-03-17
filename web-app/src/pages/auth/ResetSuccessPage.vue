<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <div class=" mb-8">
        <div class="bg-green-100 rounded-full p-3 inline-flex mb-4">
          <q-icon name="check_circle" class="text-green-500 text-3xl" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Successful password reset!</h1>
        <p class="text-gray-600">
          You can now use your new password to log in to<br>
          your account
        </p>
      </div>
  
      <Button
        label="Sign in"
        variant="filled"
        class="w-1/4 float-right bg-primaryColor-500 text-white"
        @click="router.push('/auth/login')"
      />
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  </script>