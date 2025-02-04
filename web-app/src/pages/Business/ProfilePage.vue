<template>
    <div class="p-6">
      <p class="text-3xl font-bold text-gray-800 mb-1">Profile</p>
  
      <!-- Company Header Section -->
      <div class="relative mb-6">
        <!-- Banner -->
        <div class="h-44 w-full bg-primaryColor-300 rounded-lg pattern-bg"></div>
        <!-- Join Date -->
        <div class="mb-4 text-gray-500 float-right">
            On platform since {{ company.joinDate }}
        </div>
        
        <!-- Company Info Overlay -->
        <div class="absolute -bottom-16 left-6 flex  items-end">
          <!-- Company Logo -->
          <div class=" w-36 h-36 bg-navy-900 rounded-lg flex items-center justify-center ">
            <img src="images/brainiac.png" alt="Company logo" class=" w-36" />
          </div>
        </div>
      </div>
  
      <!-- Company Details Section -->
      <div class="mt-20 mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-1">{{ company.name }}</h1>
        <a :href="company.website" target="_blank" class="text-primaryColor-500 hover:underline mb-2 block">
          {{ company.website }}
        </a>
        <p class="text-gray-600 mb-4">{{ company.location }}</p>
        
        <!-- Bio Section -->
        <div class="bg-primaryColor-50 rounded-lg px-6 py-4 mb-8">
          <h2 class="font-bold text-xl text-gray-800 mb-2">Bio</h2>
          <p class="text-gray-600">{{ company.bio }}</p>
        </div>
      </div>
  
      <!-- Products Section -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800">Products ({{ products.length }})</h2>
          <div class="flex gap-4">
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
        </div>
  
        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProductCard from 'components/products/ProductCard.vue'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  
  const searchQuery = ref('')
  
  // Mock company data
  const company = {
    name: 'Business name',
    website: 'www.website.com',
    location: 'Algiers, Algeria',
    joinDate: '09-11-2024',
    bio: 'Lorem ipsum dolor sit amet consectetur. Vitae adipiscing nunc facilisis lorem enim euismod. Mauris sit commodo est tellus purus cursus. Egestas sit enim diam sit consectetur. Metus ornare cursus in gravida cras arcu'
  }
  
  // Mock products data - using the same structure as marketplace
  const products = ref([
    {
      id: 1,
      title: 'Product title',
      description: 'Lorem ipsum dolor sit amet consectetur. Fusce commodo...',
      image: 'images/airpods.png',
      da: 40,
      commission: 20,
      categories: ['Electronics', 'test'],
      price: 200,
      rating: 4.5
    },
    // ... Add more products
  ])
  </script>
  
  <style scoped>
  .pattern-bg {
    background-image: url('images/profileMosaique.svg');
  }
  </style>