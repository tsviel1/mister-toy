<template>
    <section class="toy-chart container flex flex-col gap-1">
        <h1>some charts:</h1>
        <awesomeChartVue :testData="testData"></awesomeChartVue>
        <awesomeChartVue :testData="pricesData"></awesomeChartVue>
    </section>
</template>

<script>
import awesomeChartVue from '../components/awesome-chart.vue'
export default {
    name: 'toy-chart',
    components: {
        awesomeChartVue
    },
    data() {
        return {
            testData: {
                labels: ['In stock', 'Out of stock'],
                datasets: [
                    {
                        data: [this.$store.getters.currInStock, this.$store.getters.currOutOfStock],
                        backgroundColor: ['#60c730', '#e84f38'],
                    },
                ],
            },
            pricesData: {
                labels: ['less than $60', '$60 or more'],
                datasets: [
                    {
                        data: [this.$store.getters.currNotExpensive, this.$store.getters.currExpensive],
                        backgroundColor: ['#e8c838', '#f54c2f'],
                    },
                ],
            },
        }
    },
}
</script>