<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <div class="mb-8">
        <div class="bg-primary-100 rounded-full p-3 inline-flex mb-4">
            <img src="/images/reset-password.png" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Reset password</h1>
        <p class="text-gray-600">Please enter your new password</p>
      </div>
  
      <form @submit.prevent="handleSubmit">
        <Input
          v-model="form.password"
          type="password"
          label="New password"
          placeholder="Enter your new password"
          :error="errors.password"
          class="mb-4"
        />
  
        <Input
          v-model="form.confirmPassword"
          type="password"
          label="Confirm new password"
          placeholder="Confirm your new password"
          :error="errors.confirmPassword"
          class="mb-6"
        />
  
        <Button
          label="Reset password"
          type="submit"
          variant="filled"
          class="w-1/4 float-right text-white bg-primaryColor-500"
          :loading="loading"
        />
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  const loading = ref(false)
  
  const form = reactive({
    password: '',
    confirmPassword: ''
  })
  
  const errors = reactive({
    password: '',
    confirmPassword: ''
  })
  
  const handleSubmit = async () => {
    // Reset errors
    errors.password = ''
    errors.confirmPassword = ''
  
    // Validate
    if (!form.password) errors.password = 'New password is required'
    if (!form.confirmPassword) errors.confirmPassword = 'Please confirm your password'
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (Object.values(errors).some(error => error)) return
  
    try {
      loading.value = true
      // Handle password reset here
      await router.push('/auth/reset-success')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  </script>