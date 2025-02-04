<template>
    <div class=" bg-[#F8F6F4] rounded-lg p-6 flex flex-col items-center">
      <img 
        :src="logo" 
        :alt="name"
        class="w-24 h-24 rounded-full mb-4"
      />
      
      <h3 class="text-xl font-bold text-gray-800 mb-1">{{ name }}</h3>
      
      <a 
        :href="website" 
        target="_blank"
        class="text-primaryColor-500 hover:underline mb-2 font-bold"
      >
        Visit my website
      </a>
      
      <p class="text-gray-600 mb-4">{{ location }}</p>
      
      <Button 
        label="Show profile" 
        variant="filled" 
        class="w-full"
        customClass="bg-primaryColor-500 hover:bg-primaryColor-600 text-white"
        @click="$router.push({ name: 'profile', params: { id: businessId }})"
      />
    </div>
  </template>
  
  <script setup>
  import Button from '../basic/Button.vue'
  
  defineProps({
    businessId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  })
  </script>