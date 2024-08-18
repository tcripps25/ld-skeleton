<script setup>
import Page from '@/components/Page.vue';
import PageHeader from '@/components/PageHeader.vue';

</script>

<template>

    <Page>
        <template v-slot:page-header>
            <PageHeader sectionTitle="Getting Started" title="About Module Designer" />
        </template>
    </Page>
</template>