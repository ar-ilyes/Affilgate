<template>
    <q-dialog 
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value', $event)"
    >
        <q-card style="min-width: 600px" class="px-3 py-2 rounded-lg">
            <q-card-section>
                <div class="flex justify-center items-center">
                    <span class="ml-2 text-black text-2xl font-bold">
                        <slot name="title"></slot>
                    </span>
                </div>
            </q-card-section>
            
            <q-card-section>
                <slot name="content"></slot>
            </q-card-section>
            
            <q-card-actions class="justify-end">
                <slot name="actions">
                    
                </slot>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>

defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    submitLabel: {
        type: String,
        default: 'Enregistrer'
    }
});

defineEmits(['update:model-value', 'close']);
</script>