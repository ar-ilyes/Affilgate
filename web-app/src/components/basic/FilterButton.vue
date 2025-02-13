<template>
    <Button
      :label="appliedFilters > 0 ? `${appliedFilters} applied filters` : 'Filter'"
      :icon="appliedFilters > 0 ? 'filter_list_alt' : 'filter_alt'"
      :variant="appliedFilters > 0 ? 'filled' : 'filled'"
      :class="[
        appliedFilters > 0 ? 'bg-primaryColor-500 text-white' : '',
        'custom-filter-button'
      ]"
      v-bind="$attrs"
    />
  </template>
  
  <script setup>
  import Button from './Button.vue'
  
  defineProps({
    appliedFilters: {
      type: Number,
      default: 0
    }
  })
  </script>
  
  <style scoped>
  .custom-filter-button {
    min-width: 140px;
  }
  </style>