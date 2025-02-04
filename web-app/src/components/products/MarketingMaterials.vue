<template>
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Marketing materials</h2>
      
      <!-- Tabs -->
      <div class="mb-6">
        <div class="flex gap-8 bg-white w-fit px-4 py-2 rounded-xl border-[1px] border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-6 py-2 rounded-lg relative text-lg"
            :class="[
              currentTab === tab.value 
                ? 'text-gray-800 bg-white shadow-primaryColor-200 shadow-[0_0_10px_rgba(0,0,0,0.1)] font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
            @click="currentTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
  
      <!-- Files Tab -->
      <div v-if="currentTab === 'files'" class="overflow-y-auto custom-scrollbar max-h-[400px]">
        <div class="grid grid-cols-7 gap-4">
          <div 
            v-for="file in files" 
            :key="file.name"
            class=" bg-primaryColor-50/50 border-[1px] rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-primaryColor-100 transition-all duration-200"
          >
            <!-- <q-icon 
              :name="file.type === 'pdf' ? 'picture_as_pdf' : file.type === 'doc' ? 'description' : 'video_library'"
              size="md"
              class="text-primaryColor-500"
            /> -->
            <img :src="(file.type === 'pdf' || file.type ==='doc') ? '/images/file.png' : '/images/video.png'" class=" w-10" alt="">
            <span class="text-xs text-gray-700 text-center">{{ file.name }}</span>
          </div>
        </div>
      </div>
  
      <!-- Links Tab -->
      <div v-if="currentTab === 'links'" class="overflow-y-auto custom-scrollbar max-h-[300px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(link, index) in links" 
            :key="index"
            class="flex items-center gap-2"
          >
            <q-icon name="link" size="sm" class="text-primaryColor-500" />
            <span class="text-gray-700">{{ link.platform }}</span>
            <a 
              :href="link.url" 
              target="_blank" 
              class="text-primaryColor-500 hover:underline"
            >
              {{ link.url }}
            </a>
          </div>
        </div>
      </div>
  
      <!-- Guidelines Tab -->
      <div v-if="currentTab === 'guidelines'" class="prose max-w-none">
        <div class="p-6  rounded-lg border border-gray-200">
          <p class="text-gray-600">{{ guidelines }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    files: {
      type: Array,
      default: () => []
    },
    links: {
      type: Array,
      default: () => []
    },
    guidelines: {
      type: String,
      default: ''
    }
  })
  
  const tabs = [
    { label: 'Files', value: 'files' },
    { label: 'Links', value: 'links' },
    { label: 'Guidelines', value: 'guidelines' }
  ]
  
  const currentTab = ref('files')
  </script>
  
  <style scoped>
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #f97316 #ffedd5;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #ffedd5;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #f97316;
    border-radius: 3px;
  }
  </style>