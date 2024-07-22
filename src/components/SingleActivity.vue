<script setup>
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Activity from './Activity.vue';
import Panel from './ui/Panel.vue';
import ActivityLabel from '@/components/forms/ActivityLabel.vue'
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import Pbutton from './buttons/Pbutton.vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid';


const props = defineProps({
    activity: Object,
    activityIndex: Number,
})
</script>

<template>
    <Panel class="">

        <div class="flex flex-col gap-5">
            <ActivityLabel label="Title" targetId="activity-name" help="Enter a descriptive title for this Activity.">
                <InputText id="activity-name" v-model="activity.title" />
            </ActivityLabel>
            <ActivityLabel label="Instructions" targetId="activity-instructions"
                help="Describe the steps involved in this Activity to your students.">
                <Textarea id="activity-instructions" v-model="activity.instructions" />
            </ActivityLabel>
            <ActivityLabel label="Duration (mins)" targetId="activity-duration"
                help="How long will this Activity take in total.">
                <InputText type="number" min="0" :step="1" id="activity-duration" v-model="activity.duration" />
            </ActivityLabel>
            <ActivityLabel label="Group" targetId="activity-group-toggle" help="Is this a group Activity?">
                <ToggleSwitch v-model="activity.isGroup" inputId="activity-group-toggle" />
            </ActivityLabel>
            <ActivityLabel label="Learning Mode" targetId="activity-mode-select"
                help="Indicate the learning mode of this Activity.">
                <SelectButton id="activity-mode-select" :options="['Sync', 'Async']" aria-labelledby="basic"
                    v-model="activity.mode" />
            </ActivityLabel>
            <!--
            <Activity :activity="activity" />-->
        </div>
    </Panel>
</template>