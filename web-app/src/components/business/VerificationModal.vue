<template>
  <q-dialog
    :model-value="show"
    @update:model-value="$emit('update:show', $event)"
    persistent
  >
    <q-card class="w-[600px]">
      <q-card-section class="p-8">
        <!-- Success View -->
        <div v-if="isCompleted" class="text-center">
          <div class="bg-primaryColor-100 rounded-full p-3 inline-flex mb-6">
            <q-icon name="rocket_launch" class="text-primaryColor-500 text-3xl" />
          </div>
          <h2 class="text-2xl font-bold text-[#1F2937] mb-2">
            Your ID verification and business data are sent successfully
          </h2>
          <p class="text-gray-600 mb-2">
            Your account will be validated once we check your information
          </p>
          <p class="text-gray-600 mb-6">Thank you for your trust!</p>
          <Button 
            label="Go to my products" 
            variant="filled"
            class="bg-gray-400 text-white"
            @click="$router.push('/products')"
          />
        </div>

        <!-- Verification Steps -->
        <template v-else>
          <div class="bg-primaryColor-100 rounded-full p-3 inline-flex mb-6">
            <q-icon name="verified" class="text-primaryColor-500 text-3xl" />
          </div>

          <!-- ID Verification Section -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-2">
              <div class="bg-[#4338CA] w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium">
                1
              </div>
              <h2 class="text-xl font-bold text-[#1F2937]">ID verification</h2>
            </div>
            <p class="text-gray-600 mb-6">
              To verify your account you need to upload your ID and take a picture of you
            </p>

            <!-- Upload ID -->
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 text-sm">
                  1
                </div>
                <span :class="[
                  'font-medium',
                  { 'text-gray-900': !idUploaded || currentStep === 1, 'text-gray-400': idUploaded && currentStep > 1 }
                ]">Upload your ID (Recto/verso)</span>
                <q-icon v-if="idUploaded" name="check_circle" class="text-green-500" />
              </div>

              <div 
                v-if="!idUploaded && currentStep === 1" 
                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative"
                @dragover.prevent
                @drop.prevent="handleIdDrop"
              >
                <input
                  type="file"
                  ref="idInput"
                  accept="image/png,image/jpeg"
                  multiple
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="handleIdUpload"
                />
                <div class="text-primaryColor-500 text-2xl mb-2">+</div>
                <div class="text-primaryColor-500 font-medium">Click here</div>
                <div class="text-gray-500 text-sm">to upload file or drag and drop</div>
                <div class="text-gray-400 text-xs mt-1">Supported format: png, jpg</div>
              </div>

              <div v-if="idUploaded" class="flex gap-4">
                <div v-for="(image, index) in idImages" :key="index" class="relative">
                  <img :src="image" class="w-40 h-24 object-cover rounded-lg" />
                  <button 
                    v-if="currentStep === 1"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    @click="removeId(index)"
                  >
                    <q-icon name="close" size="xs" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Take Picture -->
            <div>
              <div class="flex items-center gap-2 mb-2">
                <div class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 text-sm">
                  2
                </div>
                <span :class="[
                  'font-medium',
                  { 'text-gray-900': idUploaded && !selfieUploaded, 'text-gray-400': !idUploaded || selfieUploaded }
                ]">Take a picture of you</span>
                <q-icon v-if="selfieUploaded" name="check_circle" class="text-green-500" />
              </div>

              <div v-if="idUploaded && !selfieUploaded && currentStep === 1" class="text-center">
                <button 
                  class="text-primaryColor-500 font-medium"
                  @click="openCamera"
                >
                  <q-icon name="photo_camera" class="text-2xl" />
                  <div>Open camera</div>
                </button>
              </div>
            </div>
          </div>

          <!-- Business Verification Section -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium',
                currentStep === 2 ? 'bg-[#4338CA] text-white' : 'bg-gray-100 text-gray-400'
              ]">
                2
              </div>
              <h2 :class="[
                'text-xl font-bold',
                currentStep === 2 ? 'text-[#1F2937]' : 'text-gray-400'
              ]">Business verification</h2>
            </div>
            <p :class="[
              'mb-6',
              currentStep === 2 ? 'text-gray-600' : 'text-gray-400'
            ]">
              To verify your business information, you need to upload your registre de commerce
            </p>

            <div v-if="currentStep === 2">
              <div class="flex items-center gap-2 mb-2">
                <div class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 text-sm">
                  1
                </div>
                <span class="font-medium">Upload your registre de commerce</span>
                <q-icon v-if="businessDocUploaded" name="check_circle" class="text-green-500" />
              </div>

              <div 
                v-if="!businessDocUploaded" 
                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative"
                @dragover.prevent
                @drop.prevent="handleBusinessDocDrop"
              >
                <input
                  type="file"
                  ref="businessDocInput"
                  accept=".pdf,image/jpeg"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="handleBusinessDocUpload"
                />
                <div class="text-primaryColor-500 text-2xl mb-2">+</div>
                <div class="text-primaryColor-500 font-medium">Click here</div>
                <div class="text-gray-500 text-sm">to upload file or drag and drop</div>
                <div class="text-gray-400 text-xs mt-1">Supported format: pdf, jpg</div>
              </div>

              <div v-else class="bg-gray-50 rounded p-3 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <q-icon name="description" class="text-gray-500" />
                  <span class="font-medium">{{ businessDoc.name }}</span>
                </div>
                <button 
                  class="text-red-500"
                  @click="removeBusinessDoc"
                >
                  <q-icon name="delete" />
                </button>
              </div>
            </div>
          </div>
        </template>
      </q-card-section>

      <q-card-actions align="right" class="bg-gray-50 p-4" v-if="!isCompleted">
        <Button 
          v-if="currentStep === 2"
          label="Back" 
          variant="text"
          @click="$emit('back-step')"
        />
        <Button 
          :label="currentStep === 2 ? 'Confirm' : 'Next'" 
          variant="filled"
          class="bg-primaryColor-500 text-white"
          @click="handleNext"
          :disabled="!canProceed"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'components/basic/Button.vue'

