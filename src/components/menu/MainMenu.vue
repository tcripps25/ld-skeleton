<script setup>
import { ref, onMounted } from 'vue'
import { useDesignMenuStore } from '@/stores/designMenu.js'
import { useCourseStore } from '@/stores/course.js'
import MenuItem from '@/components/menu/MenuItem.vue'
import ExportCourseButton from '@/components/buttons/ExportCourseButton.vue'
import ImportCourseButton from '@/components/buttons/ImportCourseButton.vue'
import ResetCourseButton from '@/components/buttons/ResetCourseButton.vue'
import ModalButton from '@/components/buttons/ModalButton.vue'


const menu = useDesignMenuStore()
const course = useCourseStore()

const courseTitle = ref(course.title)
</script>

<template>



  <nav id="main-nav" class="-ml-3">
    <div class="flex flex-wrap items-center justify-between mx-auto p-1">

      <button data-collapse-toggle="navbar-multi-level" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-multi-level" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
        <ul class="flex  gap-0 flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0">
          <MenuItem v-for="(item, index) in menu.items" :item="item" :parentIndex="index" />
        </ul>
      </div>
    </div>
  </nav>


</template>