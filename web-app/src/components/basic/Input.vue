<template>
    <div class=" w-full">
      <div v-if="label" class="text-[#354665] font-medium text-sm mb-1 justify-center items-center">
        {{ label }}
        <span v-if="requiredLabel" class="text-red-500">*</span>
      </div>
    <q-input
      dense
      borderless
      outlined
      class="custom-input"
      :class="{ 'input-error': error }"
      v-bind="$attrs"
      :type="inputType"
      :error="!!error"
      :error-message="error"
      :style="{ width: props.width || '100%', height: '40px'}"
      >
        <template v-if="$slots.prepend" v-slot:prepend>
          <slot name="prepend"></slot>
        </template>
        
        <template v-if="type === 'password'" v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            @click="togglePasswordVisibility"
            class="cursor-pointer text-gray-400"
          />
        </template>
  
        <template v-else-if="$slots.append" v-slot:append>
          <slot name="append"></slot>
        </template>
      </q-input>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  
  const props = defineProps({
    label: String,
    error: String,
    requiredLabel: Boolean,
    type: String,
    width: String
  })
  
  const showPassword = ref(false)
  
  const inputType = computed(() => {
    if (props.type === 'password') {
      return showPassword.value ? 'text' : 'password'
    }
    return props.type
  })
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }
  </script>
  
  <style scoped>
  .custom-input {
    background-color: #f3f4f6;
    border-radius: 10px;
  }
  
  .custom-input :deep(.q-field__control) {
    border-radius: 10px;
    height: 40px;
  }

    .custom-input :deep(.q-field__control::before) {
        border: none;
    }

  
  .custom-input :deep(.q-field__control:hover) {
    border-color: #60a5fa;
  }
  
  .input-error :deep(.q-field__control) {
    border-color: #ef4444;
  }
  </style>