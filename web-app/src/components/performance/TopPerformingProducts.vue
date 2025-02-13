<template>
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="text-yellow-400">⭐</span>
        Top Performing products
      </h2>
      <div class="space-y-4 bg-[#fcfbff] p-4 rounded-lg border border-customGray-100">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="flex items-center justify-between border-b border-customGray-100 last:border-none pb-4"
        >
          <div class="flex items-center gap-3">
            <img :src="product.image" :alt="product.title" class="w-10 h-10 rounded-lg bg-gray-100" />
            <span class="font-medium text-gray-800">{{ product.title }}</span>
          </div>
          <span class="font-bold text-gray-800">{{ product.revenue }} DA</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    products: {
      type: Array,
      required: true
    }
  })
  </script>