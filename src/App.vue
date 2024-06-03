<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useCourseStore } from '@/stores/course.js';
import { useDesignMenuStore } from '@/stores/designMenu.js';
import AddWeekButton from './components/buttons/AddWeekButton.vue';
import ExportCourseButton from './components/buttons/ExportCourseButton.vue';
import ImportCourseButton from './components/buttons/ImportCourseButton.vue';
import ResetCourseButton from './components/buttons/ResetCourseButton.vue';
import { PencilIcon } from '@heroicons/vue/16/solid';
import MainNav from '@/components/menu/MainNav.vue';
import Logo from '@/assets/uop_logo.png';

const course = useCourseStore();
const designMenu = useDesignMenuStore();


console.log(course.title);
</script>

<template>
  
  <div id="sidebar" class="px-7 py-5 flex flex-col gap-5 border-r bg-white">
    <header class="text-slate-800 flex flex-col">
      <div class="flex justify-between mb-3">
        <img :src="Logo" class="w-12" alt="University of Portsmouth Logo"></img>
    <a href="#" class="flex flex-col">
        <h1 class="text-2xl font-semibold">Module Designer</h1>
        <p>v0.1 June 2024</p>
    </a>
    </div>
    
    <div class="flex gap-3 py-2 my-3 bg-slate-100 rounded justify-around">
      <ImportCourseButton />
      <ResetCourseButton />
      <ExportCourseButton />
    </div>
    
  </header>
 
    
 
    <div class="text-slate-200">
    
     <MainNav />
   
  </div>

  </div>
  <main class="h-screen p-5 bg-slate-100 rounded-ss-lg w-full overflow-scroll">
    <!-- Render the Design view with the imported data -->
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style>
#app {
  display: grid;
  grid-template-areas: "sidebar main main main" "footer footer footer footer";
  grid-template-columns: 20rem auto auto auto;
}

header {
  grid-area: header;
}
#sidebar {
  grid-area: sidebar;
}

main {
  grid-area: main;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
