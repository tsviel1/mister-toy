<template>
    <section class="toy-filter">
        <input type="text"
        v-model="filterBy.name"
        @input="setFilterBy"
        placeholder="search toy..."
        />
        <select v-model="filterBy.status" @change="setFilterBy">
            <option value="all">All</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
        </select>
    </section>
</template>

<script>

export default {
    name: 'toy-filter',
    props: {
      currFilterBy: Object
    },
    data() {
        return {
            filterBy: {
                name: '',
                status: 'all'
            }
        }
    },
    methods: {
        setFilterBy() {
            this.$emit('setFilterBy', {...this.filterBy})
        }
    }
}
</script>