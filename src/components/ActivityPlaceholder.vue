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
            <div v-for="(activity, index) in activities" class="p-5 h-44 w-full bg-sky-500 rounded-lg flex shadow">
                <h4 class="text-sky-50 font-medium text-xl">{{ activity.title }}</h4>
            </div>
        </div>
    </div>
</template>