<script setup>
import { ref, computed } from "vue";
import { useCourseStore } from '@/stores/course.js'
import { useRouter, RouterLink, useRoute } from 'vue-router';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';
import DesignMenu from '@/components/menu/DesignMenu.vue'
import MenuItem from "./MenuItem.vue";
const router = useRouter();
const route = useRoute();
const course = useCourseStore()
const isDesignActive = computed(() => route.path.startsWith('/design'));

const menu = ref([
  {
    label: 'Getting started',
    items: [
      {
        label: 'What is Module Designer?',
        icon: 'pi pi-question-circle',
        route: '/'
      },
      {
        label: 'Help',
        icon: 'pi pi-info-circle',
        route: '/help'
      },
    ]
  },
  {
    items: [
      {
        label: 'Set Up',
        icon: 'pi pi-cog',
        route: '/setup'
      },
      {
        label: 'Design',
        icon: 'pi pi-palette',
        child: 'design-menu',
        route: '/design',
        active: isDesignActive
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
  <nav aria-labelledby="mainmenulabel">
    <h2 id="mainmenulabel" class="sr-only">Main Menu</h2>
    <ul class="flex flex-col gap-2">
      <li v-for="(cat, index) in menu">
        <span class="text-slate-500 font-semibold flex mb-1">{{ cat.label }}</span>
        <ul v-if="cat.items">
          <li v-for="(item, index) in cat.items">
            <MenuItem :item="item" />
            <DesignMenu id="design-menu" v-show="isDesignActive" v-if="item.label == 'Design'" />
          </li>
        </ul>
      </li>
    </ul>
  </nav>

</template>