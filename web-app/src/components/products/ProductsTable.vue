<template>
    <div class="bg-white rounded-lg">
      <!-- Table Header -->
      <div class="grid grid-cols-[300px_250px_250px_250px_200px_50px] px-6 py-4 border-b border-gray-100">
        <div class="font-medium text-gray-600">Product name</div>
        <div class="font-medium text-gray-600">Status</div>
        <div class="font-medium text-gray-600">Category</div>
        <div class="font-medium text-gray-600">Price</div>
        <div class="font-medium text-gray-600">Commission</div>
        <div></div>
      </div>
  
      <!-- Table Body -->
      <div class="divide-y divide-gray-100">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="grid grid-cols-[300px_250px_250px_250px_200px_50px] px-6 py-4 items-center hover:bg-gray-50"
        >
          <!-- Product Name & Image -->
          <div class="flex items-center gap-3">
            <img :src="product.image" :alt="product.name" class="w-10 h-10 rounded-lg object-cover bg-gray-100" />
            <span class="font-medium text-gray-800">{{ product.name }}</span>
          </div>
  
          <!-- Status -->
          <div>
            <span 
              class="px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5"
              :class="{
                'bg-green-50 text-green-700': product.status === 'Active',
                'bg-gray-50 text-gray-700': product.status === 'Inactive',
                'bg-orange-50 text-orange-700': product.status === 'Pending',
                'bg-red-50 text-red-700': product.status === 'Rejected'
              }"
            >
              <span 
                class="w-1.5 h-1.5 rounded-full"
                :class="{
                  'bg-green-500': product.status === 'Active',
                  'bg-gray-500': product.status === 'Inactive',
                  'bg-orange-500': product.status === 'Pending',
                  'bg-red-500': product.status === 'Rejected'
                }"
              ></span>
              {{ product.status }}
            </span>
          </div>
  
          <!-- Categories -->
          <div class="flex gap-2">
            <span class="text-sm px-3 py-0.5 bg-primaryColor-50 text-primaryColor-700 rounded-full">
              {{ product.category }}
            </span>
            <span v-if="product.additionalCategories" class="text-sm px-3 py-0.5 bg-primaryColor-50 text-primaryColor-700 rounded-full">
              +{{ product.additionalCategories }}
            </span>
          </div>
  
          <!-- Price -->
          <div class="text-gray-800">{{ product.price }} DA</div>
  
          <!-- Commission -->
          <div class="flex items-center gap-2">
            <span class="text-gray-800">{{ product.commission }} DA</span>
            <span class="text-sm px-2 py-0.5 bg-primaryColor-50 text-primaryColor-700 rounded-full">
              {{ product.commissionPercentage }}%
            </span>
          </div>
  
          <!-- Actions -->
          <div class="relative">
            <q-btn
              flat
              round
              dense
              icon="more_horiz"
              class="text-gray-500"
              @click="openActionsMenu($event, product)"
            />
          </div>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <button 
          class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Previous
        </button>
  
        <div class="flex items-center gap-2">
          <button 
            v-for="page in displayedPages" 
            :key="page"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            :class="currentPage === page ? 'bg-primaryColor-500 text-white' : 'text-gray-600 hover:bg-gray-50'"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span v-if="hasMorePages" class="text-gray-400">...</span>
        </div>
  
        <button 
          class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  
    <!-- Actions Menu -->
    <q-menu
      v-model="showActionsMenu"
      :target="actionMenuTarget"
      anchor="bottom right"
      self="top right"
      class="bg-white rounded-lg shadow-lg"
    >
      <q-list style="min-width: 150px">
        <q-item clickable v-close-popup @click="previewProduct(selectedProduct)">
          <q-item-section>
            <div class="flex items-center gap-2 text-gray-700">
              <q-icon name="visibility" size="xs" />
              <span>Preview</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="editProduct(selectedProduct)">
          <q-item-section>
            <div class="flex items-center gap-2 text-gray-700">
              <q-icon name="edit" size="xs" />
              <span>Edit</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="showHistory(selectedProduct)">
          <q-item-section>
            <div class="flex items-center gap-2 text-gray-700">
              <q-icon name="history" size="xs" />
              <span>History</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="deleteProduct(selectedProduct)">
          <q-item-section>
            <div class="flex items-center gap-2 text-red-600">
              <q-icon name="delete" size="xs" />
              <span>Delete</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    products: {
      type: Array,
      required: true
    }
  })
  
  const emit = defineEmits(['preview', 'edit', 'delete', 'history', 'page-change'])
  
  // Pagination
  const currentPage = ref(1)
  const totalPages = ref(10)
  const pagesPerGroup = 5
  
  // Actions menu
  const showActionsMenu = ref(false)
  const actionMenuTarget = ref(null)
  const selectedProduct = ref(null)
  
  // Computed pagination pages
  const displayedPages = computed(() => {
    const pages = []
    const start = Math.max(1, currentPage.value - Math.floor(pagesPerGroup / 2))
    const end = Math.min(totalPages.value, start + pagesPerGroup - 1)
  
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  
    return pages
  })
  
  const hasMorePages = computed(() => {
    return displayedPages.value[displayedPages.value.length - 1] < totalPages.value
  })
  
  // Methods
  const openActionsMenu = (event, product) => {
    actionMenuTarget.value = event.target
    selectedProduct.value = product
    showActionsMenu.value = true
  }
  
  const previewProduct = (product) => {
    emit('preview', product)
  }
  
  const editProduct = (product) => {
    emit('edit', product)
  }
  
  const deleteProduct = (product) => {
    emit('delete', product)
  }
  
  const showHistory = (product) => {
    emit('history', product)
  }
  
  const goToPage = (page) => {
    currentPage.value = page
    emit('page-change', page)
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      goToPage(currentPage.value + 1)
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      goToPage(currentPage.value - 1)
    }
  }
  </script>