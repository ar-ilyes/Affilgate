<template>
    <div class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Financial</h1>
  
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Sales"
          :value="200"
          bgColor="blue"
        />
        <StatCard
          title="Total revenue"
          value="15 000"
          unit="DA"
          bgColor="blue"
        />
        <StatCard
          title="Total paid"
          value="10 000"
          unit="DA"
          bgColor="blue"
        />
        <StatCard
          title="Balance"
          value="5 000"
          unit="DA"
          bgColor="blue"
        />
      </div>
  
      <!-- Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-100">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="px-4 py-2 font-medium"
            :class="[
              activeTab === tab.id 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
  
      <!-- Payment History Tab -->
      <div v-if="activeTab === 'payment'">
        <div class="bg-white rounded-lg">
          <div class="grid grid-cols-[1fr_1fr_1fr_1fr_100px] px-6 py-3 text-sm bg-gray-50 border-b border-gray-100">
            <div class="font-medium text-gray-600">Payment ID</div>
            <div class="font-medium text-gray-600">Status</div>
            <div class="font-medium text-gray-600">Date</div>
            <div class="font-medium text-gray-600">Amount</div>
            <div class="font-medium text-gray-600">Actions</div>
          </div>
  
          <div class="divide-y divide-gray-100">
            <div 
              v-for="payment in payments" 
              :key="payment.id"
              class="grid grid-cols-[1fr_1fr_1fr_1fr_100px] px-6 py-4 items-center"
            >
              <div class="text-gray-800">#{{ payment.id }}</div>
              <div>
                <span 
                  class="px-2 py-1 rounded-full text-sm"
                  :class="getStatusClass(payment.status)"
                >
                <span 
                    class="w-1.5 h-1.5 rounded-full"
                    :class="{
                      'bg-green-500': payment.status == 'Paid',
                      'bg-orange-500': payment.status == 'Pending',
                      'bg-blue-500': payment.status == 'In review',
                      'bg-red-500': payment.status == 'Rejected'
                    }"
                  ></span>
                  {{ payment.status }}
                </span>
              </div>
              <div class="text-gray-800">{{ payment.date }}</div>
              <div class="text-gray-800">{{ payment.amount }} DA</div>
              <div>
                <button 
                  class="p-2 hover:bg-gray-100 rounded-full"
                  @click="openUploadModal(payment)"
                >
                  <img src="/icons/upload-doc.svg" alt="Upload" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
  
          <TablePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </div>
  
      <!-- Sales History Tab -->
      <div v-if="activeTab === 'sales'">
        <div class="bg-white rounded-lg">
          <div class="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] px-6 py-3 text-sm bg-gray-50 border-b border-gray-100">
            <div class="font-medium text-gray-600">Product name</div>
            <div class="font-medium text-gray-600">Total revenue</div>
            <div class="font-medium text-gray-600">Total Sales</div>
            <div class="font-medium text-gray-600">Product Price</div>
            <div class="font-medium text-gray-600">Commission</div>
            <div class="font-medium text-gray-600">Sale date</div>
          </div>
  
          <div class="divide-y divide-gray-100">
            <div 
              v-for="sale in sales" 
              :key="sale.id"
              class="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] px-6 py-4 items-center"
            >
              <div class="flex items-center gap-3">
                <img :src="sale.image" :alt="sale.title" class="w-10 h-10 rounded-lg bg-gray-100" />
                <span class="font-medium text-gray-800">{{ sale.title }}</span>
              </div>
              <div class="text-gray-800">{{ sale.revenue }} DA</div>
              <div class="text-gray-800">{{ sale.totalSales }}</div>
              <div class="text-gray-800">{{ sale.price }} DA</div>
              <div class="flex items-center gap-2">
                <span class="text-gray-800">{{ sale.commission }}</span>
                <span class="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                  {{ sale.commissionPercentage }}%
                </span>
              </div>
              <div class="text-gray-800">{{ sale.date }}</div>
            </div>
          </div>
  
          <TablePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </div>

      <!-- Upload Invoice Modal -->
      <Modal
        v-if="showUploadModal"
        title="Upload invoice"
        @close="showUploadModal = false"
      >
        <div class="p-6">
          <div class="mb-6">
            <h3 class="font-medium text-gray-800 mb-2">1- Include your bank information in your invoice details</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-600">habhoub Chemseddine</p>
              <p class="text-gray-600">RIB: 12896254346535654528</p>
              <button class="text-blue-600 text-sm mt-2">See example</button>
            </div>
          </div>
  
          <div>
            <h3 class="font-medium text-gray-800 mb-2">2- Upload your invoice to the platform</h3>
            <div 
              class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
              @click="triggerFileUpload"
            >
              <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                accept=".pdf,.jpg,.jpeg"
                @change="handleFileUpload"
              />
              <q-icon name="add" size="24px" class="text-blue-600 mb-2" />
              <p class="text-blue-600 font-medium mb-1">Click here</p>
              <p class="text-gray-500 text-sm">to upload your file or drag and drop</p>
              <p class="text-gray-400 text-sm">Supported format: pdf, jpg</p>
            </div>
          </div>
  
          <button 
            class="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            @click="sendPaymentRequest"
          >
            Send payment request
          </button>
        </div>
      </Modal>
  
      <!-- Success Modal -->
      <Modal
        v-if="showSuccessModal"
        @close="showSuccessModal = false"
      >
        <div class="p-6 text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <q-icon name="check" size="32px" class="text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">
            Your payment request has been sent successfully
          </h3>
          <p class="text-gray-600 mb-2">Your invoice is in the review status</p>
          <p class="text-gray-600 mb-6">
            One of our team members will review your invoice details and arrange your payment
          </p>
          <button 
            class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            @click="closeSuccessModal"
          >
            Go back to payment history
          </button>
        </div>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import StatCard from 'components/performance/StatCard.vue'
  import TablePagination from 'components/basic/TablePagination.vue'
  import Modal from 'components/basic/Modal.vue'
  
  const activeTab = ref('payment')
  const currentPage = ref(1)
  const totalPages = ref(10)
  const showUploadModal = ref(false)
  const showSuccessModal = ref(false)
  const fileInput = ref(null)
  
  const tabs = [
    { id: 'payment', name: 'Payment history' },
    { id: 'sales', name: 'Sales history' }
  ]
  
  const payments = ref([
    {
      id: '3525454',
      status: 'Pending',
      date: '12-10-2024',
      amount: '20 000'
    },
    {
      id: '3525454',
      status: 'In review',
      date: '12-10-2024',
      amount: '20 000'
    },
    {
      id: '3525454',
      status: 'Paid',
      date: '12-10-2024',
      amount: '20 000'
    }
    // Add more payment data...
  ])
  
  const sales = ref([
    {
      id: 1,
      title: 'Product title',
      image: '/images/airpods.png',
      revenue: '40 000',
      totalSales: 10,
      price: '20 000',
      commission: '4 000',
      commissionPercentage: 20,
      date: '27-12-2024'
    }
    // Add more sales data...
  ])
  
  const getStatusClass = (status) => {
    const classes = {
      'Pending': 'bg-orange-50 text-orange-700',
      'In review': 'bg-blue-50 text-blue-700',
      'Paid': 'bg-green-50 text-green-700',
      'Rejected': 'bg-red-50 text-red-700'
    }
    return classes[status] || ''
  }
  
  const handlePageChange = (page) => {
    currentPage.value = page
    // Implement pagination logic
  }
  
  const openUploadModal = (payment) => {
    showUploadModal.value = true
  }
  
  const triggerFileUpload = () => {
    fileInput.value.click()
  }
  
  const handleFileUpload = (event) => {
    // Implement file upload logic
  }
  
  const sendPaymentRequest = () => {
    showUploadModal.value = false
    showSuccessModal.value = true
  }
  
  const closeSuccessModal = () => {
    showSuccessModal.value = false
  }
  </script>