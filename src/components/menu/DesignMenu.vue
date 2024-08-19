<script setup>
import { ref, computed } from 'vue';
import Menu from 'primevue/menu';
import { useRouter, RouterLink } from 'vue-router';
import { useCourseStore } from '@/stores/course.js';

import MenuItem from './MenuItem.vue';
import Pbutton from '../buttons/Pbutton.vue';
import { PlusIcon } from '@heroicons/vue/16/solid';
const course = useCourseStore();

const moduleData = computed(() => {
    // Check if course.weeks exists and has length
    if (!course.weeks || course.weeks.length === 0) {
        // If no weeks, just return the static Schedule item
        return [
            {
                label: 'Schedule',
                route: '/design/schedule'
            }
        ];
    }

    // Combine the static Schedule item with the dynamic weeks items
    return [
        {
            label: 'Schedule',
            route: '/design/schedule'
        },
        ...course.weeks.map((week, index) => ({
            label: week.name,

            route: `/design/schedule/${index}`,
            week: true,
        }))
    ];
});
</script>

<template>


    <nav aria-labelledby="submenulabel">
        <h2 id="submenulabel" class="sr-only">Module Schedule Menu</h2>
        <TransitionGroup class="flex flex-col relative ml-6" name="list" tag="ul">
            <li v-for="(week, index) in moduleData" :key="index"
                class="before:content-[''] before:w-[.1rem] before:bg-slate-400 before:absolute before:top-14 before:left-3 before:bottom-14">
                <MenuItem :item="week" />
            </li>
            <Pbutton class="w-full" @click="course.incrementWeek()" menu-link label="Add Week">
                <template #icon>
                    <PlusIcon class="w-5 h-5" />
                </template>
                >
            </Pbutton>
        </TransitionGroup>

    </nav>

</template>
<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

.v-enter-active,
.v-leave-active {
    transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    height: 0px;
    position: absolute;
    top: 6rem;
}

.drawer-enter-active,
.drawer-leave-active {
    transition: all 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
    height: 0px;
    overflow: hidden;
    margin-top: -1.3rem;
    margin-bottom: -1.3rem;
}
</style>