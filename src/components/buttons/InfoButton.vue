<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
import Button from 'primevue/button';
</script>

<template>
<Button pt:root:class="bg-transparent p-0 h-min rounded-full">
    <InformationCircleIcon class="w-4 h-4 text-teal-600 hover:text-teal-500" />
</Button>
</template>