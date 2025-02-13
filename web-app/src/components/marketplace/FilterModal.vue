<template>
    <q-dialog
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      persistent
    >
      <q-card class="w-[500px]">
        <q-card-section class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold">Filters</h2>
            <q-btn flat round icon="close" @click="$emit('update:modelValue', false)" />
          </div>
  
          <!-- Price Range -->
          <div class="mb-6">
            <h3 class="font-medium mb-4">Price range</h3>
            <div class="flex gap-4">
              <Input
                v-model="localFilters.minPrice"
                type="number"
                placeholder="Min"
                class="flex-1"
              />
              <Input
                v-model="localFilters.maxPrice"
                type="number"
                placeholder="Max"
                class="flex-1"
              />
            </div>
          </div>
  
          <!-- Commission Rate -->
          <div class="mb-6">
            <h3 class="font-medium mb-4">Commission rate</h3>
            <q-range
              v-model="localFilters.commission"
              :min="0"
              :max="100"
              label
              label-always
              color="primary"
              class="w-full"
            />
          </div>
  
          <!-- Categories -->
          <div class="mb-6">
            <h3 class="font-medium mb-4">Categories</h3>
            <Select
              v-model="localFilters.categories"
              :static-options="categoryOptions"
              placeholder="Select categories"
              :is-multiple="true"
            />
          </div>
        </q-card-section>
  
        <q-card-actions align="right" class="bg-gray-50 p-4">
          <Button 
            label="Clear all" 
            variant="text"
            @click="clearFilters"
          />
          <Button 
            label="Apply" 
            variant="filled"
            class="bg-primaryColor-500 text-white"
            @click="applyFilters"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import Button from 'components/basic/Button.vue'
  import Input from 'components/basic/Input.vue'
  import Select from 'components/basic/Select.vue'
  
  const props = defineProps({
    modelValue: Boolean,
    initialFilters: {
      type: Object,
      default: () => ({
        minPrice: null,
        maxPrice: null,
        commission: {
          min: 0,
          max: 100
        },
        categories: []
      })
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'apply'])
  
  const localFilters = ref({ ...props.initialFilters })
  
  // Watch for changes in initialFilters prop
  watch(() => props.initialFilters, (newFilters) => {
    localFilters.value = { ...newFilters }
  }, { deep: true })
  
  const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Home', value: 'home' },
    { label: 'Sports', value: 'sports' },
    { label: 'Books', value: 'books' }
  ]
  
  const clearFilters = () => {
    localFilters.value = {
      minPrice: null,
      maxPrice: null,
      commission: {
        min: 0,
        max: 100
      },
      categories: []
    }
  }
  
  const applyFilters = () => {
    emit('apply', localFilters.value)
    emit('update:modelValue', false)
  }
  </script>