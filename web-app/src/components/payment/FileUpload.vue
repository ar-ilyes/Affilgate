<template>
    <div 
      class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-primaryColor-300"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleFileSelect"
        accept="image/*,.pdf"
      >
      
      <template v-if="!selectedFile">
        <span class="material-icons text-4xl text-gray-400 mb-2">add</span>
        <p class="text-primaryColor-500 font-medium">Upload receipt</p>
      </template>
      
      <template v-else>
        <div class="flex items-center justify-between bg-gray-50 p-3 rounded">
          <div >
            <div class="flex items-center gap-4">
              <p class="font-medium text-gray-800">Payment receipt</p>
              <p class="text-sm text-gray-500">{{ fileSize }}</p>
            </div>
            <p class="text-green-600 text-sm mt-2">File uploaded successfully</p>

          </div>
          <button 
            class="text-red-500 hover:text-red-600"
            @click.stop="removeFile"
          >
            <q-icon name="o_delete" size="sm" />
          </button>
        </div>
      </template>
    </div>
  </template>
  
  <script setup>
  import { ref , computed } from 'vue'
  
  const fileInput = ref(null)
  const selectedFile = ref(null)
  const emit = defineEmits(['file-selected', 'file-removed'])
  
  const fileSize = computed(() => {
    if (!selectedFile.value) return ''
    const size = selectedFile.value.size / 1024 // Convert to KB
    return `${size.toFixed(0)} KB`
  })
  
  const triggerFileInput = () => {
    if (!selectedFile.value) {
      fileInput.value.click()
    }
  }
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      selectedFile.value = file
      emit('file-selected', file)
    }
  }
  
  const removeFile = () => {
    selectedFile.value = null
    fileInput.value.value = ''
    emit('file-removed')
  }
  
  const handleDragOver = (event) => {
    event.target.classList.add('border-primaryColor-300')
  }
  
  const handleDragLeave = (event) => {
    event.target.classList.remove('border-primaryColor-300')
  }
  
  const handleDrop = (event) => {
    event.target.classList.remove('border-primaryColor-300')
    const file = event.dataTransfer.files[0]
    if (file) {
      selectedFile.value = file
      emit('file-selected', file)
    }
  }
  </script>