<template>
    <q-btn
      :flat="variant === 'text'"
      :outline="variant === 'outline'"
      :unelevated="variant === 'filled'"
      :color="color"
      :label="label"
      :icon="icon"
      :icon-right="iconRight"
      :disabled="disabled"
      :loading="loading"
      :class="[
        'custom-button',
        customClass,
        variant === 'filled' && !color && ' bg-customGray-500 text-customGray-600',
        variant === 'outline' && !color && ' border-primaryColor-500 text-primaryColor-500',
        variant === 'text' && !color && 'text-primaryColor-500',
        
      ]"
      v-bind="$attrs"
    >
      <slot></slot>
    </q-btn>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    icon: String,
    iconRight: String,
    variant: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'outline', 'text'].includes(value)
    },
    color: String,
    disabled: Boolean,
    loading: Boolean,
    customClass: String
  })
  </script>
  
  <style scoped>
  .custom-button {
    border-radius: 8px;
    font-weight: 500;
    text-transform: none;
    padding: 8px 16px;
    min-height: 40px;
  }
  </style>