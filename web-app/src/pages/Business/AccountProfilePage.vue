<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Profile</h1>
      <div>
        <Button 
          v-if="!isEditing"
          label="Edit" 
          variant="filled"
          class="bg-blue-50 text-blue-600"
          @click="isEditing = true"
        />
        <div v-else class="flex gap-4">
          <Button 
            label="Cancel" 
            variant="outline"
            class="text-gray-600"
            @click="cancelChanges"
          />
          <Button 
            label="Save" 
            variant="filled"
            class="bg-blue-50 text-blue-600"
            @click="saveChanges"
          />
        </div>
      </div>
    </div>

    <!-- Background Pattern -->
    <div class="bg-blue-50 rounded-lg h-[200px] pattern-bg relative mb-6">
      <button 
        v-if="isEditing"
        class="absolute bottom-4 left-4 bg-white rounded-full p-2"
        @click="uploadImage"
      >
        <q-icon name="download" class="text-gray-600" />
      </button>

      <div class="absolute -bottom-16 left-6">
        <div class="relative">
          <img 
            :src="profile.image" 
            alt="Profile picture"
            class="w-36 h-36 rounded-lg object-cover"
          />
          <button 
            v-if="isEditing"
            class="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md"
            @click="uploadImage"
          >
            <q-icon name="upload" class="text-gray-600" />
          </button>
        </div>
      </div>
    </div>

    <div class="mb-4 text-gray-500 float-right">
      On platform since {{ profile.joinDate }}
    </div>

    <!-- Main Content Grid -->
    <div class="mt-20 grid grid-cols-5 gap-6">
      <!-- Left Column -->
      <div class="col-span-3">
        <div v-if="!isEditing">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ profile.name }}</h2>
          <p class="text-gray-600 mb-6">{{ profile.bio }}</p>

          <div class="bg-blue-50 rounded-lg px-5 py-4 mb-8">
            <p class="font-bold text-gray-800 text-lg">Marketing</p>
            <div class="space-y-4 mt-4">
              <div>
                <p class="text-gray-500 mb-1">Experience</p>
                <div class="text-gray-800">{{ profile.experience }} years</div>
              </div>
              <div>
                <p class="text-gray-500 mb-1">Target audience</p>
                <div class="text-gray-800">{{ profile.targetAudience }}</div>
              </div>
              <div>
                <p class="text-gray-500 mb-1">Niche</p>
                <div class="text-gray-800">{{ profile.niche }}</div>
              </div>
              <div>
                <p class="text-gray-500 mb-1">Marketing channels used</p>
                <div class="flex gap-2 mt-2">
                  <button 
                    v-for="channel in profile.marketingChannels" 
                    :key="channel"
                    class="px-4 py-1 rounded-full border border-blue-200 text-blue-600 bg-blue-50 flex items-center gap-2"
                  >
                    <q-icon :name="`fab fa-${channel.toLowerCase()}`" size="18px" />
                    {{ channel }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="space-y-6">
          <Input
            v-model="form.name"
            label="Name"
            placeholder="Enter your name"
          />
          
          <Input
            v-model="form.bio"
            label="Bio"
            type="textarea"
            placeholder="Write something about yourself"
          />

          <Input
            v-model="form.experience"
            label="Years of experience"
            type="number"
            placeholder="Enter years of experience"
          />

          <Input
            v-model="form.targetAudience"
            label="Target audience"
            placeholder="Ex: Teenagers"
          />

          <Select
            v-model="form.niche"
            label="Niche"
            :options="nicheOptions"
            placeholder="Select your niche"
          />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Marketing channels used
            </label>
            <Select
              v-model="form.marketingChannels"
              :options="channelOptions"
              multiple
              placeholder="Select marketing channels"
            />
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-span-2">
        <!-- Account Verification -->
        <div class="bg-blue-500 rounded-lg p-6 mb-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="bg-blue-400 rounded-full p-2">
              <q-icon name="verified_user" size="24px" class="text-white" />
            </div>
            <div class="text-white">
              <p class="font-bold">Account verification</p>
              <p class="text-sm opacity-90">Verify Your ID to start marketing products</p>
            </div>
          </div>
          <Button 
            label="Verify my account"
            variant="filled"
            class="bg-[#1D4ED8] text-white w-full"
            @click="verifyAccount"
          />
        </div>

        <!-- Social Media -->
        <div class="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Social media</h3>
          <div v-if="!isEditing" class="space-y-4">
            <a 
              v-for="(link, platform) in profile.socialMedia" 
              :key="platform"
              :href="link"
              class="flex items-center gap-3 text-gray-600"
            >
              <q-icon :name="`fab fa-${platform.toLowerCase()}`" :class="socialIconColors[platform]" />
              <span>{{ link }}</span>
            </a>
          </div>
          <div v-else class="space-y-4">
            <Input
              v-model="form.socialMedia.linkedin"
              placeholder="LinkedIn profile URL"
            >
              <template #prepend>
                <q-icon name="fab fa-linkedin" class="text-[#0077B5]" />
              </template>
            </Input>
            <Input
              v-model="form.socialMedia.instagram"
              placeholder="Instagram profile URL"
            >
              <template #prepend>
                <q-icon name="fab fa-instagram" class="text-[#E4405F]" />
              </template>
            </Input>
            <Input
              v-model="form.socialMedia.facebook"
              placeholder="Facebook profile URL"
            >
              <template #prepend>
                <q-icon name="fab fa-facebook" class="text-[#1877F2]" />
              </template>
            </Input>
          </div>
        </div>

        <!-- Portfolio -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Portfolio</h3>
          <div v-if="!isEditing" class="space-y-2">
            <a 
              v-for="(link, index) in profile.portfolio"
              :key="index"
              :href="link"
              target="_blank"
              class="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span>{{ link }}</span>
              <q-icon name="open_in_new" size="16px" />
            </a>
          </div>
          <div v-else>
            <div v-for="(link, index) in form.portfolio" :key="index" class="flex gap-2 mb-2">
              <Input
                v-model="form.portfolio[index]"
                placeholder="Portfolio URL"
                class="flex-1"
              />
              <Button
                icon="close"
                variant="text"
                @click="removePortfolioLink(index)"
              />
            </div>
            <Button
              label="Add another link"
              variant="text"
              class="text-blue-600 mt-2"
              @click="addPortfolioLink"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Button from 'components/basic/Button.vue'
import Input from 'components/basic/Input.vue'
import Select from 'components/basic/Select.vue'

const isEditing = ref(false)

const profile = reactive({
  name: 'Rym Belamri',
  image: '/images/rym.png',
  bio: 'Lorem ipsum dolor sit amet consectetur. Vitae adipiscing nunc facilisis lorem enim euismod. Mauris sit commodo est tellus purus cursus. Egestas sit enim diam sit consectetur',
  joinDate: '09-11-2024',
  experience: 3,
  targetAudience: 'Teenagers',
  niche: 'Teenagers',
  marketingChannels: ['Instagram', 'Facebook', 'LinkedIn'],
  socialMedia: {
    linkedin: 'linkedin.com/in/example',
    instagram: 'instagram.com/example',
    facebook: 'facebook.com/example'
  },
  portfolio: [
    'http://www.hindPortfolio.com',
    'http://www.hindPortfolio.com'
  ]
})

const form = reactive({
  name: profile.name,
  image: profile.image,
  bio: profile.bio,
  experience: profile.experience,
  targetAudience: profile.targetAudience,
  niche: profile.niche,
  marketingChannels: [...profile.marketingChannels],
  socialMedia: { ...profile.socialMedia },
  portfolio: [...profile.portfolio]
})

const nicheOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Education', value: 'education' },
  { label: 'Lifestyle', value: 'lifestyle' }
]

