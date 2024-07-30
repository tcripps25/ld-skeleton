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
    reverse: Boolean,
    icon: String,
    severity: String,
    rounded: Boolean,
})

const computedRootClasses = computed(() => {
    return [
        'items-center',
        'p-1',
        'transition',
        'flex',
        'gap-1',
        'text-sm',
        props.label ? 'px-3 py-2' : '',
        props.solid ? 'bg-sky-700 text-sky-50 hover:bg-sky-600' : 'hover:bg-sky-700/10',
        props.solid && (props.severity = "info") ? 'bg-teal-400 text-teal-900 hover:bg-teal-300' : '',
        props.trailing ? 'flex-row-reverse' : 'flex-row',
        props.menuLink ? 'w-48 justify-start' : 'w-max justify-center',
        props.ghost ? 'bg-sky-700/10 dark:bg-white/10 dark:hover:bg-white/50 text-sky-700 hover:bg-sky-700/20' : '',
        props.outline ? 'border-2 border-sky-700 hover:bg-sky-700 hover:text-sky-50' : '',
        props.reverse ? 'text-sky-50' : '',
        props.rounded ? 'rounded-full' : 'rounded'
    ].join(' ');
});

</script>

<template>
    <Button :severity="severity" :icon="icon" :disabled="disabled" unstyled :label="label"
        :aria-label="ariaLabel ? ariaLabel : label" :title="ariaLabel ? ariaLabel : label"
        :pt:root="computedRootClasses" :pt:label="label ? '' : 'hidden'">
        <template #icon>
            <slot name="icon">

            </slot>
        </template>
    </Button>


</template>