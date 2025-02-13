<template>
    <div class="bg-gray-50 border border-customGray-100 rounded-lg p-6 h-full flex flex-col">
      <h2 class="text-xl font-bold text-gray-800 mb-6">Summary</h2>
      
      <div v-for="(commission, index) in commissions" :key="index" class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="font-medium">Commission {{ index + 1 }}</span>
            <span class="px-2 py-0.5 bg-primaryColor-100 text-primaryColor-700 rounded-full text-sm">
              {{ commission.percentage }}%
            </span>
          </div>
          <span class="font-bold">{{ commission.total }} DA</span>
        </div>
  
        <div class="space-y-2">
          <div 
            v-for="product in commission.products" 
            :key="product.id"
            class="grid grid-cols-[2fr_2.5fr_1.5fr_1fr] gap-4 text-sm"
          >
            <span class="text-gray-600">{{ product.name }}</span>
            <span class="text-gray-800">{{ product.price }} DA</span>
            <span class="text-gray-500">x{{ product.quantity }}</span>
            <span class="font-medium">{{ product.total }}</span>
          </div>
        </div>
      </div>
  
      <div class="mt-auto p-4 rounded-lg border border-gray-100 bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <span class="font-bold text-lg text-gray-500">Total a payer</span>
        <span class="font-bold text-xl">{{ totalAmount }} DA</span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    commissions: {
      type: Array,
      required: true
    },
    totalAmount: {
      type: String,
      required: true
    }
  })
  </script>