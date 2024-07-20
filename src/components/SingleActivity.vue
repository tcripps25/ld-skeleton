<script setup>
import Activity from './Activity.vue';
import Panel from './ui/Panel.vue';

const props = defineProps({
    activity: Object,
    activityIndex: Number,
})
</script>

<template>
    <Panel :title="activity.title">
        <Activity :activity="activity" />
    </Panel>
</template>