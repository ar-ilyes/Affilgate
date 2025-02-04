<template>
    <div class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer border-[1px] border-grayCustom-100">
      <div class="relative">
        <!-- Badge container -->
        <div class="absolute top-2 right-[15%] z-10 flex gap-1 items-center">
          <div class="bg-primaryColor-200 rounded-full flex items-center overflow-hidden">
            <span class="px-3 py-0.5 text-xs text-primaryColor-700 font-medium">{{ product.da }} DA</span>
            <span class="bg-primaryColor-300 px-3 py-0.5 text-xs text-primaryColor-700 font-bold">{{ product.commission }}% de commission</span>
          </div>
        </div>
        
        <!-- Product image -->
          <img 
            :src="product.image" 
            :alt="product.title" 
            class="w-full h-42 object-contain rounded-lg"
          >
      </div>
  
      <!-- Product info -->
      <div class="mt-3">
        <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-gray-800">{{ product.title }}</h3>
            <div class="flex items-center gap-2">
                <span class=" text-sm px-3 py-0.5 bg-primaryColor-200 text-primaryColor-700 rounded-full">{{ product.categories[0] }}</span>
                <span class=" text-sm px-3 py-0.5 bg-primaryColor-200 text-primaryColor-700 rounded-full">+{{ product.categories.length-1 }}</span>
            </div>
        </div>
        <p class="text-gray-500 text-sm line-clamp-2 mb-2">{{ product.description }}</p>
        
        <div class="font-semibold text-xl">{{ product.price }} DA</div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    product: {
      type: Object,
      required: true,
      validator: (prop) => {
        return [
          'title',
          'description',
          'image',
          'da',
          'commission',
          'category',
          'price',
          'rating'
        ].every(key => key in prop)
      }
    }
  })
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>