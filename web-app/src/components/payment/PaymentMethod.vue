<template>
    <div 
      class="border rounded-lg p-4 mb-4 cursor-pointer"
      :class="[
        isSelected ? 'border-primaryColor-500 bg-white' : 'border-customGray-100',
        isSelected ? 'shadow-sm' : ''
      ]"
      @click="$emit('select')"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="px-2 py-1 border border-customGray-100 rounded-sm">
          <img :src="icon" :alt="title" class="w-6 h-6" />
        </div>
          <span class="font-medium text-gray-800">{{ title }}</span>
        </div>
        <div 
          class="w-5 h-5 rounded-full border-2"
          :class="[
            isSelected ? 'border-primaryColor-500' : 'border-gray-300',
            isSelected ? 'bg-primaryColor-500' : 'bg-white'
          ]"
        >
          <span v-if="isSelected" class="material-icons text-white text-sm flex items-center justify-center">
            check
          </span>
        </div>
      </div>
  
      <!-- Content when selected -->
      <div v-if="isSelected">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits(['select'])
  </script>