<template>
    <div 
        class="inline-flex items-center mx-1 px-2 py-1 rounded-md text-sm"
        :class="[
            selected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800',
            removable ? 'pr-1' : ''
        ]"
    >
        <span class="font-medium">{{ label }}</span>
        <button
            v-if="removable"
            @click.stop="$emit('remove')"
            class="ml-1 p-1 rounded-full hover:bg-blue-200 transition-colors"
            :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-200'"
        >
            <q-icon name="close" class="text-md border-2 border-black rounded-full" />
        </button>
    </div>
</template>

<script setup>

defineProps({
    label: {
        type: String,
        required: true
    },
    removable: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Boolean,
        default: false
    }
})

defineEmits(['remove'])
</script>