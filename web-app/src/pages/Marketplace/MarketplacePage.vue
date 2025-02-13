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
        <!-- <Button 
          label="Filter" 
          icon="filter_alt" 
          variant="filled"
        /> -->
        <FilterButton 
          :applied-filters="appliedFiltersCount"
          @click="showFilterModal = true"
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

    <FilterModal
      v-model:model-value="showFilterModal"
      :initial-filters="filters"
      @apply="handleFilterApply"
    />
  </div>
</template>

<script setup>
import { ref , computed } from 'vue'
import PageHeader from 'components/layout/PageHeader.vue'
import ProductCard from 'components/products/ProductCard.vue'
import Input from 'components/basic/Input.vue'
import Button from 'components/basic/Button.vue'
import FilterButton from 'components/basic/FilterButton.vue'
import FilterModal from 'components/marketplace/FilterModal.vue'

const searchQuery = ref('')
const showFilterModal = ref(false)
const filters = ref({
  minPrice: null,
  maxPrice: null,
  commission: {
    min: 0,
    max: 100
  },
  categories: []
})

// Mock data - replace with actual API call
const products = ref([
  {
    id: 1,
    title: 'product title',
    description: 'High-quality wireless earbuds with noise cancellation',
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
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
    image: '/images/airpods.png',
    da: 40,
    commission: 20,
    categories: ['Electronics','test'],
    price: 200,
    rating: 4.5
  },
  // Add more products...
])
const appliedFiltersCount = computed(() => {
  let count = 0
  if (filters.value.minPrice || filters.value.maxPrice) count++
  if (filters.value.commission.min > 0 || filters.value.commission.max < 100) count++
  if (filters.value.categories.length > 0) count++
  return count
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    // Price filter
    if (filters.value.minPrice && product.price < filters.value.minPrice) return false
    if (filters.value.maxPrice && product.price > filters.value.maxPrice) return false
    
    // Commission filter
    if (product.commission < filters.value.commission.min || 
        product.commission > filters.value.commission.max) return false
    
    // Categories filter
    if (filters.value.categories.length > 0 && 
        !product.categories.some(cat => filters.value.categories.includes(cat.toLowerCase()))) return false
    
    // Search query
    if (searchQuery.value && !product.title.toLowerCase().includes(searchQuery.value.toLowerCase())) return false
    
    return true
  })
})

const handleFilterApply = (newFilters) => {
  filters.value = newFilters
}
</script>