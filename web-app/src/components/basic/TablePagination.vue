<template>
    <div class="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
      <button 
        class="flex items-center gap-2 text-gray-600 hover:text-blue-600"
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
              ? 'bg-blue-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          ]"
          @click="$emit('page-change', page)"
        >
          {{ page }}
        </button>
        <span v-if="totalPages > 10" class="px-2">...</span>
      </div>
      <button 
        class="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        :disabled="currentPage === totalPages"
        @click="$emit('page-change', currentPage + 1)"
      >
        Next
        <span class="material-icons text-sm">chevron_right</span>
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
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