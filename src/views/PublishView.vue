
<script setup>
import Page from '@/components/Page.vue';
import Button from 'primevue/button';
import { DocumentArrowDownIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
import MoodleLogo from '@/assets/moodle.png';
</script>

<template>
    <Page class="h-full">
        <div class="flex justify-center items-center h-full">
            <div class="flex gap-3">
                <div class="p-5 bg-white border w-56 rounded-lg flex flex-col gap-10 items-center justify-between">
                    <img :src="MoodleLogo" class="w-32" alt="University of Portsmouth Logo"></img>
                    <Button>
                        Publish to Moodle
                    </Button>
                </div>
                <div class="p-5 bg-white border w-56 rounded-lg flex flex-col gap-10 items-center justify-between">
                    <DocumentArrowDownIcon class="w-32 h-32 p-6 text-teal-600" />
                    <Button>
                        Save to file
                    </Button>
                </div>
                
            </div>
        </div>
    </Page>
</template>