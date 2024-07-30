<script setup>

import { RouterView } from "vue-router";
import 'primeicons/primeicons.css'
import MainSidebar from "@/components/MainSidebar.vue"
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';


</script>

<template>
  <div class="flex grow h-screen overflow-hidden">
    <MainSidebar />
    <main class="flex grow bg-white">
      <RouterView class="flex grow relative" />
    </main>
  </div>
  <ConfirmDialog></ConfirmDialog>
  <Toast />
</template>