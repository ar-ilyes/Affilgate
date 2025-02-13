<template>
  <q-layout  view="hHh LpR fFf">
    <!-- Sidebar / Navigation Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      :width="250"
      class="bg-gray-50 h-screen"
    >
      <div class="q-pa-md">
        <img src="/icons/logo.svg" alt="Affilgate" class=" w-44 m-auto my-5" />
        <q-list>
          <q-item
            v-for="item in menuItems"
            :key="item.label"
            :to="item.route"
            clickable
            v-ripple
            active-class="text-primaryColor-500 font-bold"
          >
            <q-item-section avatar>
              <!-- <q-icon :name="item.icon" /> -->
              <img :src="getIconSrc(item)" alt="icon" class="w-6" />
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container class="bg-white">
      <!-- Header Positioned Next to Sidebar -->
      <div class="bg-white text-black py-1 border-b-2 border-gray-50">
        <q-toolbar class="px-6">
          <q-toolbar-title>
            <div class="flex items-center gap-4">
              <Input
                v-model="searchQuery"
                placeholder="Search for a product"
                class="flex-1"
                width="300px"
              >
                <template #prepend>
                  <q-icon name="search" class="text-gray-400" />
                </template>
              </Input>
            </div>
          </q-toolbar-title>

          <div class="flex items-center gap-4">
            <q-btn round flat icon="notifications" />
            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-btn>
          </div>
        </q-toolbar>
      </div>

      <!-- Main Content -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import Input from 'components/basic/Input.vue'
import { useRoute } from 'vue-router'


const leftDrawerOpen = ref(true)
const search = ref('')

const menuItems = [
  { label: 'Marketplace', icon: 'marketplace', route: '/marketplace' },
  { label: 'My products', icon: 'myproducts', route: '/myproducts' },
  { label: 'Invoices', icon: 'invoices', route: '/invoices' },
  { label: 'Performances', icon: 'performance', route: '/performances' },
  { label: 'Settings', icon: 'settings', route: '/settings' }
]

const getIconSrc = (item) => {
  const isActive = route.path === item.route
  return `/icons/${item.icon}${isActive ? '-selected' : ''}.svg`
}
const route = useRoute()

</script>

<style scoped>
/* Ensures the sidebar takes full height */
.full-height {
  height: 100vh;
}


</style>
