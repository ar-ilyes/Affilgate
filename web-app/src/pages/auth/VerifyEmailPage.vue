<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <div class=" mb-8">
        <div class="rounded-full p-3 inline-flex mb-4">
          <img src="/images/email_sent.png" alt="">
        </div>
        <h1 class="text-2xl font-bold mb-2">Email sent</h1>
        <p class="text-gray-600">
          We've sent you an email verification, please check your email inbox
        </p>
      </div>
  
      <div class="flex items-center justify-between mb-6">
        <span class=" text-primaryColor-500 font-bold">Resend {{ countdown > 0 ? countdown : '' }}</span>
        <Button
          label="Check email"
          variant="filled"
          class="bg-primaryColor-500 text-white"
          @click="handleVerification"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  const countdown = ref(30)
  let timer
  
  onMounted(() => {
    startCountdown()
  })
  
  onUnmounted(() => {
    clearInterval(timer)
  })
  
  const startCountdown = () => {
    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }
  
  const handleVerification = () => {
    router.push('/onboarding/type')
  }
  </script>