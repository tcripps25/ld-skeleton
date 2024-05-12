<script setup>
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="flex justify-center content-center h-full">
    <button @click="importFromFile" class="bg-blue-500 text-white px-4 py-2 rounded-md h-max flex items-center gap-1">Import Course <ArrowDownOnSquareIcon class="w-5 h-5"/></button>
  </div>
</template>
