<script setup>
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Activity from './Activity.vue';
import Panel from './ui/Panel.vue';


const props = defineProps({
    activity: Object,
    activityIndex: Number,
})
</script>

<template>
    <Panel :title="activity.title">
        <InputText v-model="activity.title" />
        <Activity :activity="activity" />
    </Panel>
</template>