<template>
    <div class="relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 p-8 mb-6 h-[220px]">
      <div class="relative z-10">
        <h1 class="text-[55px] font-bold text-white">{{ title }}</h1>
        <p class="text-white/90 text-[23px]">{{ description }}</p>
      </div>
      <div class="absolute right-0 top-0 h-full w-1/2">
        <slot name="decoration">
          <div class="relative h-full">
            <div class="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
              <img src="/images/header.svg" alt="Decoration" class=" w-[500px]" />
            </div>
          </div>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
  </script>