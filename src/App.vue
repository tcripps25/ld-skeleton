<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { ArrowDownOnSquareIcon, PlusCircleIcon, PaintBrushIcon, HomeIcon } from '@heroicons/vue/24/solid';


// Define a reactive variable to store the imported data
const weeks = ref([]);

// Function to handle importing JSON data
const importJSON = (jsonData) => {
  try {
    // Parse the JSON data
    const importedData = JSON.parse(jsonData);

    // Validate the structure of the imported data
    if (!Array.isArray(importedData)) {
      throw new Error('Invalid JSON data: Expected an array');
    }

    // Set the imported data to the weeks ref
    weeks.value = importedData;
  } catch (error) {
    console.error('Error importing JSON:', error.message);
    // Optionally, display an error message to the user
  }
};

// Function to trigger import when the file input changes
const importFromFile = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const jsonData = event.target.result;
      importJSON(jsonData);
    };

    reader.readAsText(file);
  };

  input.click();
};

const resetCourse = () => {
  weeks.value = []; // Reset weeks to an empty array
};
</script>

<template>
  <header class="">
    <div class="text-slate-100 flex justify-between w-full p-5">
      <h1 class="text-2xl font-semibold p-2">UoP Learning Designer</h1>
      <nav class="flex gap-2 text-slate-200">
        <button @click="importFromFile" class="bg-blue-500 text-white px-4 py-2 rounded-md h-max flex items-center gap-1">Import Course <ArrowDownOnSquareIcon class="w-5 h-5"/></button>
        <button @click="resetCourse" class="bg-blue-500 text-white px-4 py-2 rounded-md h-max flex items-center gap-1">New Course <PlusCircleIcon class="w-5 h-5"/></button>
      </nav>
    </div>
  </header>
  <sidebar class="p-10 w-min text-slate-200">
    <nav class="flex flex-col gap-5">
        <RouterLink class="aria-current:font-semibold flex gap-2 items-center" to="/"><HomeIcon class="w-5 h-5" /> Home</RouterLink>
        <RouterLink class="aria-current:font-semibold flex gap-2 items-center" to="/design"><PaintBrushIcon class="w-5 h-5" /> Design</RouterLink>
      </nav>
    </sidebar>
  <main class="h-screen p-5 bg-white rounded-ss-lg w-full overflow-scroll">
    <!-- Render the Design view with the imported data -->
  
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :weeks="weeks" />
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
