<script setup>
import { ref, computed } from "vue";
import { useCourseStore } from '@/stores/course.js'
import { useRouter, RouterLink } from 'vue-router';
import Menu from 'primevue/menu';
import ModuleMenu from '@/components/menu/ModuleMenu.vue'
const router = useRouter();
const course = useCourseStore()

const items = ref([
  {
    label: 'Getting started',
    items: [
      {
        label: 'What is Module Designer?',
        icon: 'pi pi-question-circle',
        route: '/about'
      },
      {
        label: 'Help',
        icon: 'pi pi-info-circle',
        route: '/help'
      },
    ]
  },
  {
    label: 'Design',
    items: [
      {
        label: 'Set Up',
        icon: 'pi pi-cog',
        route: '/'
      },
      {
        label: 'Design',
        icon: 'pi pi-palette',
        route: '/design/overview'
      },
      {
        label: 'Visualise',
        icon: 'pi pi-chart-pie',
        route: '/visualise'
      },
      {
        label: 'Publish',
        icon: 'pi pi-file-export',
        route: '/publish'
      },
    ]
  },
]);

const weeksExist = computed(() => {
  // Check if course.weeks exists and has length
  if (!course.weeks || course.weeks.length === 0) {
    return false
  } else {
    return true
  }
})

</script>

<template>


  <Menu unstyled :model="items" pt:submenuLabel="font-medium text-sm text-slate-500 mt-3 mb-1">
    <template #item="{ item, props }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route"
        active-class="bg-slate-200 text-slate-600 hover:!bg-slate-200 font-semibold"
        class="transition hover:bg-slate-200 gap-2 flex p-2 rounded items-center">
        <div class="flex items-center">
          <span class="text-slate-500" :class="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </RouterLink>
      <ModuleMenu v-if="item.label == 'Design' && weeksExist" class="ml-8 relative" />
    </template>
  </Menu>


</template>