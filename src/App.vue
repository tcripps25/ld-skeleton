<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { PaintBrushIcon, HomeIcon } from '@heroicons/vue/24/solid';
import { useCourseStore } from '@/stores/course.js';
import { useDesignMenuStore } from '@/stores/designMenu.js';
import { PencilIcon } from '@heroicons/vue/16/solid';
import AddWeekButton from './components/buttons/AddWeekButton.vue';
import ExportCourseButton from './components/buttons/ExportCourseButton.vue';
import ImportCourseButton from './components/buttons/ImportCourseButton.vue';
import ResetCourseButton from './components/buttons/ResetCourseButton.vue';

import MainMenu from '@/components/menu/MainMenu.vue';

const course = useCourseStore();
const designMenu = useDesignMenuStore();
const courseTitle = ref('');
const editTitle = ref(false);

const toggleTitleEdit = () => {
  editTitle.value = !editTitle.value;
};

const submitTitle = () => {
  if (courseTitle.value.trim() !== '') {
    course.title = courseTitle.value.trim();
    editTitle.value = false;
  }
};
console.log(course.title);
</script>

<template>
  
  <div id="sidebar" class="px-7 py-5 flex flex-col gap-5 border-r">
    <header class="text-slate-800 flex flex-col">
      <div class="flex justify-between mb-3">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <h1 class="text-2xl font-semibold">Designer</h1>
    </a>
    </div>
    <hr class="my-3">
    <div class="flex gap-3 justify-around">
      <ImportCourseButton />
      <ResetCourseButton />
      <ExportCourseButton />
    </div>
    <hr class="my-3">
  </header>
 
    <div class="flex flex-col gap-1 text-slate-200">
      <Transition>
      <div v-if="course?.title" class="flex items-center gap-3 justify-between">
        <h2 @click="toggleTitleEdit" class="text-slate-600 font-semibold text-xl">{{ course.title }}</h2>
        <button name="Edit course title" id="course-title-edit" title="Edit Course Title" @click="toggleTitleEdit">
          <PencilIcon
            :class="{'bg-sky-400 text-slate-700 hover:!bg-sky-300': editTitle}"
            class="w-7 h-7 p-2 text-slate-700 hover:bg-slate-300 rounded-full transition"
          />
        </button>
      </div>
    </Transition>
    <Transition class="bg-slate-200 p-2 rounded border border-sky-400">
      <div class="block overflow-hidden" v-if="!course?.title || editTitle">
        <label class="text-slate-500 mb-1 block" for="course-title-input">Edit course title: </label>
        <input
          id="course-title-input"
          v-model="courseTitle"
          type="text"
          class="text-lg mb-0 rounded p-1 border-slate-300 bg-slate-50 text-slate-800 w-full"
          @keyup.enter="submitTitle"
        />
      </div>
    
    </Transition>
    </div>
 
    <div class="text-slate-200">
    
      <nav class="flex flex-col gap-2 text-slate-600">
        <RouterLink :active-class="'bg-sky-400 text-blue-900 hover:!bg-sky-400'" class="transition hover:bg-slate-300 gap-3 aria-current:font-semibold flex p-2 rounded items-center" to="/">
          <HomeIcon class="w-5 h-5" /> Dashboard
        </RouterLink>
        <RouterLink :active-class="'bg-sky-400 text-blue-900 hover:!bg-sky-400'" class="transition hover:bg-slate-300 aria-current:font-semibold flex gap-3 p-2 rounded items-center" to="/design">
          <PaintBrushIcon class="w-5 h-5" /> Design
        </RouterLink>
      </nav>
   
  </div>

  </div>
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
