<template lang="">
    <section class="toy-app container flex flex-col gap-1">
        <button @click="goToEdit">Add a new toy</button>
        <toy-filter @setFilterBy="setFilterBy" :currFilterBy="getFilterBy"/>
        <h1>Your Toys:</h1>
        <toy-list :toys="toysToDisplay" @removeToy="removeToy" />
    </section>
</template>

<script>
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'

export default {
    name: 'toy-app',
    data() {
        return {

        }
    },
    methods: {
        removeToy(toyId) {
            this.$store.dispatch({ type: 'removeToy', id: toyId })
        },
        setFilterBy(filterBy) {
            this.$store.commit({
                type: 'setFilter',
                filterBy
            })
        },
        goToEdit() {
            this.$router.push('/toy/edit')
        }
    },
    computed: {
        toysToDisplay() {
            return this.$store.getters.toysToDisplay
        },
        getFilterBy() {
            return this.$store.getters.currFilterBy
        },
    },
    components: {
        toyList,
        toyFilter
    },
    created() {
        this.$store.dispatch({ type: 'loadToys' })
    },
}

</script>