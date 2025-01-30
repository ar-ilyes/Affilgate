<template>
    <q-scroll-area
        :thumb-style="thumbStyle"
        class="space-y-6"
    >
        <slot></slot>
    </q-scroll-area>
</template>

<script setup>
import { ref } from 'vue';

const thumbStyle = ref({
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
    opacity: 0.75
})

</script>

<style></style>