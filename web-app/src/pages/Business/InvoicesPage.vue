<template>
    <div class="p-6">
      <!-- Warning Banner -->
      <div v-if="showPaymentWarning" class=" bg-[#ffbd8e] border border-[#FFE5D1] rounded-lg p-4 mb-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- <q-icon name="warning" size="sm" class="text-[#F97316]" /> -->
           <img src="/icons/danger.svg" alt="warning icon" class="w-12 h-12 mx-2" />
          <div>
            <h3 class="text-[#9A3412] text-lg font-bold">Invoice needs to be paid</h3>
            <p class="text-[#C2410C]">Your products are not seen in the marketplace until you pay your invoice</p>
          </div>
        </div>
        <Button 
          label="Pay invoice" 
          variant="filled"
          class="bg-[#9A3412] hover:bg-[#7C2D12] text-white font-bold"
          @click="payInvoice"
        />
      </div>
  
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-1">Invoices</h1>
        <p class="text-customGray-600 font-medium">This remains my invoices list</p>
      </div>
  
      <!-- Tabs -->
      <div class="mb-6">
        <div class="flex gap-2 bg-white w-fit px-2 py-1 rounded-xl border-[1px] border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-6 py-1 rounded-lg relative text-sm"
            :class="[
              currentTab === tab.value 
                ? 'text-gray-800 bg-white shadow-primaryColor-200 shadow-[0_0_10px_rgba(0,0,0,0.1)] font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
            @click="currentTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
  
      <!-- Table -->
      <div class="mt-6 bg-white rounded-lg">
        <!-- Table Header -->
        <div class="grid grid-cols-[1.5fr_1fr_1fr_1fr_50px] px-6 py-4 border-b border-gray-100">
          <div class="font-medium text-gray-600">Invoice ID</div>
          <div class="font-medium text-gray-600">Status</div>
          <div class="font-medium text-gray-600">Amount</div>
          <div class="font-medium text-gray-600">Date</div>
          <div></div>
        </div>
  
        <!-- Table Body -->
        <div class="divide-y divide-gray-100">
          <div 
            v-for="invoice in filteredInvoices" 
            :key="invoice.id"
            class="grid grid-cols-[1.5fr_1fr_1fr_1fr_50px] px-6 py-4 items-center hover:bg-gray-50"
          >
            <div class="font-medium text-gray-800">#{{ invoice.id }}</div>
            
            <!-- Status -->
            <div>
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5"
                :class="{
                  'bg-green-50 text-green-700': invoice.status === 'Paid',
                  'bg-orange-50 text-orange-700': invoice.status === 'Pending',
                  'bg-blue-50 text-blue-700': invoice.status === 'In review',
                  'bg-red-50 text-red-700': invoice.status === 'Rejected'
                }"
              >
                <span 
                  class="w-1.5 h-1.5 rounded-full"
                  :class="{
                    'bg-green-500': invoice.status === 'Paid',
                    'bg-orange-500': invoice.status === 'Pending',
                    'bg-blue-500': invoice.status === 'In review',
                    'bg-red-500': invoice.status === 'Rejected'
                  }"
                ></span>
                {{ invoice.status }}
              </span>
            </div>
  
            <div class="text-gray-800">{{ invoice.amount }} DA</div>
            <div class="text-gray-600">{{ invoice.date }}</div>
  
            <!-- Actions -->
            <div class="relative">
              <q-btn
                flat
                round
                dense
                icon="more_horiz"
                class="text-gray-500"
                @click="openActionsMenu($event, invoice)"
              />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Actions Menu -->
      <q-menu
        v-model="showActionsMenu"
        :target="actionMenuTarget"
        anchor="bottom right"
        self="top right"
        class="bg-white rounded-lg shadow-lg"
      >
        <q-list style="min-width: 150px">
          <q-item clickable v-close-popup @click="previewInvoice(selectedInvoice)">
            <q-item-section>
              <div class="flex items-center gap-2 text-gray-700">
                <q-icon name="visibility" size="xs" />
                <span>Preview</span>
              </div>
            </q-item-section>
          </q-item>
          <q-item 
            v-if="selectedInvoice?.status === 'Pending'"
            clickable 
            v-close-popup 
            @click="payInvoice(selectedInvoice)"
          >
            <q-item-section>
              <div class="flex items-center gap-2 text-gray-700">
                <q-icon name="payment" size="xs" />
                <span>Pay</span>
              </div>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="downloadInvoice(selectedInvoice)">
            <q-item-section>
              <div class="flex items-center gap-2 text-gray-700">
                <q-icon name="download" size="xs" />
                <span>Download</span>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import Button from 'components/basic/Button.vue'
  
  // Mock data - replace with API calls later
  const showPaymentWarning = ref(true)
  const currentTab = ref('all')
  const showActionsMenu = ref(false)
  const actionMenuTarget = ref(null)
  const selectedInvoice = ref(null)
  
  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Paid', value: 'paid' },
    { label: 'In review', value: 'in-review' },
    { label: 'Rejected', value: 'rejected' }
  ]
  
  const invoices = ref([
    {
      id: '56456687',
      status: 'Pending',
      amount: '20 000',
      date: '09-12-24'
    },
    {
      id: '56456687',
      status: 'Paid',
      amount: '20 000',
      date: '09-12-24'
    },
    {
      id: '56456687',
      status: 'In review',
      amount: '20 000',
      date: '09-12-24'
    },
    {
      id: '56456687',
      status: 'Rejected',
      amount: '20 000',
      date: '09-12-24'
    }
  ])
  
  const filteredInvoices = computed(() => {
    if (currentTab.value === 'all') return invoices.value
    
    const statusMap = {
      'pending': 'Pending',
      'paid': 'Paid',
      'in-review': 'In review',
      'rejected': 'Rejected'
    }
    
    return invoices.value.filter(invoice => 
      invoice.status === statusMap[currentTab.value]
    )
  })
  
  const openActionsMenu = (event, invoice) => {
    actionMenuTarget.value = event.target
    selectedInvoice.value = invoice
    showActionsMenu.value = true
  }
  
  const previewInvoice = (invoice) => {
    // Implement preview logic
    console.log('Preview invoice:', invoice)
  }
  
  const payInvoice = (invoice) => {
    // Implement payment logic
    console.log('Pay invoice:', invoice)
  }
  
  const downloadInvoice = (invoice) => {
    // Implement download logic
    console.log('Download invoice:', invoice)
  }
  </script>