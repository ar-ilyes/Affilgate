<template>
    <div 
        class="w-full"
        :class="{
            'flex flex-col': labelPosition === 'top',
            'flex flex-row gap-4 items-center ': labelPosition === 'left'
        }"
    >
    <div 
        v-if="label" 
        class="flex-1 text-[#354665] font-medium text-sm mb-1"

    >
        {{ label }} <span v-if="requiredField" class="text-red-600">*</span>
    </div>
    <q-select
        ref="selectRef"
        class="flex-1 w-full"
        v-model="localValue"
        :options="localOptions"
        :loading="loading"
        :use-input="searchable && (!localValue || multiple)"
        :multiple="multiple"
        :error="!!error"
        :error-message="error"
        aria-placeholder=""
        dense
        outlined
        map-options
        emit-value
        @filter="handleFilter"
        @new-value="handleNewValue"
        @update:model-value="handleChange"
    >
            <!-- Multi-select chips (inside the input)-->
            <!-- <template v-if="multiple" v-slot:selected-item="scope" >
                <Chip
                    :label="scope.opt.label"
                    :removable="true"
                    @remove="removeValue(scope.opt.value)"
                />
            </template> -->

            <!-- Single-select display -->
            <template v-slot:selected>
                <div>{{ selectedLabel }}</div>
            </template>

            <!-- No options slot -->
            <template v-slot:no-option="{ inputValue }">
                <q-item>
                    <q-item-section>
                    <template v-if="creatable && inputValue">
                        <div 
                        class="text-blue-600 cursor-pointer"
                        @click="createNewOption(inputValue)"
                        >
                        Créer "{{ inputValue }}"
                        </div>
                    </template>
                    <template v-else>
                        {{ inputValue 
                            ? `Aucun résultat pour: ${inputValue}` 
                            : 'Aucun résultat disponible.'
                        }}
                    </template>
                    </q-item-section>
                </q-item>
            </template>
    </q-select>
    <!-- Multi-select chips (outside the input)-->
    <div 
        v-if="multiple && localValue && localValue.length" 
        class="flex flex-wrap gap-2"
    >
        <Chip
            v-for="value in localValue"
            :key="value"
            :label="getChipLabel(value)"
            :removable="true"
            @remove="removeValue(value)"
        />
    </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Chip from './Chip.vue';

const props = defineProps({
    modelValue: {
        type: [String, Number, Array],
        default: null
    },
    label: {
        type: String,
        default: ''
    },
    labelPosition: {
        type: String,
        default: 'top'
    },
    requiredField: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    fetcher: {
        type: Function,
        default: null
    },
    multiple: {
        type: Boolean,
        default: false
    },
    searchable: {
        type: Boolean,
        default: true
    },
    creatable: {
        type: Boolean,
        default: false
    },
    valueKey: {
        type: String,
        default: 'value'
    },
    labelKey: {
        type: String,
        default: 'label'
    },
    minSearchLength: {
        type: Number,
        default: 1
    },
    useClientFilter: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change', 'create'])

// Refs
const selectRef = ref(null)
const loading = ref(false)
const localOptions = ref([])
const localValue = ref(props.modelValue)

// Computed properties
const selectedLabel = computed(() => {
    if (!localValue.value) return ''
    const option = props.options.find(opt => opt[props.valueKey] === localValue.value)
    return option ? option[props.labelKey] : ''
})

// Methods
const formatOptions = (data) => {
    return data.map(item => ({
        label: item[props.labelKey],
        value: item[props.valueKey],
        raw: item
    }))
}

const handleFilter = async (val, update, abort) => {
    if (val.length < props.minSearchLength && !props.options.length) {
        abort()
        return
    }

    loading.value = true

    try {
        if (props.useClientFilter || !props.fetcher) {
            const filtered = props.options.filter(opt => 
                opt[props.labelKey].toLowerCase().includes(val.toLowerCase())
            )
            update(() => {
                localOptions.value = formatOptions(filtered)
            })
        } else if (props.fetcher) {
            // TODO:
        const result = await props.fetcher(val)
            update(() => {
                localOptions.value = formatOptions(result)
            })
        } else {
            abort()
        }
    } catch (error) {
        console.error('Error fetching options:', error)
        abort()
    } finally {
        loading.value = false
    }
}

const handleNewValue = (val) => {
    if (props.creatable && val) {
        emit('create', val)
    }
}

const handleChange = (value) => {
    emit('update:modelValue', value)
    emit('change', value)
}

const removeValue = (valueToRemove) => {
    if (!props.multiple) return

    const newValue = Array.isArray(localValue.value) 
        ? localValue.value.filter(v => v !== valueToRemove)
        : []
    
    handleChange(newValue)
}

const createNewOption = (value) => {
    const newOption = {
        [props.labelKey]: value,
        [props.valueKey]: value
    }
    emit('create', newOption)
}

const getChipLabel = (value) => {
    const option = props.options.find(opt => opt[props.valueKey] === value)
    return option ? option[props.labelKey] : value
}

// Expose methods and refs for parent components
defineExpose({
    selectRef,
    hideDropdown: () => selectRef.value?.hidePopup(),
    //...
})

// Watchers
watch(() => props.modelValue, (newVal) => {
    localValue.value = newVal
})

watch(() => props.options, (newOptions) => {
    if (newOptions.length > 0) {
        localOptions.value = formatOptions(newOptions)
    }
}, { immediate: true })

onMounted(() => {
    if (props.options.length > 0) {
        localOptions.value = formatOptions(props.options)
    } else if (props.fetcher) {
        handleFilter('', (fn) => fn(), () => {})
    }
})
</script>

<style scoped>
.p-field .q-field__inner{
    background-color: white !important;
    border-radius: 8px;
}

.q-field .q-field__control-container {
    height: 36px;
    min-height: 36px;
}

.q-field .q-field__marginal {
    height: 36px;
}

</style>

<!-- Example of use -->
<!-- <AutoComplete
    ref="autoCompleteRef"
    v-model="selectedCompetence"
    label="Sélectionner une compétence"
    :options="competences"
    :searchable="true"
    :use-client-filter="true"
    :multiple="true"
    @change="() => autoCompleteRef.hideDropdown()"
/> -->
