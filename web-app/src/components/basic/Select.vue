<template>
    <div>
      <div class="text-gray-600 font-medium text-md mb-1">
        {{label}}
      </div>
      <q-select
        ref="select"
        v-model="modelValue"
        dense
        outlined
        map-options
        emit-value
        class="w-full"
        v-bind="{
          ...$attrs, 
          ...searachableProps, 
          ...createableProps,
          ...multipleProps
        }"
        :use-input="modelValue && !isMultiple ? false : true"
        :error="!!error || !!validation"
        :error-message="error || validation"
        :options="computedOptions"
      >
        <template v-slot:no-option="slotProps">
          <q-item>
            <q-item-section
              v-if="createable"
              class="text-blue-6 cursor-pointer"
              :onclick="()=> createOptionSelect(slotProps.inputValue)"
            >                        
              Créer une nouvelle option: {{ slotProps.inputValue }}
            </q-item-section>
  
            <q-item-section
              v-else
              class="text-gray-500"
            >
              {{ slotProps.inputValue ? "Aucun résultat pour: " + slotProps.inputValue : "Aucun résultat disponible." }}
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </template>
  
  <script setup>
//   import { getOptions, createOption } from "src/api/options"
  import { computed, onMounted, ref } from "vue"
  
  const props = defineProps({
    label: String,
    error: String,
    optionType: String,
    searachable: Boolean,
    createable: Boolean,
    isMultiple: Boolean,
    staticOptions: {
      type: Array,
      default: () => []
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  const modelValue = defineModel()
  const select = ref(null)
  const validation = ref('')
  const options = ref([])
  
  onMounted(() => {
    if (!props.staticOptions.length) {
      fetchOptions()
    }
  })
  
  const computedOptions = computed(() => {
    return props.staticOptions.length ? props.staticOptions : options.value
  })
  
  function fetchOptions(keyword) {
    if (props.staticOptions.length) return
    
    // getOptions(props.optionType, keyword)
    //   .then(({data}) => {
    //     options.value = data
    //   })
    //   .finally()
  }
  
  const createOptionSelect = (val) => {
    if (props.staticOptions.length) {
      const newOption = { label: val, value: val.toLowerCase() }
      options.value.push(newOption)
      if (props.isMultiple) {
        modelValue.value.push(newOption.value)
        select.value.blur()
      } else {
        modelValue.value = newOption.value
      }
      return
    }
  
    // createOption(props.optionType, val)
    //   .then(({status, data, error}) => {
    //     if (!status) validation.value = error
    //     else {
    //       validation.value = ''
    //       options.value.push(data)
    //       if (props.isMultiple) {
    //         modelValue.value.push(data.value)
    //         select.value.blur()
    //       } else {
    //         modelValue.value = data.value
    //       }
    //     }
    //   })
  }
  
  const filterFn = (val, update, abort) => {
    if (props.staticOptions.length) {
      update()
      return
    }
  
    const keywords = val.toLowerCase()
    update(() => {
      fetchOptions(keywords)
    })
  }
  
  const searachableProps = !props.searachable ? {} : {
    onFilter: filterFn,
  }
  
  const createableProps = !props.createable ? {} : {
    onNewValue: createOptionSelect,
  }
  
  const multipleProps = !props.isMultiple ? {} : {
    multiple: true,
    'use-chips': true,
  }
  </script>