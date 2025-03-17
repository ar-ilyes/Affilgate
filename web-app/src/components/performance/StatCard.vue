<template>
  <div :class="bgColor ? `bg-${bgColor}-600 rounded-lg p-4` :`bg-gradient-to-br from-primaryColor-400 to-primaryColor-600 rounded-lg p-4`">
    <h3 class="text-white text-sm font-medium mb-1">{{ title }}</h3>
    <div class="flex items-end gap-2">
      <span class="text-2xl font-bold text-white">{{ value }}</span>
      <span v-if="unit" class="text-white">{{ unit }}</span>
    </div>
  </div>
</template>

<script setup>
import { colors } from 'quasar';

defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  unit: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
  }
})
</script>