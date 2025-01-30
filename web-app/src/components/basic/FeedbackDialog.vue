<template>
  <q-dialog :modelValue="modelValue" @update:modelValue="updateVisibility">
    <q-card style="width:fit-content; max-width: 80vw;" class="!rounded-3xl ">

      <q-card-section class="flex flex-col items-center gap-y-4">
        <slot name="icon"></slot>
        <div class="text-xl text-center font-bold">{{ title }}</div>
        <div class=" w-96 !text-muted text-center opacity-55">{{ text }}</div>
        <slot name="warning"></slot>

        <q-card-actions class="w-full flex justify-evenly px-2 items-center">
          <slot name="actions"></slot>
        </q-card-actions>
      </q-card-section>



    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps(['text', 'title']);
</script>
