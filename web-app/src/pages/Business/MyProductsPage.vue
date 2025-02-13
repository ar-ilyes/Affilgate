<template>
  <div class="p-6">
      <div class="mb-5">
        <h1 class="text-3xl font-bold text-gray-800 mb-1">My products</h1>
        <p class="text-customGray-600 font-medium">This remains my products list</p>
      </div>
      

    <!-- Search and Filter -->
    <div class="flex items-center justify-between mb-6">

    <div class="flex gap-4 w-1/4 mb-6">
      <Input
        v-model="searchQuery"
        placeholder="Search for a product"
        class="flex-1"
      >
        <template #prepend>
          <q-icon name="search" class="text-gray-400" />
        </template>
      </Input>
      <Button 
        label="Filter" 
        icon="filter_alt" 
        variant="filled"
      />
    </div>
    <Button 
        label="Add product" 
        icon="fa fa-box"
        variant="filled"
        class="bg-primaryColor-500 text-white"
        @click="addProduct"
      />
    </div>


    <!-- Table and History Section -->
    <div class="flex relative">
      <!-- Products Table Container -->
      <div class="flex-1">
        <ProductsTable
          :products="products"
          @preview="previewProduct"
          @edit="editProduct"
          @delete="deleteProduct"
          @history="showHistoryPanel"
          @page-change="handlePageChange"
        />
      </div>

      <!-- History Panel -->
      <div 
        v-if="showHistory" 
        class="fixed right-0 w-[400px] bg-white shadow-lg transition-transform duration-300 transform h-full"
        :class="{ 'translate-x-0': showHistory, 'translate-x-full': !showHistory }"
        style="top: var(--table-top)"
      >
        <div class="absolute top-2 left-[-1.5rem] rounded-full bg-white shadow-md h-10 w-10 flex justify-center items-center"> 
          <Button 
            icon="chevron_right"
            variant="text"
            @click="showHistory = false"
            class=" text-black w-10 h-10"
          />
        </div>
        <div class="h-3/4 w-full">
          <ProductUpdateHistory height=" h-[85%]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductsTable from 'components/products/ProductsTable.vue'
import ProductUpdateHistory from 'components/products/ProductUpdateHistory.vue'
import Input from 'components/basic/Input.vue'
import Button from 'components/basic/Button.vue'

const searchQuery = ref('')
const showHistory = ref(false)
const selectedProduct = ref(null)

// Calculate and set the table top position for the history panel
onMounted(() => {
  const tableElement = document.querySelector('.q-table')
  if (tableElement) {
    const tableTop = tableElement.getBoundingClientRect().top
    document.documentElement.style.setProperty('--table-top', `${tableTop}px`)
  }
})

// Mock data - replace with API call later
const products = ref([
  {
    id: 1,
    name: 'Product title',
    image: 'images/airpods.png',
    status: 'Active',
    category: 'Category',
    additionalCategories: 5,
    price: '20 000',
    commission: '16 000',
    commissionPercentage: 20,
    showMenu: false
  },
  {
    id: 2,
    name: 'Product title',
    image: 'images/airpods.png',
    status: 'Inactive',
    category: 'Category',
    additionalCategories: 5,
    price: '20 000',
    commission: '16 000',
    commissionPercentage: 20,
    showMenu: false
  },
  {
    id: 3,
    name: 'Product title',
    image: 'images/airpods.png',
    status: 'Pending',
    category: 'Category',
    additionalCategories: 5,
    price: '20 000',
    commission: '16 000',
    commissionPercentage: 20,
    showMenu: false
  },
  {
    id: 4,
    name: 'Product title',
    image: 'images/airpods.png',
    status: 'Rejected',
    category: 'Category',
    additionalCategories: 5,
    price: '20 000',
    commission: '16 000',
    commissionPercentage: 20,
    showMenu: false
  }
])

const addProduct = () => {
  // Implement add product logic
}

const previewProduct = (product) => {
  // Implement preview logic
}

const editProduct = (product) => {
  // Implement edit logic
}

const deleteProduct = (product) => {
  // Implement delete logic
}

const showHistoryPanel = (product) => {
  selectedProduct.value = product
  showHistory.value = true
}

const handlePageChange = (page) => {
  // Implement pagination logic
  console.log('Page changed to:', page)
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>