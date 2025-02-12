<template>
    <div class="p-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <router-link 
          to="/products" 
          class="hover:text-primaryColor-500"
        >
          My products
        </router-link>
        <span>></span>
        <span class="text-gray-400">Create a product</span>
      </div>
  
      <div class=" flex items-start rounded-lg bg-[#fefeff] py-6 px-2 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
      <!-- Steps -->
      <div class="flex flex-col items-center gap-6 mt-16 w-1/4">
        <div class="flex items-center gap-2">
            <img src="/images/selected-line.png" alt="step1">
          <span class="text-primaryColor-500 font-bold text-base">Product information</span>
        </div>
        <div class="flex items-center gap-2">
            <img src="/images/not-selected-line.png" alt="step1">
          <span class="text-gray-400 text-base">Marketing materials</span>
        </div>
      </div>
  
      <div class="max-w-5xl w-full">
        <h1 class="text-2xl font-semibold text-gray-900 mb-8">Product information</h1>
  
        <form @submit.prevent="handleSubmit">
          <!-- Product Images -->
          <div class="bg-primaryColor-50 rounded-lg p-8 mb-8 border-[1px] border-dashed border-primaryColor-200">
            <ProductImageUpload
              v-model="formData.images"
              :mainImageIndex="formData.mainImageIndex"
              @update:mainImage="updateMainImage"
            />
          </div>
  
          <!-- Product Details -->
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Product link
                  <q-icon 
                    name="help_outline" 
                    size="xs" 
                    class="text-gray-400 ml-1 cursor-pointer"
                    @click="showLinkHelp = true"
                  />
                </label>
                <Input
                  v-model="formData.productLink"
                  placeholder="e.g., https://www.productLink"
                  class="w-full"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product name</label>
                <Input
                  v-model="formData.productName"
                  placeholder="Product name"
                  class="w-full"
                />
              </div>
            </div>
  
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <q-select
                  v-model="formData.type"
                  :options="typeOptions"
                  outlined
                  dense
                  class="w-full"
                  placeholder="Physical"
                  emit-value
                  map-options
                  borderless
                  bg-color="white"
                  input-class="cursor-pointer"
                  dropdown-icon="expand_more"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <q-select
                  v-model="formData.category"
                  :options="categoryOptions"
                  outlined
                  dense
                  class="w-full"
                  placeholder="Select a category"
                  emit-value
                  map-options
                  borderless
                  bg-color="white"
                  input-class="cursor-pointer"
                  dropdown-icon="expand_more"
                />
              </div>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <q-input
                v-model="formData.description"
                type="textarea"
                outlined
                class="w-full"
                placeholder="Description here"
                rows="4"
                bg-color="white"
                borderless
              />
            </div>
  
            <!-- Pricing -->
            <div class="pt-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Price (DA)</label>
                  <Input
                    v-model="formData.price"
                    type="text"
                    class="w-full"
                    placeholder="20 000"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Commission (%)</label>
                  <Input
                    v-model="formData.commission"
                    type="text"
                    class="w-full"
                    placeholder="20%"
                  />
                  <div class="flex justify-between mt-2 text-sm">
                    <span class="text-gray-400">After commission {{ calculateAfterCommission }} DA</span>
                    <span class="text-gray-400">In dinar {{ calculateInDinar }} DA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="mt-8 flex justify-end">
            <Button 
              label="Continue" 
              type="submit"
              variant="filled"
              class="w-32 bg-primaryColor-500 hover:bg-primaryColor-600 text-white font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  
      <!-- Help Dialog -->
      <q-dialog v-model="showLinkHelp">
        <q-card class="p-6 w-96">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Product Link Help</h3>
          <p class="text-gray-600">
            Enter the direct URL to your product. This link will be used for tracking and analytics.
          </p>
          <div class="mt-4 flex justify-end">
            <Button 
              label="Got it" 
              variant="filled"
              @click="showLinkHelp = false"
            />
          </div>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  import ProductImageUpload from './ProductImageUpload.vue'
  
  const router = useRouter()
  const showLinkHelp = ref(false)
  
  const formData = ref({
    images: [],
    mainImageIndex: null,
    productLink: '',
    productName: '',
    type: null,
    category: null,
    description: '',
    price: null,
    commission: null
  })
  
  const typeOptions = [
    { label: 'Physical', value: 'physical' },
    { label: 'Digital', value: 'digital' }
  ]
  
  const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Home', value: 'home' }
  ]
  
  const calculateAfterCommission = computed(() => {
    if (!formData.value.price || !formData.value.commission) return 0
    return formData.value.price * (1 - formData.value.commission / 100)
  })
  
  const calculateInDinar = computed(() => {
    return calculateAfterCommission.value * 0.25 // Example conversion rate
  })
  
  const updateMainImage = (index) => {
    formData.value.mainImageIndex = index
  }
  
  const handleSubmit = () => {
    // Here you would typically validate the form and save the data
    // For now, we'll just navigate to the next step
    router.push('/products/create/marketing')
  }
  </script>
  
  <style>
  .q-field--outlined .q-field__control {
    border-radius: 0.5rem;
    border: 1px solid #E5E7EB;
    min-height: 42px;
  }
  
  .q-field--outlined .q-field__control:hover {
    border-color: #D1D5DB;
  }
  
  .q-field--outlined.q-field--focused .q-field__control {
    border-color: #F97316;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }
  </style>