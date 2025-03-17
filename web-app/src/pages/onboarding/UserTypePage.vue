<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <h1 class="text-2xl font-bold mb-2">Choose if you're a business or marketer</h1>
      <p class="text-gray-600 mb-8">Please choose whether you're a business or a marketer</p>
  
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div
          class="border bg-primaryColor-200 rounded-lg p-6 cursor-pointer transition-all"
          :class="[
            selectedType === 'business' ? 'border-primary-500 bg-primary-50' : 'hover:border-gray-300'
          ]"
          @click="selectedType = 'business'"
        >
          <div class="  rounded-lg flex justify-center items-center">
            <img src="/images/seller-type.png" alt="Sell" />
          </div>
          <h3 class="font-bold mb-2">Sell</h3>
          <p class="text-gray-600 text-sm">I want to sell my products</p>
        </div>
  
        <div
          class="border bg-[#BCE3FF] rounded-lg p-6 cursor-pointer transition-all"
          :class="[
            selectedType === 'marketer' ? 'border-primary-500 bg-primary-50' : 'hover:border-gray-300'
          ]"
          @click="selectedType = 'marketer'"
        >
          <div class="rounded-lg flex justify-center items-center">
            <img src="/images/promoter-type.png" alt="Sell"  />
          </div>
          <h3 class="font-bold mb-2">Promote</h3>
          <p class="text-gray-600 text-sm">I want to earn by promoting products</p>
        </div>
      </div>
  
      <Button
        label="Next"
        variant="filled"
        class="w-full bg-primary-500"
        :disabled="!selectedType"
        @click="handleNext"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  const selectedType = ref('')
  
  const handleNext = () => {
    router.push('/onboarding/personal-info')
  }
  </script>