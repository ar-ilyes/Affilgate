<template>
    <div class="p-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <router-link 
          to="/my-products" 
          class="hover:text-primaryColor-500"
        >
          My products
        </router-link>
        <span>></span>
        <span>Product details</span>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Product Images and Info -->
        <div class="lg:col-span-2">
          <div class="flex">
            <ProductImageCarousel
              :images="product.images"
              :title="product.title"
              :da="product.da"
              :commission="product.commission"
            />
      
            <div class="w-[40%]">
              <div class="mb-5">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="font-bold text-sm text-primaryColor-500 mb-1">{{ product.type }}</p>
                    <h1 class="text-2xl font-bold text-gray-800 mb-1">{{ product.title }}</h1>
                    <div class="text-xl font-bold text-gray-700 mb-2">
                      {{ product.price }} DA
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <Button
                      icon="edit"
                      variant="outline"
                      class="!min-h-0 !h-9"
                    />
                    <Button
                      icon="delete"
                      variant="outline"
                      color="red"
                      class="!min-h-0 !h-9"
                    />
                  </div>
                </div>
                <div class="flex gap-2">
                  <span 
                    v-for="category in product.categories" 
                    :key="category"
                    class="text-sm px-3 py-0.5 bg-primaryColor-200 text-primaryColor-700 rounded-full"
                  >
                    {{ category }}
                  </span>
                </div>
              </div>
      
              <p class="text-gray-600 mb-4 border-[1px] p-4 rounded-lg">
                {{ showMore ? product.description : product.description.slice(0, 150) + '...' }}
                <button 
                  class="text-primaryColor-500 hover:underline ml-2"
                  @click="showMore = !showMore"
                >
                  {{ showMore ? 'see less' : 'see more' }}
                </button>
              </p>
            </div>
          </div>
  
          <!-- Marketing Materials -->
          <MarketingMaterials
            :files="marketingMaterials.files"
            :links="marketingMaterials.links"
            :guidelines="marketingMaterials.guidelines"
            class="mt-8"
          />
        </div>
  
        <!-- Update History -->
        <div class="lg:col-span-1">
          <ProductUpdateHistory />
        </div>
      </div>
  
      <!-- Related Products -->
      <div class="mt-12">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Related products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in relatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProductImageCarousel from 'components/products/ProductImageCarousel.vue'
  import MarketingMaterials from 'components/products/MarketingMaterials.vue'
  import ProductCard from 'components/products/ProductCard.vue'
  import ProductUpdateHistory from 'components/products/ProductUpdateHistory.vue'
  import Button from 'components/basic/Button.vue'
  
  const showMore = ref(false)
  
  // Mock data 
  const product = ref({
    id: 1,
    type: 'Physical product',
    title: 'Product title',
    description: 'Lorem ipsum dolor sit amet consectetur. Fusce commodo Lorem ipsum dolor sit amet consectetur. Fusce commodo Lorem ipsum dolor sit amet consectetur. Fusce commodo Lorem ipsum dolor sit amet consectetur. Vitae adipiscing nunc facilisis lorem enim euismod. delivery options : standard delivery',
    images: [
      '/images/airpods.png',
      '/images/airpods.png',
      '/images/airpods.png',
      '/images/airpods.png',
      '/images/airpods.png',
      '/images/airpods.png',
    ],
    da: 40,
    commission: 20,
    categories: ['Category 1', 'Category 2'],
    price: 200,
  })
  
  const marketingMaterials = ref({
    files: [
      { name: 'Brochure.pdf', type: 'pdf' },
      { name: 'Brochure.doc', type: 'doc' },
      { name: 'Presentation.vid', type: 'video' },
      { name: 'Brochure.pdf', type: 'pdf' },
      { name: 'Presentation.vid', type: 'video' },
      { name: 'Brochure.pdf', type: 'pdf' },
      { name: 'Presentation.vid', type: 'video' }
    ],
    links: [
      { platform: 'Instagram', url: 'www.website.com' },
      { platform: 'Tiktok', url: 'www.website.com' },
      { platform: 'Instagram', url: 'www.website.com' },
      { platform: 'Tiktok', url: 'www.website.com' }
    ],
    guidelines: 'Lorem ipsum dolor sit amet consectetur. Vitae adipiscing nunc facilisis lorem enim euismod. Mauris sit commodo est tellus purus cursus. Egestas sit enim diam sit consectetur. Metus ornare cursus in gravida cras arcu'
  })
  
  const relatedProducts = ref([
    {
      id: 1,
      title: 'Product title',
      description: 'Lorem ipsum dolor sit amet consectetur. Fusce commodo...',
      image: '/images/airpods.png',
      da: 40,
      commission: 20,
      categories: ['Electronics', 'test'],
      price: 200,
      rating: 4.5
    },
    // Add more related products...
  ])
  </script>