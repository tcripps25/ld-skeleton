<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    label: String,
    ariaLabel: String,
    title: String,
    solid: Boolean,
})

const computedClasses = computed(() => {
    return [
        'justify-center',
        'items-center',
        'rounded',
        'p-1',
        'transition',
        'flex',
        'hover:bg-slate-200',
        'gap-1',
        'text-sm',
        props.label ? 'px-3 py-2' : '',
        props.solid ? 'bg-sky-700 text-sky-50 hover:bg-sky-600' : 'text-sky-600'
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