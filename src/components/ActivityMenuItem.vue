<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { computed, ref } from 'vue';
const props = defineProps({
    item: Object,
    index: Number,
    weekIndex: Number,
})

const route = useRoute();
const isActive = computed(() => route.path === props.item.route);

const listNumber = ref(props.index + 1)
</script>

<template>
    <RouterLink class="group" :to="item.route">
        <div class="rounded p-2 w-48 pl-5" :class="isActive ? 'bg-sky-700 text-sky-50' : ' group-hover:bg-slate-100 '">
            <div class="text-sm flex gap-2 items-center">{{ listNumber }}.
                <span class="text-sm block overflow-hidden whitespace-nowrap text-ellipsis">{{ item.label }}</span>
            </div>
        </div>
    </RouterLink>
</template>