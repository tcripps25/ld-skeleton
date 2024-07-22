<script setup>

import { RouterView } from "vue-router";

import MainSidebar from "@/components/MainSidebar.vue"






</script>

<template>
  <div class="flex grow h-screen overflow-hidden">
    <MainSidebar />
    <main class="flex grow bg-white">
      <RouterView class="flex grow relative" />
    </main>
  </div>
</template>