const channelOptions = [
  { label: 'Instagram', value: 'Instagram' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'LinkedIn', value: 'LinkedIn' },
  { label: 'TikTok', value: 'TikTok' }
]

const socialIconColors = {
  linkedin: 'text-[#0077B5]',
  instagram: 'text-[#E4405F]',
  facebook: 'text-[#1877F2]'
}

const uploadImage = () => {
  // Implement image upload logic
}

const saveChanges = () => {
  Object.assign(profile, {
    name: form.name,
    bio: form.bio,
    experience: form.experience,
    targetAudience: form.targetAudience,
    niche: form.niche,
    marketingChannels: form.marketingChannels,
    socialMedia: form.socialMedia,
    portfolio: form.portfolio
  })
  isEditing.value = false
}

const cancelChanges = () => {
  Object.assign(form, {
    name: profile.name,
    bio: profile.bio,
    experience: profile.experience,
    targetAudience: profile.targetAudience,
    niche: profile.niche,
    marketingChannels: [...profile.marketingChannels],
    socialMedia: { ...profile.socialMedia },
    portfolio: [...profile.portfolio]
  })
  isEditing.value = false
}

const addPortfolioLink = () => {
  form.portfolio.push('')
}

const removePortfolioLink = (index) => {
  form.portfolio.splice(index, 1)
}

const verifyAccount = () => {
  // Implement verification logic
}
</script>

<style scoped>
.pattern-bg {
  background-image: url('/images/pattern-square.svg');
  background-size: cover;
  background-position: center;
}
</style>