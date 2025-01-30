<template>
    <q-dialog
        v-model="modelValue"
        persistent
        :maximized="false"
        transition-show="fade"
        transition-hide="fade"
    >
        <q-card class="bg-white rounded-lg shadow-lg p-8 min-w-[300px]">
            <div class="flex flex-col items-center justify-center space-y-4">
            <q-spinner
                color="grey-8"
                size="2em"
            />
            <div class="text-center space-y-2">
                <h3 class="text-lg font-medium text-gray-900">
                    Extraction en cours...
                </h3>
                <p class="text-sm text-gray-500">
                    Veuillez patienter un moment.
                </p>
            </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>

const modelValue = defineModel({
    prop: 'modelValue',
    event: 'update:model-value'
})

defineEmits(['update:model-value'])
</script>

<style scoped>
:deep(.q-dialog__backdrop) {
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.7) !important;
}

</style>