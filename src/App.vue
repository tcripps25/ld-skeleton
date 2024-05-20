<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { ArrowDownOnSquareIcon, ArrowUpOnSquareIcon, PlusCircleIcon, PaintBrushIcon, HomeIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js'
import ExportCourseButton from '@/components/buttons/ExportCourseButton.vue'
import ImportCourseButton from '@/components/buttons/ImportCourseButton.vue'
import ResetCourseButton from '@/components/buttons/ResetCourseButton.vue'

const course = useCourseStore()

const courseTitle = ref(course.title)
</script>

<template>
  <header class="">
    <div class="text-slate-100 flex justify-between w-full p-5 items-center">
      <h1 class="text-2xl font-semibold p-2">UoP Learning Designer</h1>
      <input v-model="course.title" type="text" class="text-xl mb-0 bg-transparent text-center" :placeholder="'Course Title'"></input>
      <h2 class="sr-only">{{ course.title }}</h2>
      <nav class="flex gap-2">
        <ImportCourseButton :name="'Import Course'" />
        <ResetCourseButton :name="'Reset Course'" />
        <ExportCourseButton :name="'Export Course'" />
      </nav>
    </div>
  </header>
  <nav class="p-10 w-min text-slate-200">
    <nav class="flex flex-col gap-5">
        <RouterLink class="aria-current:font-semibold flex gap-2 items-center" to="/"><HomeIcon class="w-5 h-5" /> Home</RouterLink>
        <RouterLink class="aria-current:font-semibold flex gap-2 items-center" to="/design"><PaintBrushIcon class="w-5 h-5" /> Design</RouterLink>
      </nav>
    </nav>
  <main class="h-screen p-5 bg-white rounded-ss-lg w-full overflow-scroll">
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
  grid-template-areas: "header header header header"
  "sidebar main main main"
  "footer footer footer footer";
  grid-template-columns: 20rem auto auto auto;
}

header {
  grid-area: header;
}
sidebar {
  grid-area: sidebar;
}

main {
  grid-area: main;
}


</style>
