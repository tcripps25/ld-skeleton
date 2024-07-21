<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';
const props = defineProps({
    item: Object,
    weekIndex: Number,
})

const route = useRoute();
const isActive = computed(() => route.path === props.item.route);
</script>

<template>
    <RouterLink class="group" :to="item.route">
        <div class="w-28 h-16 rounded" :class="isActive ? 'bg-sky-600 ' : 'bg-slate-400 group-hover:bg-slate-300'">

        </div>
        <span class="text-sm text-center block mt-1 mb-2">{{ item.label }}</span>
    </RouterLink>
</template>