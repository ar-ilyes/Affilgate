<template>
  <div class="p-6">

    <p class="text-3xl font-bold text-gray-800 mb-1">Marketplace</p>
    <p class="text-customGray-600 font-medium  mb-6">This remains the product list of all businesses</p>
    <PageHeader
      title="Welcome to marketplace"
      description="Discover all the products of other companies and get inspired"
    />
    
    <div class="mb-6">
      <div class="flex gap-4 w-1/4">
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
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from 'components/layout/PageHeader.vue'
import ProductCard from 'components/products/ProductCard.vue'
import Input from 'components/basic/Input.vue'
import Button from 'components/basic/Button.vue'

const searchQuery = ref('')

// Mock data - replace with actual API call
const products = ref([
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: 'images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  // Add more products...
])
</script>