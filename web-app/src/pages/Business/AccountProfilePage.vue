<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <p class="text-3xl font-bold text-gray-800">Profile</p>
        <Button 
          label="Edit" 
          class="bg-primaryColor-200 text-primaryColor-600"
          @click="isEditing = true"
          v-if="!isEditing"
        />
        <div class="flex gap-4" v-else>
          <Button 
            label="Cancel" 
            variant="outline"
            class="text-gray-600"
            @click="cancelChanges"
          />
          <Button 
            label="Save" 
            class="bg-primaryColor-200 text-primaryColor-600"
            @click="saveChanges"
          />
        </div>
      </div>
  
      <!-- Company Header Section -->
      <div class="relative mb-6">
        <!-- Banner -->
        <div class="h-44 w-full bg-primaryColor-100 rounded-lg pattern-bg relative">
          <button 
            v-if="isEditing"
            class="absolute bottom-4 left-4 bg-white rounded-full p-2"
            @click="uploadBanner"
          >
            <q-icon name="download" class="text-gray-600" />
          </button>
        </div>
        
        <div class="mb-4 text-gray-500 float-right">
          On platform since {{ company.joinDate }}
        </div>
        
        <!-- Company Logo -->
        <div class="absolute -bottom-16 left-6">
          <div class="relative">
            <div class="w-36 h-36 bg-navy-900 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                v-if="company.logo" 
                :src="company.logo" 
                alt="Company logo" 
                class="w-full h-full object-cover"
              />
              <span v-else class="text-white text-4xl font-bold">
                {{ company.name.charAt(0) }}
              </span>
            </div>
            <button 
              v-if="isEditing"
              class="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
              @click="uploadLogo"
            >
              <q-icon name="download" class="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Company Details Section -->
      <div class="mt-20 grid grid-cols-5 gap-6">
        <div class="col-span-3">
          <div v-if="!isEditing">
            <h1 class="text-2xl font-bold text-gray-800 mb-1">{{ company.name }}</h1>
            <a :href="company.website" target="_blank" class="text-primaryColor-500 hover:underline mb-2 block">
              {{ company.website }}
            </a>
            <p class="text-gray-800 mb-4 font-semibold">{{ company.location }}</p>
            
            <!-- Bio Section -->
            <div class="bg-primaryColor-50 rounded-lg px-5 py-4 mb-8">
              <p class="font-bold text-gray-800 text-lg ">Bio</p>
              <p class="text-gray-600">{{ company.bio }}</p>
            </div>
  
            <div class="mb-4">
              <p class="font-bold text-gray-500 mb-2">Target audience</p>
              <p class="text-gray-800">{{ company.targetAudience }}</p>
            </div>
  
            <div>
              <p class="font-bold text-gray-500 mb-2">Niche</p>
              <p class="text-gray-800">{{ company.niche }}</p>
            </div>
          </div>
  
          <div v-else>
            <Input
              v-model="form.businessName"
              label="Business name"
              placeholder="Enter business name"
            />
            
            <Input
              v-model="form.website"
              label="Website"
              placeholder="www."
              class="mt-4"
            />
            
            <Input
              v-model="form.address"
              label="Address"
              placeholder="Enter your address"
              class="mt-4"
            />
            
            <Input
              v-model="form.bio"
              label="Bio"
              type="textarea"
              placeholder="Your text here"
              class="mt-4"
            />
            
            <Input
              v-model="form.targetAudience"
              label="Target audience"
              placeholder="Ex: Students"
              class="mt-4"
            />
            
            <Select
              v-model="form.niche"
              label="Niche"
              :static-options="nicheOptions"
              class="mt-4"
            />
          </div>
        </div>
  
        <div class="col-span-2">
          <!-- Account Verification Card -->
          <div class="bg-primaryColor-400 rounded-lg p-6">
            <div class="flex items-center gap-4 mb-4 flex-nowrap">
              <div class="bg-primaryColor-300 rounded-full p-2">
                <q-icon name="o_verified" size="27px"  class="text-white" />
              </div>
              <div>
                <p class="font-bold text-white">Account verification</p>
                <p class="text-white text-sm">
                  Verify your ID and business details to start posting your products
                </p>
              </div>
            </div>
            <div class="w-full flex justify-end">
            <Button 
              label="Verify my account" 
              variant="filled"
              class=" w-1/3 bg-primaryColor-800 text-white font-bold"
              @click="openVerificationModal"
            />
            </div>
          </div>
  
          <!-- Social Media Links -->
          <div class="mt-6 border-[1px] border-customGray-100 p-6 shadow-sm rounded-lg">
            <p class="font-bold text-xl text-gray-800 mb-4">Social media</p>
            <div >
              <div class=" space-y-3" v-if="!isEditing">
                <a v-if="company.linkedin" :href="company.linkedin" target="_blank" class="flex items-center gap-2 text-gray-600 hover:text-primary-500">
                  <q-icon name="fab fa-linkedin" size="23px" class="text-[#0077B5]" />
                  <span>{{ company.linkedin }}</span>
                </a>
                <a v-if="company.instagram" :href="company.instagram" target="_blank" class="flex items-center gap-2 text-gray-600 hover:text-primary-500">
                  <q-icon name="fab fa-instagram" size="23px" class="text-[#E4405F]" />
                  <span>{{ company.instagram }}</span>
                </a>
                <a v-if="company.facebook" :href="company.facebook" target="_blank" class="flex items-center gap-2 text-gray-600 hover:text-primary-500">
                  <q-icon name="fab fa-facebook" size="23px" class="text-[#1877F2]" />
                  <span>{{ company.facebook }}</span>
                </a>
              </div>
              <div v-else>
                <Input
                  v-model="form.linkedin"
                  placeholder="LinkedIn link"
                  class="w-full"
                >
                  <template #prepend>
                    <q-icon name="fab fa-linkedin" class="text-[#0077B5]" />
                  </template>
                </Input>
                
                <Input
                  v-model="form.instagram"
                  placeholder="Instagram link"
                  class="w-full mt-4"
                >
                  <template #prepend>
                    <q-icon name="fab fa-instagram" class="text-[#E4405F]" />
                  </template>
                </Input>
                
                <Input
                  v-model="form.facebook"
                  placeholder="Facebook link"
                  class="w-full mt-4"
                >
                  <template #prepend>
                    <q-icon name="fab fa-facebook" class="text-[#1877F2]" />
                  </template>
                </Input>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Verification Modal -->
      <VerificationModal
        :show="showVerificationModal"
        :current-step="verificationStep"
        @update:show="showVerificationModal = $event"
        @next-step="handleNextStep"
        @back-step="handleBackStep"
        @complete="handleVerificationComplete"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import Input from 'components/basic/Input.vue'
  import Button from 'components/basic/Button.vue'
  import Select from 'components/basic/Select.vue'
  import VerificationModal from 'components/business/VerificationModal.vue'
  
  const isEditing = ref(false)
  const showVerificationModal = ref(false)
  const verificationStep = ref(1)
  
  // Mock company data
  const company = reactive({
    name: 'Business name',
    logo: 'images/brainiac.png',
    website: 'www.website.com',
    location: 'Algiers, Algeria',
    joinDate: '09-11-2024',
    bio: 'Lorem ipsum dolor sit amet consectetur...',
    targetAudience: 'Students',
    niche: 'Technology',
    linkedin: 'linkedin.com/company/example',
    instagram: 'instagram.com/example',
    facebook: 'facebook.com/example'
  })
  
  const form = reactive({
    businessName: company.name,
    website: company.website,
    address: company.location,
    bio: company.bio,
    targetAudience: company.targetAudience,
    niche: company.niche,
    linkedin: company.linkedin,
    instagram: company.instagram,
    facebook: company.facebook
  })
  
  const nicheOptions = [
    { label: 'Technology', value: 'technology' },
    { label: 'Education', value: 'education' },
    { label: 'E-commerce', value: 'ecommerce' }
  ]
  
  // Methods
  const uploadBanner = () => {
    // Implement banner upload logic
  }
  
  const uploadLogo = () => {
    // Implement logo upload logic
  }
  
  const saveChanges = () => {
    Object.assign(company, {
      name: form.businessName,
      website: form.website,
      location: form.address,
      bio: form.bio,
      targetAudience: form.targetAudience,
      niche: form.niche,
      linkedin: form.linkedin,
      instagram: form.instagram,
      facebook: form.facebook
    })
    isEditing.value = false
  }
  
  const cancelChanges = () => {
    Object.assign(form, {
      businessName: company.name,
      website: company.website,
      address: company.location,
      bio: company.bio,
      targetAudience: company.targetAudience,
      niche: company.niche,
      linkedin: company.linkedin,
      instagram: company.instagram,
      facebook: company.facebook
    })
    isEditing.value = false
  }
  
  const openVerificationModal = () => {
    showVerificationModal.value = true
    verificationStep.value = 1
  }
  
  const handleNextStep = () => {
    verificationStep.value++
  }
  
  const handleBackStep = () => {
    verificationStep.value--
  }
  
  const handleVerificationComplete = () => {
    showVerificationModal.value = false
  }
  </script>
  
  <style scoped>
  .pattern-bg {
    background-image: url('images/profileMosaique.svg');
  }
  </style>