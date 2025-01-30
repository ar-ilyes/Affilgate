<script setup>
import { computed, ref } from 'vue';


const props = defineProps(['label', "error", 'requiredLabel', 'type'])
const isTextarea = computed(() => props.type === 'textarea');

const containerClass = computed(() => ({
  'mb-2': !!props.error, // Adds margin-bottom if there's an error
}));

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>

<template>

    <div class="p-field">
        <div class="text-[#354665] font-medium text-md mb-1">
            {{props.label}}
            <span v-if="props.requiredLabel" class="text-red-500">*</span>
        </div>
        <q-input 
            dense
            outlined
            borderless
            class="w-full rounded-md border-slate-200 hover:border-blue-400"
            :class="{'input-dense': !isTextarea, containerClass}"
            debounce="800"
            v-bind="$attrs"
            :type="inputType"
            :error="!!props.error"
            :error-message="props.error" 
        >
            <template v-if="props.type === 'password'" v-slot:append>
                <q-icon
                    name="visibility_off"
                    v-if="!showPassword"
                    @click="togglePasswordVisibility"
                    class="cursor-pointer text-slate-400 text-base"
                />
                <q-icon
                    name="visibility"
                    v-else
                    @click="togglePasswordVisibility"
                    class="cursor-pointer text-slate-400 text-base"
                />
            </template>
            <slot></slot>
        </q-input>
    </div>

</template>

<style>
.p-field .q-field__inner.input-dense {
    background-color: white !important;
    border-radius: 8px;
}

.p-field .q-field__control.input-dense {
    border-radius: 8px;
    height: 40px;
}
</style>