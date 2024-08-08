<script setup>
const props = defineProps({
    activities: Object

})
</script>

<template>
    <div class="max-w-7xl grow ">
        <p class="bg-slate-100 rounded-lg flex justify-center items-center p-10" v-if="(activities.length < 1)">No
            Activities have been added to this week yet.</p>
        <div v-else class="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-1 gap-5">
            <div v-for="(activity, index) in activities"
                class="p-10 w-full bg-blue-200 rounded flex justify-center items-center">
                <p>{{ activity.title }}</p>
            </div>
        </div>
    </div>
</template>