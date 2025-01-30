<template>
    <q-btn
    >
        <slot name="content">
            <span>{{ label }}</span>
        </slot>
    </q-btn>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        customClass: { type: String, default: '' },
    });

    const computedClass = computed(() => {
        return `bg-primary-500 normal-case text-white py-2 rounded-2xl font-semibold ${props.customClass}`;
    });
</script>

<style scoped></style>