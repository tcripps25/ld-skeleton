<script setup>
import Pbutton from './buttons/Pbutton.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import Carousel from 'primevue/carousel';


const course = useCourseStore()

const props = defineProps({
    activities: Object,
    weekIndex: Number
})

const week = course.getWeek(props.weekIndex)

const route = (index) => computed(() => `/design/${props.weekIndex}/${index}`);
</script>

<template>
    <div class="max-w-7xl grow ">
        <!-- Grid of activity links to provide an overview, shows limited information about each activity -->
        <div class="grid lg:grid-cols-2 transition-all xl:grid-cols-3 md:grid-cols-1 gap-5">
            <RouterLink v-for="(activity, index) in activities" :to="route(index)"
                class="flex flex-col p-5 h-44 w-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow hover:shadow-lg hover:scale-[102%] transition-all">

                <h4 class="text-sky-50 font-medium text-xl">{{ activity.title }}</h4>
                <div class="mt-auto flex items-center">
                    <p class="text-white text-3xl">{{ activity.duration }} <span
                            class="text-base text-white/80">mins</span></p>
                    <div v-if="activity.selectedTypes && activity.selectedTypes.length > 0"
                        class="bg-white/80 h-7 p-1 rounded-s-full w-max ml-auto -mr-5 flex gap-2">
                        <div v-for="(type) in activity.selectedTypes" class="rounded-full w-5 h-5 p-1"
                            :style="'background-color:' + course.getColorByLabel(type) + ';'">
                        </div>
                    </div>
                </div>
            </RouterLink>
            <!-- Add activity button -->
            <Pbutton @click="course.addActivityToWeek(weekIndex)" ghost label="Add Activity"
                class="p-5 h-44 !w-full text-2xl bg-gradient-to-br rounded-lg flex shadow">

                <template #icon>
                    <PlusIcon class="h-5 w-5" />
                </template>
            </Pbutton>
        </div>
    </div>
</template>