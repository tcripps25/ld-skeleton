<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    label: String,
    ariaLabel: String,
    title: String,
    solid: Boolean,
    disabled: Boolean,
    trailing: Boolean,
    menuLink: Boolean,
    ghost: Boolean,
    outline: Boolean,
})

const computedRootClasses = computed(() => {
    return [
        'items-center',
        'rounded',
        'p-1',
        'transition',
        'flex',
        'gap-1',
        'text-sm',
        props.label ? 'px-3 py-2' : '',
        props.solid ? 'bg-sky-700 text-sky-50 hover:bg-sky-600' : 'hover:bg-slate-200 text-sky-600',
        props.trailing ? 'flex-row-reverse' : 'flex-row',
        props.menuLink ? 'w-full justify-start' : 'w-max justify-center',
        props.ghost ? 'bg-slate-100 dark:bg-zinc-800 text-sky-700' : 'hover:bg-slate-200 text-sky-600',
        props.outline ? 'border-2 border-sky-700 hover:bg-sky-700 hover:text-sky-50' : ''  
    ].join(' ');
});

</script>

<template>
    <Button :disabled="disabled" unstyled :label="label" :aria-label="ariaLabel ? ariaLabel : label"
        :title="ariaLabel ? ariaLabel : label" :pt:root="computedRootClasses" :pt:label="label ? '' : 'hidden'">
        <template #icon>
            <slot name="icon">

            </slot>
        </template>
    </Button>


</template>