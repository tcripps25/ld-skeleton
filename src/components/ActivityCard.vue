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
        <div class="rounded-e p-2 w-48 pl-5"
            :class="isActive ? 'bg-sky-700 text-sky-50' : ' group-hover:bg-slate-100 '">
            <span class="text-sm block overflow-hidden whitespace-nowrap text-ellipsis">{{ item.label }}</span>
        </div>
    </RouterLink>
</template>