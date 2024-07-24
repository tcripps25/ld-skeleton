<script setup>
import { ref, computed } from 'vue';
import Menu from 'primevue/menu';
import { useRouter, RouterLink } from 'vue-router';
import { useCourseStore } from '@/stores/course.js';

const course = useCourseStore();

const moduleData = computed(() => {
    // Check if course.weeks exists and has length
    if (!course.weeks || course.weeks.length === 0) {
        return [];
    }

    return course.weeks.map((week, index) => ({
        label: week.name,
        icon: 'pi pi-calendar',  // Use any icon class you prefer
        route: `/design/${index}`
    }));
});
</script>

<template>
    <Menu unstyled :model="moduleData" pt:submenuLabel="font-medium text-sm text-slate-500 mt-1 mb-1"
        pt:root="before:-top-0 before:bottom-[2.2rem] before:content-[''] before:rounded before:w-[2px] before:-left-4 before:-mb-5 before:bg-slate-300 before:absolute">
        <template #item="{ item, props }">
            <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route"
                active-class="bg-slate-200 text-slate-600 hover:!bg-slate-200 font-semibold"
                class="relative transition hover:bg-slate-200 gap-2 flex p-2 rounded before:rounded-sm items-center before:content-[''] before:absolute before:-left-4  before:w-3 before:h-0 before:border-b-[2px] before:border-l-[2px] before:top-5 before:bottom-8 before:border-slate-300">
                <div class="flex items-center">
                    <span class="">{{ item.label }}</span>
                </div>
            </RouterLink>
        </template>
    </Menu>
</template>