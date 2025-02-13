<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-1">Performances</h1>
    <p class="text-customGray-600 font-medium mb-6">Track your products performance and revenue</p>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
      <!-- Left Column: Stats and Performance Table -->
      <div>
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Sales"
            :value="stats.totalSales"
          />
          <StatCard
            title="Total Commissions paid"
            :value="stats.totalCommissions"
            unit="DA"
          />
          <StatCard
            title="Total revenue"
            :value="stats.totalRevenue"
            unit="DA"
          />
          <StatCard
            title="Total clicks"
            :value="stats.totalClicks"
          />
        </div>

        <!-- Performance Table Section -->
        <PerformanceTable
          :products="products"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>

      <!-- Right Column: Top Performing Products -->
      <div class="lg:sticky lg:top-6">
        <TopPerformingProducts :products="topProducts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatCard from 'components/performance/StatCard.vue'
import PerformanceTable from 'components/performance/PerformanceTable.vue'
import TopPerformingProducts from 'components/performance/TopPerformingProducts.vue'

const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(10)

const stats = ref({
  totalSales: 200,
  totalCommissions: '50 000',
  totalRevenue: '15 000',
  totalClicks: 8000
})

const products = ref([
  {
    id: 1,
    title: 'Product title',
    image: '/images/airpods.png',
    totalSales: 5820,
    commission: '5 6000',
    commissionPercentage: 40,
    revenue: '45 000',
    clicks: 200,
    conversionRate: 10.5
  },
  {
    id: 2,
    title: 'Product title',
    image: '/images/airpods.png',
    totalSales: 5820,
    commission: '5 6000',
    commissionPercentage: 40,
    revenue: '45 000',
    clicks: 200,
    conversionRate: 10.5
  },
  {
    id: 3,
    title: 'Product title',
    image: '/images/airpods.png',
    totalSales: 5820,
    commission: '5 6000',
    commissionPercentage: 40,
    revenue: '45 000',
    clicks: 200,
    conversionRate: 10.5
  }

])

const topProducts = ref([
  {
    id: 1,
    title: 'Product title',
    image: '/images/airpods.png',
    revenue: '85 000'
  },
  {
    id: 2,
    title: 'Product title',
    image: '/images/airpods.png',
    revenue: '40 000'
  },
  {
    id: 3,
    title: 'Product title',
    image: '/images/airpods.png',
    revenue: '15 000'
  }
])

const handlePageChange = (page) => {
  currentPage.value = page
  // Implement pagination logic here
}
</script>