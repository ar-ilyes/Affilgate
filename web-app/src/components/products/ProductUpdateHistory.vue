<template>
    <div class="bg-white rounded-lg">
      <h3 class="text-lg font-bold text-gray-800 mb-6">Price/ commission updates history</h3>
      
      <div class="space-y-6 max-h-[600px] overflow-y-auto pr-2">
        <!-- Price Update - Pending -->
        <div class="border border-primaryColor-200 rounded-lg p-4">
          <div class="flex justify-between mb-2">
            <span class="font-medium">Price update</span>
            <span class="text-gray-500">11-08-2024</span>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">New price</span>
              <span>2 500 DA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Original price</span>
              <span>2 000 DA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Commission</span>
              <span>20%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Status</span>
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-primaryColor-500"></span>
                <span class="text-primaryColor-500">Pending</span>
              </span>
            </div>
          </div>
          <div class="mt-3 text-sm text-gray-600">
            Our team is reviewing your update. We'll notify you once it's complete
          </div>
        </div>
  
        <!-- Price Update - Rejected -->
        <div class="border border-gray-100 rounded-lg p-4">
          <div class="flex justify-between mb-2">
            <span class="font-medium">Price update</span>
            <span class="text-gray-500">11-08-2024</span>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">New price</span>
              <span>2 500 DA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Original price</span>
              <span>2 000 DA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Commission</span>
              <span>20%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Status</span>
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span class="text-red-500">Rejected</span>
              </span>
            </div>
          </div>
          <div class="mt-3">
            <p class="text-sm text-gray-500">Reason of rejection</p>
            <p class="text-sm text-gray-700">The price is too expensive compared to the previous price</p>
          </div>
        </div>
  
        <!-- Commission Update - Accepted -->
        <div class="border border-gray-100 rounded-lg p-4">
          <div class="flex justify-between mb-2">
            <span class="font-medium">Commission update</span>
            <span class="text-gray-500">11-08-2024</span>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">New commission</span>
              <span>25%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Original commission</span>
              <span>20%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Price</span>
              <span>2 500 DA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Status</span>
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span class="text-green-500">Accepted</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No data needed as it's all hardcoded for the example
  </script>
  
  <style scoped>
  /* Custom scrollbar styling */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #f97316 #fff;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #fff;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #f97316;
    border-radius: 6px;
    border: 2px solid #fff;
  }
  </style>