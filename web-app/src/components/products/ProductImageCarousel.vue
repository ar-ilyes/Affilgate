<template>
  <div class="relative w-[60%]">
    <!-- Main carousel -->
    <div class="relative">
      <div class="flex">
        <!-- Thumbnails -->
        <div class="flex flex-col mr-4 h-[232px] overflow-y-auto custom-scrollbar">
          <div class="flex flex-col gap-4">
            <div 
              v-for="(image, index) in images" 
              :key="index"
              class="w-16 h-16 bg-gray-50 rounded-lg cursor-pointer hover:border-2 hover:border-primaryColor-500 flex-shrink-0"
              :class="{ 'border-2 border-primaryColor-500': currentIndex === index }"
              @click="setCurrentImage(index)"
            >
              <img :src="image" :alt="`Product image ${index + 1}`" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        <!-- Main image -->
        <div class="relative bg-gray-50 rounded-lg w-[80%] h-fit flex items-center justify-center">
          <button 
            class="absolute left-2 z-10 bg-white rounded-full p-2 shadow-md"
            @click="previousImage"
          >
            <q-icon name="chevron_left" size="sm" />
          </button>
          
          <!-- Badge container -->
          <div class="absolute top-2 right-[35%] z-10">
            <div class="bg-primaryColor-200 rounded-full flex items-center overflow-hidden">
              <span class="px-3 py-0.5 text-xs text-primaryColor-700 font-medium">{{ da }} DA</span>
              <span class="bg-primaryColor-300 px-3 py-0.5 text-xs text-primaryColor-700 font-bold">{{ commission }}% de commission</span>
            </div>
          </div>
          <img :src="currentImage" :alt="title" class="w-full object-contain" />
          
          <button 
            class="absolute right-2 z-10 bg-white rounded-full p-2 shadow-md"
            @click="nextImage"
          >
            <q-icon name="chevron_right" size="sm" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  da: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  }
})

const currentIndex = ref(0)

const currentImage = computed(() => props.images[currentIndex.value])

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const previousImage = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
}

const setCurrentImage = (index) => {
  currentIndex.value = index
}
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