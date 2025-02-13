<template>
    <div class="bg-white rounded-lg">
      <div class="grid grid-cols-[1.5fr_1fr_1.5fr_1fr_1fr_1fr] px-6 py-2 text-sm bg-customGray-50 border-b border-gray-100">
        <div class="font-medium text-gray-600">Product name</div>
        <div class="font-medium text-gray-600">Total sales</div>
        <div class="font-medium text-gray-600">Total commission paid</div>
        <div class="font-medium text-gray-600">Total revenue</div>
        <div class="font-medium text-gray-600">Total clicks</div>
        <div class="font-medium text-gray-600">Total conversion rate</div>
      </div>
  
      <div class="divide-y divide-gray-100">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="grid grid-cols-[1.5fr_1fr_1.5fr_1fr_1fr_1fr] px-6 py-4 items-center hover:bg-gray-50"
        >
          <div class="flex items-center gap-3">
            <img :src="product.image" :alt="product.title" class="w-10 h-10 rounded-lg bg-gray-100" />
            <span class="font-medium text-gray-800">{{ product.title }}</span>
          </div>
          <div class="text-gray-800">{{ product.totalSales }}</div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-gray-800">{{ product.commission }}</span>
              <span class="px-2 py-0.5 bg-primaryColor-300 text-primaryColor-700 rounded-full text-sm font-bold">
                {{ product.commissionPercentage }}%
              </span>
            </div>
          </div>
          <div class="text-gray-800">{{ product.revenue }}</div>
          <div class="text-gray-800">{{ product.clicks }}</div>
          <div class="text-gray-800">{{ product.conversionRate }}</div>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
        <button 
          class="flex items-center gap-2 text-gray-600 hover:text-primaryColor-500"
          :disabled="currentPage === 1"
          @click="$emit('page-change', currentPage - 1)"
        >
          <span class="material-icons text-sm">chevron_left</span>
          Previous
        </button>
        <div class="flex gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            :class="[
              currentPage === page 
                ? 'bg-primaryColor-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            ]"
            @click="$emit('page-change', page)"
          >
            {{ page }}
          </button>
          <span v-if="totalPages > 10" class="px-2">...</span>
        </div>
        <button 
          class="flex items-center gap-2 text-gray-600 hover:text-primaryColor-500"
          :disabled="currentPage === totalPages"
          @click="$emit('page-change', currentPage + 1)"
        >
          Next
          <span class="material-icons text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    products: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  })
  
  defineEmits(['page-change'])
  </script>