<script setup>
const props = defineProps({
    activities: Object

})
</script>

<template>
    <div class="max-w-7xl grow bg-slate-100 rounded-lg flex justify-center items-center p-10">
        <p v-if="(activities.length < 1)">No Activities have been added to this week yet.</p>
        <p v-else>Select one of your Activities from the menu on the left.</p>
    </div>
</template>