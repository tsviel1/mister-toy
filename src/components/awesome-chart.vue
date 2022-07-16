<template>
    <DoughnutChart :chartData="testData" />
</template>

<script lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: 'Home',
    props: {
        testData: Object
    },
    components: { DoughnutChart },

};
</script>