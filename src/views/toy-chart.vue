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
                        backgroundColor: ['#77CEFF', '#0079AF'],
                    },
                ],
            },
            pricesData: {
                labels: ['less than $59.99', 'more than $60'],
                datasets: [
                    {
                        data: [this.$store.getters.currNotExpensive, this.$store.getters.currExpensive],
                        backgroundColor: ['#77CEFF', '#0079AF'],
                    },
                ],
            },
        }
    },
}
</script>