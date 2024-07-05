<script setup>

</script>

<template>
    <div class="flex flex-col h-screen bg-slate-100/30">
        <slot name="page-header">
        </slot>
        <div class="py-5 px-5 overflow-y-auto">
            <slot></slot>
        </div>
    </div>
</template>