<template>
    <div class="p-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <router-link 
          to="/products" 
          class="hover:text-primaryColor-500"
        >
          My products
        </router-link>
        <span>></span>
        <span>Create a product</span>
      </div>
  
      <div class=" flex items-start rounded-lg bg-[#fefeff] py-6 px-2 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
      <!-- Steps -->
      <div class="flex flex-col items-center gap-6 mt-16 w-1/4">
        <div class="flex items-center gap-2">
            <img src="/images/not-selected-line.png" alt="step1">
          <span class="text-primaryColor-700 text-base">Product information</span>
        </div>
        <div class="flex items-center gap-2">
            <img src="/images/selected-line.png" alt="step1">
          <span class="text-primaryColor-500 font-bold text-base">Marketing materials</span>
        </div>
        
      </div>
  
      <form @submit.prevent="handleSubmit" class="max-w-5xl w-full">
        <!-- Files Section -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add Post(s)/brochure(s)</h3>
          <div class="space-y-4">
            <div v-for="(file, index) in formData.files" :key="index" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title {{ index + 1 }}</label>
                <Input
                  v-model="file.title"
                  placeholder="Title"
                  class="w-full"
                />
              </div>
              <div class="flex items-end gap-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Link {{ index + 1 }}</label>
                  <div class="flex items-center gap-2">
                    <div class="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <q-icon name="description" size="sm" class="text-primaryColor-500" />
                      <span class="text-sm text-gray-700 truncate">{{ file.name || 'No file selected' }}</span>
                    </div>
                    <Button 
                      v-if="!file.name"
                      label="Upload file" 
                      variant="outlined"
                      @click="triggerFileInput(index)"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="text-red-500 hover:text-red-600"
                  @click="removeFile(index)"
                >
                  <q-icon name="close" size="sm" />
                </button>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            class="mt-4 text-primaryColor-500 hover:text-primaryColor-600 flex items-center gap-1"
            @click="addFile"
          >
            <q-icon name="add" size="sm" />
            Add another file
          </button>
        </div>
  
        <!-- Links Section -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add link(s)</h3>
          <div class="space-y-4">
            <div v-for="(link, index) in formData.links" :key="index" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Link title</label>
                <Input
                  v-model="link.title"
                  placeholder="Title"
                  class="w-full"
                />
              </div>
              <div class="flex items-end gap-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Link {{ index + 1 }}</label>
                  <div class="flex gap-2">
                    <Input
                      v-model="link.protocol"
                      class="w-20"
                      placeholder="http"
                    />
                    <Input
                      v-model="link.url"
                      class="flex-1"
                      placeholder="www."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="text-red-500 hover:text-red-600"
                  @click="removeLink(index)"
                >
                  <q-icon name="close" size="sm" />
                </button>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            class="mt-4 text-primaryColor-500 hover:text-primaryColor-600 flex items-center gap-1"
            @click="addLink"
          >
            <q-icon name="add" size="sm" />
            Add another link
          </button>
        </div>
  
        <!-- Guidelines -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Guidelines</h3>
          <q-input
            v-model="formData.guidelines"
            type="textarea"
            outlined
            class="w-full"
            rows="4"
            placeholder="Put your guidelines here"
          />
        </div>
  
        <!-- Actions -->
        <div class="flex justify-between">
          <Button 
            label="Back" 
            variant="outlined"
            @click="router.push('/products/create')"
          />
          <Button 
            label="Save" 
            type="submit"
            variant="filled"
          />
        </div>
      </form>
    </div>
  
      <input
        v-for="(_, index) in formData.files"
        :key="index"
        :ref="el => fileInputs[index] = el"
        type="file"
        class="hidden"
        @change="handleFileSelect($event, index)"
      >
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  const fileInputs = ref([])
  
  const formData = ref({
    files: [{ title: '', name: '', file: null }],
    links: [{ title: '', protocol: 'http', url: '' }],
    guidelines: ''
  })
  
  const addFile = () => {
    formData.value.files.push({ title: '', name: '', file: null })
  }
  
  const removeFile = (index) => {
    formData.value.files.splice(index, 1)
  }
  
  const addLink = () => {
    formData.value.links.push({ title: '', protocol: 'http', url: '' })
  }
  
  const removeLink = (index) => {
    formData.value.links.splice(index, 1)
  }
  
  const triggerFileInput = (index) => {
    fileInputs.value[index]?.click()
  }
  
  const handleFileSelect = (event, index) => {
    const file = event.target.files[0]
    if (file) {
      formData.value.files[index].name = file.name
      formData.value.files[index].file = file
    }
  }
  
  const handleSubmit = () => {
    // Here you would typically save the marketing materials
    // For now, we'll just console.log the data
    console.log(formData.value)
    router.push('/products')
  }
  </script>