<script setup>
const props = defineProps(['label', "error", 'requiredLabel', 'type'])
</script>

<template>

    <div class="">
        <div class="text-[#354665] font-medium text-md mb-1">
            {{props.label}}
            <span v-if="props.requiredLabel" class="text-red-500">*</span>
        </div>
        <q-input 
            type="textarea"
            dense
            outlined
            borderless
            class="w-full rounded-md border-gray-300 focus:border-blue-400"
            debounce="800"
            v-bind="$attrs"
            :type="props.type"
            :error="!!props.error"
            :error-message="props.error" 
        >
            <slot>
                
            </slot>
        </q-input>
    </div>

</template>

<style>
.p-field .q-field__inner{
    background-color: white !important;
}

.p-field .q-field__control{
    border-radius: 8px;
}




</style>