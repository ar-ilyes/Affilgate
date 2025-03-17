<template>
    <div class="fixed inset-0 bg-[#00000083] flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md">
        <div v-if="title" class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <q-icon name="close" />
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: ''
    }
  })
  
  defineEmits(['close'])
  </script>