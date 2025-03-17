<template>
  <div class="bg-white rounded-lg p-6 shadow-md w-full flex flex-col h-[90vh]">
    <div class="rounded-full mb-4">
      <img src="/images/rocket.png" alt="Marketing" />
    </div>
    <h1 class="text-2xl font-bold mb-2">Marketing preferences</h1>
    <p class="text-gray-600 mb-8">Add your marketing preferences</p>

    <!-- Scrollable Form Section -->
    <div class="flex-1 overflow-y-scroll w-full h-3/4 mb-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-gray-600 font-medium mb-2">
            What's your preferred product categories?
          </label>
          <q-select
            v-model="form.productCategories"
            :options="categoryOptions"
            outlined
            dense
            class="w-full"
            placeholder="Home appliance"
            emit-value
            map-options
            :error="!!errors.productCategories"
            :error-message="errors.productCategories"
            bg-color="white"
            dropdown-icon="expand_more"
          />
        </div>

        <div>
          <label class="block text-gray-600 font-medium mb-2">
            What's your target audience?
            <q-icon 
              name="help_outline" 
              size="xs" 
              class="text-gray-400 cursor-pointer"
              @click="showAudienceHelp = true"
            />
          </label>
          <q-select
            v-model="form.targetAudience"
            :options="audienceOptions"
            outlined
            dense
            class="w-full"
            placeholder="Students"
            emit-value
            map-options
            :error="!!errors.targetAudience"
            :error-message="errors.targetAudience"
            bg-color="white"
            dropdown-icon="expand_more"
          />
        </div>

        <div>
          <label class="block text-gray-600 font-medium mb-2">How did you hear about us?</label>
          <q-select
            v-model="form.referralSource"
            :options="referralOptions"
            outlined
            dense
            class="w-full"
            placeholder="Media"
            emit-value
            map-options
            bg-color="white"
            dropdown-icon="expand_more"
          />
        </div>

        <div>
          <label class="block text-gray-600 font-medium mb-2">Have you used an affiliate program before?</label>
          <div class="flex gap-4">
            <div 
              class="flex-1 p-4 rounded-lg cursor-pointer border-2 transition-all"
              :class="[
                form.hasUsedAffiliate === true 
                  ? 'border-primaryColor-500 bg-primaryColor-50' 
                  : 'border-gray-200 hover:border-gray-300'
              ]"
              @click="form.hasUsedAffiliate = true"
            >
              <div class="flex items-center gap-2">
                <div 
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  :class="[
                    form.hasUsedAffiliate === true 
                      ? 'border-primaryColor-500' 
                      : 'border-gray-300'
                  ]"
                >
                  <div 
                    v-if="form.hasUsedAffiliate === true"
                    class="w-3 h-3 rounded-full bg-primaryColor-500"
                  ></div>
                </div>
                <span :class="{'text-primaryColor-500': form.hasUsedAffiliate === true}">Yes</span>
              </div>
            </div>
            
            <div 
              class="flex-1 p-4 rounded-lg cursor-pointer border-2 transition-all"
              :class="[
                form.hasUsedAffiliate === false 
                  ? 'border-primaryColor-500 bg-primaryColor-50' 
                  : 'border-gray-200 hover:border-gray-300'
              ]"
              @click="form.hasUsedAffiliate = false"
            >
              <div class="flex items-center gap-2">
                <div 
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  :class="[
                    form.hasUsedAffiliate === false 
                      ? 'border-primaryColor-500' 
                      : 'border-gray-300'
                  ]"
                >
                  <div 
                    v-if="form.hasUsedAffiliate === false"
                    class="w-3 h-3 rounded-full bg-primaryColor-500"
                  ></div>
                </div>
                <span :class="{'text-primaryColor-500': form.hasUsedAffiliate === false}">No</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="form.hasUsedAffiliate">
          <Input
            v-model="form.affiliateProgram"
            label="What is it?"
            placeholder="Specify the affiliate program"
            :error="errors.affiliateProgram"
          />
        </div>
      </form>
    

      <div class=" mt-6 overflow-hidden w-full">
        <label class="block text-gray-600 font-medium mb-2">
          What platform do you usually use to sell your products?
        </label>
        <div class="w-full overflow-x-scroll mb-4">
          <div class="flex flex-row w-[1200px] gap-4 h-24 ">
            <div 
              v-for="platform in platforms" 
              :key="platform.value"
              class="border-2 w-52 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-center"
              :class="[
                form.platform === platform.value 
                  ? 'border-primaryColor-500 bg-primaryColor-50' 
                  : 'border-gray-200 hover:border-gray-300'
              ]"
              @click="form.platform = platform.value"
            >
              <img :src="platform.logo" :alt="platform.label" class="h-8 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="border-t pt-6 flex justify-between items-center mb-2">
      <Button
        label="Skip"
        variant="text"
        class="text-gray-500"
        @click="skipStep"
      />
      <div class="flex gap-4">
        <Button
          label="Back"
          variant="filled"
          @click="router.back()"
        />
        <Button
          label="Confirm"
          @click="handleSubmit"
          variant="filled"
          class="bg-primaryColor-500 text-white"
          :loading="loading"
        />
      </div>
    </div>

    <!-- Help Dialog -->
    <q-dialog v-model="showAudienceHelp">
      <q-card class="p-6">
        <h3 class="text-lg font-medium mb-2">Target Audience</h3>
        <p class="text-gray-600">
          Your target audience represents the specific group of consumers most likely to be interested in your products or services.
        </p>
        <div class="mt-4 flex justify-end">
          <Button 
            label="Got it" 
            variant="filled"
            @click="showAudienceHelp = false"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Input from 'components/basic/Input.vue'
import Button from 'components/basic/Button.vue'

const router = useRouter()
const loading = ref(false)
const showAudienceHelp = ref(false)

const categoryOptions = [
  { label: 'Home appliance', value: 'home-appliance' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' }
]

const audienceOptions = [
  { label: 'Students', value: 'students' },
  { label: 'Professionals', value: 'professionals' },
  { label: 'Parents', value: 'parents' }
]

const referralOptions = [
  { label: 'Media', value: 'media' },
  { label: 'Friend', value: 'friend' },
  { label: 'Search', value: 'search' }
]

const platforms = [
  { label: 'WooCommerce', value: 'woocommerce', logo: '/images/woo-commerce.png' },
  { label: 'Shopify', value: 'shopify', logo: '/images/shopify.png' },
  { label: 'ouedkniss', value: 'openkniss', logo: '/images/ouedkniss.png' },
  { label: 'YouCan', value: 'youcan', logo: '/images/youcan.png' },
  { label: 'marketplace', value: 'marketplace', logo: '/images/marketplace.png' },
]

const form = reactive({
  productCategories: '',
  targetAudience: '',
  referralSource: '',
  hasUsedAffiliate: null,
  affiliateProgram: '',
  platform: ''
})

const errors = reactive({
  productCategories: '',
  targetAudience: '',
  affiliateProgram: '',
  platform: ''
})

const handleSubmit = async () => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Validate
  if (!form.productCategories) errors.productCategories = 'Please select a category'
  if (!form.targetAudience) errors.targetAudience = 'Please select a target audience'
  if (form.hasUsedAffiliate && !form.affiliateProgram) {
    errors.affiliateProgram = 'Please specify the affiliate program'
  }

  if (Object.values(errors).some(error => error)) return

  try {
    loading.value = true
    // Handle form submission
    await router.push('/marketplace')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const skipStep = () => {
  router.push('/marketplace')
}
</script>