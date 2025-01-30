<template>
    <div>
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </label>
        <div class="flex">
            <q-select
                v-model="selectedCountry"
                :options="countries"
                dense
                outlined
                class="country-select"
                borderless
                emit-value
                map-options
            >
            <template v-slot:selected-item="scope">
                <div class="flex items-center">
                <img 
                    :src="scope.opt.flag" 
                    class="w-5 h-4 mr-1"
                    :alt="scope.opt.label"
                />
                <span class="text-sm">+{{ scope.opt.value }}</span>
                </div>
            </template>
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                    <img 
                        :src="scope.opt.flag" 
                        class="w-5 h-4"
                        :alt="scope.opt.label"
                    />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>+{{ scope.opt.value }}</q-item-label>
                </q-item-section>
                </q-item>
            </template>
            </q-select>
    
            <q-input
                v-model="phoneNumber"
                dense
                outlined
                class="flex-1"
                :placeholder="placeholder"
                @update:model-value="handlePhoneChange"
                :error="!!error"
                :error-message="error"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '512 34 56 78'
    },
    error: {
        type: String,
        default: ''
    },
})

const emit = defineEmits(['update:model-value'])

const selectedCountry = ref('33')
const phoneNumber = ref('')

// TODO: countries number should be fetched from an API (external or internal ??)
const countries = [
    { 
        label: 'France',
        value: '33',
        flag: 'https://flagcdn.com/w40/fr.png'
    },
    { 
        label: 'Belgium',
        value: '32',
        flag: 'https://flagcdn.com/w40/be.png'
    },
    { 
        label: 'Switzerland',
        value: '41',
        flag: 'https://flagcdn.com/w40/ch.png'
    }
]

// CHECK WITH TEAM: Frontend phone number validation example 
const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{2}(?:[ ]?[0-9]{2}){4}$/
    return phoneRegex.test(number)
}

// TODO: Move this to a utility file
const formatPhoneNumber = (number) => {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '')

    // Format as XX XX XX XX XX
    return cleaned.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
}

const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    phoneNumber.value = formatted
    
    emit('update:model-value', `+${selectedCountry.value}${formatted.replace(/\s/g, '')}`)
}

watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        // Extract country code and phone number
        const match = newVal.match(/^\+(\d{2})(.*)/)
        if (match) {
            selectedCountry.value = match[1]
            phoneNumber.value = formatPhoneNumber(match[2])
        }
    }
    }, { immediate: true }
)

</script>

<style scoped >
.country-select {
    width: 100px;
}

.country-select :deep(.q-field__control) {
    padding-right: 0;
    height: 40px;
    background-color: #E2E8F0;
}

.country-select :deep(.q-field__append) {
    padding-left: 0;
}

:deep(.q-field__control) {
    height: 40px;
}

:deep(.q-field__marginal) {
    height: 40px;
}


</style>