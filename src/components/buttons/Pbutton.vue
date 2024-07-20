<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    label: String,
    ariaLabel: String,
    title: String,
})

const computedClasses = computed(() => {
    return [
        'text-sky-600',
        'justify-center',
        'items-center',
        'rounded',
        'p-1',
        'transition',
        'flex',
        'hover:bg-slate-200',
        'gap-1',
        props.label ? 'px-2' : ''
    ].join(' ');
});

</script>

<template>
    <Button unstyled :label="label" :aria-label="ariaLabel ? ariaLabel : label" :title="ariaLabel ? ariaLabel : label"
        :pt:root="computedClasses" :pt:label="label ? '' : 'hidden'">
        <template #icon>
            <slot name="icon">

            </slot>
        </template>
    </Button>


</template>