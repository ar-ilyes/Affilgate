<template>
  <q-dialog
    :model-value="show"
    @update:model-value="$emit('update:show', $event)"
    persistent
  >
    <q-card class="w-[600px]">
      <q-card-section class="text-center pt-8">
        <div class="bg-primaryColor-100 rounded-full p-3 inline-flex mb-6">
          <q-icon name="verified" class="text-primaryColor-500 text-3xl" />
        </div>
        
        <!-- Step 1: ID Verification -->
        <div v-if="currentStep === 1">
          <h2 class="text-2xl font-bold mb-2">ID verification</h2>
          <p class="text-gray-600 mb-6">
            To verify your account you need to upload your ID and take a picture of you
          </p>
          
          <div class="space-y-6">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div v-if="!idImages.length" class="text-center">
                <div class="bg-primaryColor-50 rounded-full p-4 inline-flex mb-4">
                  <q-icon name="add" class="text-primaryColor-500 text-xl" />
                </div>
                <p class="font-medium mb-1">Upload your ID (Recto/verso)</p>
                <p class="text-sm text-gray-500 mb-2">Click here to upload file or drag and drop</p>
                <p class="text-xs text-gray-400">Supported format: png, jpg</p>
              </div>
              <div v-else class="flex gap-4">
                <div v-for="(img, index) in idImages" :key="index" class="relative">
                  <img :src="img" class="w-40 h-24 object-cover rounded-lg" />
                  <button 
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    @click="removeIdImage(index)"
                  >
                    <q-icon name="close" size="xs" />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <p class="font-medium mb-4">Take a picture of you</p>
              <button 
                class="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-primaryColor-500"
                @click="openCamera"
              >
                Open camera
              </button>
            </div>
          </div>
        </div>
        
        <!-- Step 2: Business Verification -->
        <div v-else>
          <h2 class="text-2xl font-bold mb-2">Business verification</h2>
          <p class="text-gray-600 mb-6">
            To verify your business information, you need to upload your registre de commerce
          </p>
          
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
            <div v-if="!businessDoc" class="text-center">
              <div class="bg-primaryColor-50 rounded-full p-4 inline-flex mb-4">
                <q-icon name="add" class="text-primaryColor-500 text-xl" />
              </div>
              <p class="font-medium mb-1">Upload your business document</p>
              <p class="text-sm text-gray-500 mb-2">Click here to upload file or drag and drop</p>
              <p class="text-xs text-gray-400">Supported format: pdf</p>
            </div>
            <div v-else>
              <div class="flex items-center justify-between bg-gray-50 rounded p-3">
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
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-gray-50 p-4">
        <Button 
          v-if="currentStep > 1"
          label="Back" 
          variant="text"
          @click="$emit('back-step')"
        />
        <Button 
          label="Next" 
          variant="filled"
          @click="handleNext"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'components/basic/Button.vue'

const props = defineProps({
  show: Boolean,
  currentStep: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:show', 'next-step', 'back-step', 'complete'])

const idImages = ref([])
const businessDoc = ref(null)

const removeIdImage = (index) => {
  idImages.value.splice(index, 1)
}

const openCamera = () => {
  // Implement camera functionality
}

const removeBusinessDoc = () => {
  businessDoc.value = null
}

const handleNext = () => {
  if (props.currentStep === 1) {
    emit('next-step')
  } else {
    emit('complete')
  }
}
</script>