<template>
  <section v-if="toyToEdit" class="toy-edit py-2">
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="txt" class="form-label">Toy Name</label>
        <input required v-model="toyToEdit.name" id="txt" type="text" class="form-input"
          placeholder="Enter your toy name here..." />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">Toy Price</label>
        <input required v-model.number="toyToEdit.price" id="price" type="number" class="form-input" />
      </div>
      <div class="form-control">
        <input type="radio" id="in-stock" name="supply" @change="toyToEdit.inStock = true" />
        <label for="in-stock">In stock</label>
        <input type="radio" id="out-of-stock" name="supply" value="out-of-stock" @change="toyToEdit.inStock = false" />
        <label for="out-of-stock">Out of stock</label>
      </div>
      <div class="form-label">
        <label v-for="label in labels">
          <input type="checkbox" v-model="label.selected"> {{ label.name }}
        </label>
        <br />
        Selected labels: {{ selectedLabels }}
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-info">save</button>
        <button @click="goBack" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { toyService } from '../services/toy.service.js'

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
      labels: [
        { name: 'Funny', selected: false },
        { name: 'Educational', selected: false },
        { name: 'Battery powered', selected: false },
        { name: 'Board game', selected: false },
        { name: 'new', selected: false },
      ]
    }
  },
  computed: {
    selectedLabels() {
      return this.labels.filter(labels => labels.selected).map(label => label.name)
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      toyService.getById(id).then((toy) => {
        this.toyToEdit = toy
      })
    } else this.toyToEdit = toyService.getEmptyToy()
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
    saveToy() {
      this.toyToEdit.labels = this.selectedLabels
      console.log('this.toyToEdit', this.toyToEdit)
      
      this.$store.dispatch({ type: 'saveToy', toy: {...this.toyToEdit} })
        .then((reply) => {
          this.$router.push('/toy')
        })
    },
    changeLabel(e) {
      this.toyToEdit.labels.push(e.target.value)
    }
  },
}
</script>
