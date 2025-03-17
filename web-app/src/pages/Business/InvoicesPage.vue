<template>
  <div class="p-6">
    <!-- Warning Banner -->
    <div v-if="showPaymentWarning" class="bg-[#ffbd8e] border border-[#FFE5D1] rounded-lg p-4 mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/icons/danger.svg" alt="warning icon" class="w-12 h-12 mx-2" />
        <div>
          <h3 class="text-[#9A3412] text-lg font-bold">Invoice needs to be paid</h3>
          <p class="text-[#C2410C]">Your products are not seen in the marketplace until you pay your invoice</p>
        </div>
      </div>
      <Button 
        label="Pay invoice" 
        variant="filled"
        color="#9A3412"
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

    <!-- Table and Preview Section -->
    <div class="flex relative">
      <!-- Table Container -->
      <div class="flex-1" :class="{ 'pr-[600px]': showPreview }">
        <div class="bg-white rounded-lg">
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
      </div>

      <!-- Preview Panel -->
      <div 
        v-if="showPreview" 
        class="fixed right-0 bg-white shadow-lg transition-transform duration-300 transform h-[100%]"
        :class="{ 'translate-x-0': showPreview, 'translate-x-full': !showPreview }"
        style="top: var(--table-top)"
      >
        <div class="absolute top-2 left-[-1.5rem] rounded-full bg-white shadow-md h-10 w-10 flex justify-center items-center">
          <Button 
            icon="chevron_right"
            variant="text"
            @click="showPreview = false"
            class="text-black w-10 h-10"
          />
        </div>
        <div class="p-6 h-[75%] bg-gray-50 overflow-scroll">
          <!-- <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Preview</h2>
            <div class="flex gap-2">
              <Button 
                icon="print"
                variant="text"
                class="text-gray-500"
              />
              <Button 
                icon="download"
                variant="text"
                class="text-gray-500"
              />
            </div>
          </div> -->
          
          <!-- Invoice Preview -->
          <!-- <div class=" p-2 overflow-scroll h-[90%]">
          <div class="bg-white p-8 rounded-lg shadow-sm">
            <div class="flex justify-between items-start mb-8">
              <div>
                <h3 class="font-bold text-xl mb-2">Company name</h3>
                <p class="text-gray-600">Adresse********</p>
                <p class="text-gray-600">044995974</p>
                <p class="text-gray-600">contact@company.dz</p>
              </div>
              <img src="/icons/logo.svg" alt="Company logo" class="w-32" />
            </div>

            <div class="text-center mb-8">
              <h1 class="text-2xl font-bold">Facture</h1>
            </div>

            <div class="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 class="font-medium mb-2">Receipient</h4>
                <p class="text-gray-800">Trybe agency</p>
                <p class="text-gray-600">20 Rue de la madeleine, Hydra, Alger</p>
                <p class="text-gray-600">044995974</p>
                <p class="text-gray-600">contact@brainiac.dz</p>
              </div>
              <div class="text-right">
                <p class="mb-1"><span class="text-gray-600">Date: </span>22 janvier 2024</p>
                <p><span class="text-gray-600">Invoice ID: </span>#56456687</p>
              </div>
            </div> -->

            <!-- Products Table -->
            <!-- <table class="w-full mb-8">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2">Product</th>
                  <th class="text-right py-2">Amount</th>
                  <th class="text-right py-2">Quantité</th>
                  <th class="text-right py-2">Total commission</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in selectedInvoice?.products" :key="index" class="border-b">
                  <td class="py-2">{{ product.name }}</td>
                  <td class="text-right">{{ product.amount }} DA</td>
                  <td class="text-right">{{ product.quantity }}</td>
                  <td class="text-right">
                    {{ product.commission }}
                    <span class="ml-1 px-2 py-0.5 bg-primaryColor-100 text-primaryColor-700 rounded-full text-sm">
                      {{ product.commissionPercentage }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> 
        </div> -->
        <div v-for="page in pages" :key="page">
          <VuePDF :pdf="pdf" :page="page" />
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
import { ref, computed, onMounted } from 'vue'
import Button from 'components/basic/Button.vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'

const showPaymentWarning = ref(true)
const currentTab = ref('all')
const showActionsMenu = ref(false)
const actionMenuTarget = ref(null)
const selectedInvoice = ref(null)
const showPreview = ref(false)
const page = ref(1)
const { pdf, pages } = usePDF('/files/facture.pdf')

// Calculate and set the table top position for the preview panel
onMounted(() => {
  const tableElement = document.querySelector('.bg-white.rounded-lg')
  if (tableElement) {
    const tableTop = tableElement.getBoundingClientRect().top
    document.documentElement.style.setProperty('--table-top', `${tableTop}px`)
  }
})

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
    date: '09-12-24',
    products: [
      { name: 'Product1', amount: '20 000', quantity: 10, commission: '40 000', commissionPercentage: 20 },
      { name: 'Product2', amount: '20 000', quantity: 10, commission: '40 000', commissionPercentage: 20 },
      { name: 'Product3', amount: '20 000', quantity: 5, commission: '40 000', commissionPercentage: 20 },
      { name: 'Product3', amount: '20 000', quantity: 5, commission: '40 000', commissionPercentage: 20 },
      { name: 'Product3', amount: '20 000', quantity: 5, commission: '40 000', commissionPercentage: 20 }
    ]
  },
  {
    id: '56456687',
    status: 'Paid',
    amount: '20 000',
    date: '09-12-24',
    products: [
      { name: 'Product1', amount: '20 000', quantity: 10, commission: '40 000', commissionPercentage: 20 },
      { name: 'Product2', amount: '20 000', quantity: 10, commission: '40 000', commissionPercentage: 20 }
    ]
  },
  {
    id: '56456687',
    status: 'In review',
    amount: '20 000',
    date: '09-12-24',
    products: [
      { name: 'Product1', amount: '20 000', quantity: 10, commission: '40 000', commissionPercentage: 20 }
    ]
  },
  {
    id: '56456687',
    status: 'Rejected',
    amount: '20 000',
    date: '09-12-24',
    products: [
      { name: 'Product1', amount: '20 000', quantity: 10, commission: '40 000', commissionPercentage: 20 }
    ]
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
  selectedInvoice.value = invoice
  showPreview.value = true
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

<style scoped>
.fixed {
  position: fixed;
}
</style>