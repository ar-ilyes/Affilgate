<template>
    <div>
      <div 
        class=" text-center cursor-pointer"
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <div class="flex flex-col items-center">
            <q-icon name="add" size="xl" class="text-primaryColor-500" />
          <span class="text-gray-500 text-sm mt-1"><span class=" text-primaryColor-500 font-bold">Click here </span>to upload image or drag and drop</span>
          <span class="text-gray-400 text-xs mt-1">Supported format: png, jpg</span>
        </div>
      </div>
  
      <!-- Image Preview Grid -->
      <div v-if="modelValue.length > 0" class="flex gap-1 mt-4">
        <div 
          v-for="(image, index) in modelValue" 
          :key="index"
          class="relative flex group w-[24%] justify-center"
        >
          <div 
            class="relative rounded-lg"
            :class="{
              'bg-gray-900 bg-opacity-50': mainImageIndex === index
            }"
          >
            <img 
              :src="image.url" 
              :alt="'Product image ' + (index + 1)"
              class="w-full h-48 object-cover"
              :class="{
                'opacity-50': mainImageIndex === index
              }"
            />
            
            <!-- Hover Overlay -->
            <div 
              v-if="mainImageIndex !== index"
              class="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center"
            >
              <button
                class="opacity-0 group-hover:opacity-100 bg-primaryColor-100 text-primaryColor-500 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200"
                @click.stop="setAsMain(index)"
              >
                Set as main picture
              </button>
            </div>
  
            <!-- Main Image Badge -->
            <div 
              v-if="mainImageIndex === index"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primaryColor-100 text-primaryColor-500 px-2 py-1 rounded-full text-xs font-medium w-2/3"
            >
              Main picture
            </div>
            <!-- Remove Button -->
          <button
            class="absolute -top-2 -right-2 z-50 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            @click.stop="removeImage(index)"
          >
            ×
          </button>
          </div>
  
          
        </div>
      </div>
  
      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg"
        class="hidden"
        multiple
        @change="handleFileSelect"
      >
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: Array,
      required: true
    },
    mainImageIndex: {
      type: Number,
      default: null
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'update:mainImage'])
  
  const fileInput = ref(null)
  
  const triggerFileInput = () => {
    fileInput.value.click()
  }
  
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    addImages(files)
  }
  
  const handleDrop = (event) => {
    const files = Array.from(event.dataTransfer.files).filter(file => 
      file.type === 'image/png' || file.type === 'image/jpeg'
    )
    addImages(files)
  }
  
  const addImages = (files) => {
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }))
    
    emit('update:modelValue', [...props.modelValue, ...newImages])
    
    // If this is the first image, set it as main
    if (props.modelValue.length === 0) {
      emit('update:mainImage', 0)
    }
  }
  
  const removeImage = (index) => {
    const newImages = [...props.modelValue]
    newImages.splice(index, 1)
    emit('update:modelValue', newImages)
    
    // Update main image index if necessary
    if (index === props.mainImageIndex) {
      emit('update:mainImage', newImages.length > 0 ? 0 : null)
    } else if (index < props.mainImageIndex) {
      emit('update:mainImage', props.mainImageIndex - 1)
    }
  }
  
  const setAsMain = (index) => {
    emit('update:mainImage', index)
  }
  </script>