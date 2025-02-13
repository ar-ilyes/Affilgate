<template>
    <div class="p-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <router-link to="/invoices" class="hover:text-primaryColor-500">
          Invoices
        </router-link>
        <span>></span>
        <span>Payment method</span>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-[2.5fr_2fr] gap-8 border border-customGray-100 rounded-lg p-6">
        <!-- Payment Methods -->
        <div class="border-r border-customGray-100 pr-6">
          <PaymentMethod
            title="Offline payment"
            icon="/images/offlinePayment.png"
            :is-selected="selectedMethod === 'offline'"
            @select="selectedMethod = 'offline'"
          >
            <div class="space-y-4 mt-4">
              <div class="px-10">
                <p class="text-customGray-600 mb-2">1- Send the amount to this bank account</p>
                <p class="font-bold text-customGray-600">Habhoub Chemseddine</p>
                <p class="text-customGray-400">
                  RIB: <span class="font-bold text-customGray-600">12896254346535654528</span>
                </p>
              </div>
              <div>
                <p class="text-customGray-600 mb-2 px-10">2- Once paid, upload your receipt below</p>
                <FileUpload
                  v-if="selectedMethod === 'offline'"
                  @file-selected="handleFileUpload"
                  @file-removed="handleFileRemove"
                />
              </div>
            </div>
          </PaymentMethod>
  
          <PaymentMethod
            title="Edahabia payment"
            icon="/images/edahabiya.png"
            :is-selected="selectedMethod === 'edahabia'"
            @select="selectedMethod = 'edahabia'"
          />
  
          <PaymentMethod
            title="CIB payment"
            icon="/images/cib.png"
            :is-selected="selectedMethod === 'cib'"
            @select="selectedMethod = 'cib'"
          />
        </div>
  
        <!-- Summary -->
        <div>
          <PaymentSummary
            :commissions="commissions"
            :total-amount="totalAmount"
          />
        </div>
      </div>
  
      <!-- Action Button -->
      <div class="flex justify-end mt-8">
        <Button
          :label="selectedMethod === 'offline' ? 'Confirmer' : 'Payer'"
          variant="filled"
          class="bg-primaryColor-500 text-white"
          :disabled="!isPaymentValid"
          @click="handlePayment"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import PaymentMethod from 'components/payment/PaymentMethod.vue'
  import PaymentSummary from 'components/payment/PaymentSummary.vue'
  import FileUpload from 'components/payment/FileUpload.vue'
  import Button from 'components/basic/Button.vue'
  
  const selectedMethod = ref('offline')
  const uploadedFile = ref(null)
  
  // Mock data
  const commissions = ref([
    {
      percentage: 20,
      total: '20 000',
      products: [
        { id: 1, name: 'Product1', price: '20 000', quantity: 10, total: '40 000' },
        { id: 2, name: 'Product1', price: '20 000', quantity: 10, total: '40 000' }
      ]
    },
    {
      percentage: 30,
      total: '20 000',
      products: [
        { id: 3, name: 'Product1', price: '20 000', quantity: 10, total: '40 000' },
        { id: 4, name: 'Product1', price: '20 000', quantity: 10, total: '40 000' }
      ]
    }
  ])
  
  const totalAmount = ref('40 000')
  
  const isPaymentValid = computed(() => {
    if (selectedMethod.value === 'offline') {
      return !!uploadedFile.value
    }
    return true
  })
  
  const handleFileUpload = (file) => {
    uploadedFile.value = file
  }
  
  const handleFileRemove = () => {
    uploadedFile.value = null
  }
  
  const handlePayment = () => {
    // Implement payment logic based on selectedMethod
    console.log('Processing payment with method:', selectedMethod.value)
  }
  </script>