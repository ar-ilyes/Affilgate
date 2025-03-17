<template>
    <div class="bg-white rounded-lg p-8 shadow-md w-full">
      <div class="rounded-full mb-4">
        <img src="/images/business-info.png" alt="Business" />
      </div>
      <h1 class="text-2xl font-bold mb-2">Business information</h1>
      <p class="text-gray-600 mb-8">Enter your business information</p>
  
      <form @submit.prevent="handleSubmit">
        <Input
          v-model="form.companyName"
          label="Company name*"
          placeholder="e.g., ABC Corp"
          :error="errors.companyName"
          class="mb-4"
        />
  
        <div class="mb-4">
          <label class="block text-gray-600 font-medium mb-2">Niche</label>
          <q-select
            v-model="form.niche"
            :options="nicheOptions"
            outlined
            dense
            class="w-full"
            placeholder="e.g., Teenagers"
            emit-value
            map-options
            :error="!!errors.niche"
            :error-message="errors.niche"
            bg-color="white"
            dropdown-icon="expand_more"
          />
        </div>
  
        <Input
          v-model="form.creationDate"
          label="Creation date"
          type="date"
          :error="errors.creationDate"
          class="mb-4"
        />
  
        <div class="mb-4">
          <label class="block text-gray-600 font-medium mb-2">Website URL*</label>
          <div class="flex bg-[#f3f4f6] ">
            <div class="bg-gray-50 px-3 py-2 rounded-l-lg border border-r-0 border-gray-200">
              <span class="text-gray-500">http</span>
            </div>
            <Input
              v-model="form.website"
              placeholder="e.g., example.com"
              :error="errors.website"
              class="flex-1 rounded-l-none"
            />
          </div>
        </div>
  
        <div class="mb-8">
          <label class="block text-gray-600 font-medium mb-2">Socials</label>
          <div class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <img src="/images/instagram.png" alt="Instagram" class="w-5 h-5" />
            <Input
              v-model="form.instagram"
              placeholder="Instagram link"
              :error="errors.instagram"
              class="flex-1 border-0 bg-transparent"
            />
          </div>
        </div>
  
        <div class="flex justify-between">
          <Button
            label="Back"
            variant="text"
            @click="router.back()"
          />
          <Button
            label="Next"
            type="submit"
            variant="filled"
            class="bg-primaryColor-500 text-white"
            :loading="loading"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  
  const router = useRouter()
  const loading = ref(false)
  
  const nicheOptions = [
    { label: 'Teenagers', value: 'teenagers' },
    { label: 'Adults', value: 'adults' },
    { label: 'Seniors', value: 'seniors' }
  ]
  
  const form = reactive({
    companyName: '',
    niche: '',
    creationDate: '',
    website: '',
    instagram: ''
  })
  
  const errors = reactive({
    companyName: '',
    niche: '',
    creationDate: '',
    website: '',
    instagram: ''
  })
  
  const handleSubmit = async () => {
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '')
  
    // Validate
    if (!form.companyName) errors.companyName = 'Company name is required'
    if (!form.website) errors.website = 'Website URL is required'
  
    if (Object.values(errors).some(error => error)) return
  
    try {
      loading.value = true
      // Handle form submission
      await router.push('/onboarding/marketing-preferences')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  </script>