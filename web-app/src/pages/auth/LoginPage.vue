<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <h1 class="text-2xl font-bold mb-1">Sign in</h1>
      <p class="text-gray-600 mb-6">Sign in with our plateform</p>
  
      <!-- Social Login Buttons -->
      <div class="space-y-3 mb-6">
        <button class="w-full flex items-center justify-center gap-2 border rounded-lg p-2.5 hover:bg-gray-50">
          <img src="/icons/google.png" alt="Google" class="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
        <button class="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg p-2.5 hover:opacity-90">
          <q-icon name="fab fa-facebook" />
          <span>Sign in with Facebook</span>
        </button>
      </div>
  
      <div class="relative text-center mb-6">
        <span class="bg-white px-4 text-gray-500 relative z-10">Or</span>
        <div class="absolute w-full h-px bg-gray-200 top-1/2 left-0 -z-0"></div>
      </div>
  
      <!-- Login Form -->
      <form @submit.prevent="handleSubmit">
        <Input
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="e.g. example@domain.com"
          :error="errors.email"
          class="mb-4"
        />
  
        <Input
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          :error="errors.password"
          class="mb-4"
        />
  
        <div class="flex justify-end mb-6">
          <router-link to="/auth/forgot-password" class="text-sm text-gray-600 hover:text-primary-500">
            Forgot password?
          </router-link>
        </div>
  
        <Button
          label="Sign in"
          type="submit"
          variant="filled"
          class="w-full bg-primary-500"
          :loading="loading"
        />
      </form>
  
      <p class="text-center mt-6 text-gray-600">
        Don't have an account?
        <router-link to="/auth/register" class="text-primary-500 hover:underline">Create an account</router-link>
      </p>
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
    email: '',
    password: ''
  })
  
  const errors = reactive({
    email: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    // Reset errors
    errors.email = ''
    errors.password = ''
  
    // Validate
    if (!form.email) errors.email = 'Email is required'
    if (!form.password) errors.password = 'Password is required'
    if (Object.values(errors).some(error => error)) return
  
    try {
      loading.value = true
      // Handle login logic here
      await router.push('/onboarding/type')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  </script>