const router = useRouter()

const props = defineProps({
  show: Boolean,
  currentStep: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:show', 'next-step', 'back-step', 'complete'])

const idInput = ref(null)
const businessDocInput = ref(null)
const idUploaded = ref(false)
const idImages = ref([])
const selfieUploaded = ref(false)
const businessDocUploaded = ref(false)
const businessDoc = ref(null)
const isCompleted = ref(false)

const canProceed = computed(() => {
  if (props.currentStep === 1) {
    return idUploaded.value && selfieUploaded.value
  }
  return businessDocUploaded.value
})

const handleIdUpload = (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 2) {
    idImages.value = files.map(file => URL.createObjectURL(file))
    idUploaded.value = true
  } else {
    // Show error message that 2 images are required
    alert('Please upload both front and back of your ID')
  }
}

const handleIdDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  if (files.length === 2) {
    idImages.value = files.map(file => URL.createObjectURL(file))
    idUploaded.value = true
  } else {
    // Show error message that 2 images are required
    alert('Please upload both front and back of your ID')
  }
}

const removeId = (index) => {
  idImages.value.splice(index, 1)
  if (idImages.value.length === 0) {
    idUploaded.value = false
    selfieUploaded.value = false // Reset selfie when ID is removed
  }
}

const openCamera = () => {
  // Mock camera functionality
  selfieUploaded.value = true
}

const handleBusinessDocUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    businessDoc.value = file
    businessDocUploaded.value = true
  }
}

const handleBusinessDocDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    businessDoc.value = file
    businessDocUploaded.value = true
  }
}

const removeBusinessDoc = () => {
  businessDoc.value = null
  businessDocUploaded.value = false
}

const handleNext = () => {
  if (props.currentStep === 1) {
    emit('next-step')
  } else {
    isCompleted.value = true
  }
}
</script>