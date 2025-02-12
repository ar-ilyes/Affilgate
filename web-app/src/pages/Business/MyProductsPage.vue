<template>
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-1">My products</h1>
          <p class="text-customGray-600 font-medium">This remains my products list</p>
        </div>
        <Button 
          label="Add product" 
          icon="add"
          variant="filled"
          class="bg-primaryColor-500"
          @click="addProduct"
        />
      </div>
  
      <!-- Search and Filter -->
      <div class="flex gap-4 mb-6">
        <Input
          v-model="searchQuery"
          placeholder="Search for a product"
          class="w-64"
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
  
      <!-- Products Table -->
      <ProductsTable
        :products="products"
        @preview="previewProduct"
        @edit="editProduct"
        @delete="deleteProduct"
        @history="showHistory"
        @page-change="handlePageChange"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProductsTable from 'components/products/ProductsTable.vue'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  
  const searchQuery = ref('')
  
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
  
  const showHistory = (product) => {
    // Implement history logic
  }
  
  const handlePageChange = (page) => {
    // Implement pagination logic
    console.log('Page changed to:', page)
  }
  </script>