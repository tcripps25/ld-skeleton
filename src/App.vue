<script setup>

import { RouterView } from "vue-router";
import 'primeicons/primeicons.css'
import MainSidebar from "@/components/MainSidebar.vue"
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';

const buildClasses = process.env.NODE_ENV === 'production' ? '-mt-[60px] pt-[60px]' : '';
</script>

<template>
  <div class="flex grow h-screen overflow-hidden" :class="buildClasses">
    <MainSidebar />
    <main class="flex grow bg-white">
      <RouterView class="flex grow relative" />
    </main>
  </div>
  <ConfirmDialog class="!rounded">
  </ConfirmDialog>
  <Toast />
  <DynamicDialog />
</template>