<template>
  <div class="bg-white rounded-lg p-8 shadow-md w-full">
    <div class="rounded-full p-3 inline-flex mb-4">
        <img src="/images/personal-info.png" alt="">
    </div>
    <h1 class="text-2xl font-bold mb-2">Personal information</h1>
    <p class="text-gray-600 mb-8">Please provide us with your personal information</p>

    <form @submit.prevent="handleSubmit">
      <Input
        v-model="form.fullName"
        label="Full name"
        placeholder="First and last name"
        :error="errors.fullName"
        class="mb-4"
      />

      <div class="mb-4">
        <label class="block text-gray-600 font-medium mb-2">Gender</label>
        <div class="flex gap-4">
          <label 
            class="flex-1 cursor-pointer"
            :class="{ 'gender-selected': form.gender === 'female' }"
          >
            <input
              type="radio"
              v-model="form.gender"
              value="female"
              class="sr-only"
            />
            <div class="gender-option">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="8" r="5"/>
                <path d="M12 13v8M9 18h6"/>
              </svg>
              <span>Female</span>
            </div>
          </label>
          <label 
            class="flex-1 cursor-pointer"
            :class="{ 'gender-selected': form.gender === 'male' }"
          >
            <input
              type="radio"
              v-model="form.gender"
              value="male"
              class="sr-only"
            />
            <div class="gender-option">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="10" cy="12" r="5"/>
                <path d="M14 8l5-5M17 3h2v2"/>
              </svg>
              <span>Male</span>
            </div>
          </label>
        </div>
        <span v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender }}</span>
      </div>

      <Input
        v-model="form.birthday"
        label="Birthday"
        type="date"
        placeholder="DD/MM/YYYY"
        :error="errors.birthday"
        class="mb-6"
      />

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

<script setup >
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Input from 'components/basic/Input.vue'
import Button from 'components/basic/Button.vue'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  fullName: '',
  gender: '',
  birthday: ''
})

const errors = reactive({
  fullName: '',
  gender: '',
  birthday: ''
})

const handleSubmit = async () => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Validate
  if (!form.fullName) errors.fullName = 'Full name is required'
  if (!form.gender) errors.gender = 'Please select your gender'
  if (!form.birthday) errors.birthday = 'Birthday is required'
  if (Object.values(errors).some(error => error)) return

  try {
    loading.value = true
    // Handle form submission
    await router.push('/onboarding/business-info')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.gender-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  color: #64748b;
  transition: all 0.2s;
}

.gender-selected .gender-option {
  border-color: #f97316;
  background-color: #fff7ed;
  color: #f97316;
}

.gender-option:hover {
  border-color: #f97316;
}
</style>