<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <div class="mb-8">
        <div class="bg-primary-100 rounded-full p-3 inline-flex mb-4">
          <img src="/images/forgot-password.png"/>
        </div>
        <h1 class="text-2xl font-bold mb-2">Forget password</h1>
        <p class="text-gray-600">Please enter your email to reset your password</p>
      </div>
  
      <form @submit.prevent="handleSubmit">
        <Input
          v-model="email"
          type="email"
          label="Email"
          placeholder="e.g. example@domain.com"
          :error="error"
          class="mb-6"
        />
  
        <div class="flex gap-4 justify-end">
          <Button
            label="Back"
            variant="filled"
            class="w-32 "
            @click="router.push('/auth/login')"
          />
          <Button
            label="Send link"
            type="submit"
            variant="filled"
            class="bg-primaryColor-500 text-white w-32"
            :loading="loading"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  const email = ref('')
  const error = ref('')
  const loading = ref(false)
  
  const handleSubmit = async () => {
    error.value = ''
    if (!email.value) {
      error.value = 'Email is required'
      return
    }
  
    try {
      loading.value = true
      // Handle password reset request here
      await router.push('/auth/check-email-password')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  </script>