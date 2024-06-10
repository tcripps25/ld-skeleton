<script setup>
import { ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';

const props = defineProps({
    helpTitle: String,
});

const helpText = props.helpTitle ? props.helpTitle : "See more information";


const infoModal = ref(null);

// Function to show the OverlayPanel
const showInfoModal = (event) => {
    infoModal.value.toggle(event);
};
</script>

<template>
    <Button @click="showInfoModal" :title="'See more information about ' + helpTitle" label="Information"
        pt:root:class="bg-transparent p-0 h-min rounded-full">
        <InformationCircleIcon id="info-icon" class="w-4 h-4 text-teal-600 hover:text-teal-500" />
    </Button>

    <OverlayPanel ref="infoModal">
        <div class="flex flex-col gap-2 max-w-xs bg-white text-sm">
            <slot>

            </slot>
        </div>
    </OverlayPanel>
</template>