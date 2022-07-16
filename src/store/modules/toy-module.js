import { toyService } from '../../services/toy.service'

export default {
    state: {
        toys: [],
        currFilterBy: null
    },
    getters: {
        toysToDisplay(state) {
            var toys = state.toys
            if (state.currFilterBy?.status === 'in-stock') {
                toys = toys.filter(toy => toy.inStock)
            } else if (state.currFilterBy?.status === 'out-of-stock') {
                toys = toys.filter(toy => (!toy.inStock))
            }
            if (state.currFilterBy?.name) {
                const regex = new RegExp(state.currFilterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            return toys
        },
        currFilterBy(state) {
            return state.currFilterBy
        },
        currInStock(state) {
            const numberOfInStock = state.toys.filter(toy => toy.inStock)
            return numberOfInStock.length
        },
        currOutOfStock(state) {
            const numberOutOfStock = state.toys.filter(toy => !toy.inStock)
            return numberOutOfStock.length
        },
        currNotExpensive(state) {
            const notExpensive = state.toys.filter(toy => +toy.price >= 60)
            return notExpensive.length
        },
        currExpensive(state) {
            const expensive = state.toys.filter(toy => +toy.price < 60)
            return expensive.length
        },
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        removeToy(state, { id }) {
            const idx = state.toys.findIndex((toy) => toy._id === id)
            state.toys.splice(idx, 1)
        },
        saveToy(state, { savedToy }) {
            const idx = state.toys.findIndex((currToy) => currToy._id === savedToy._id)
            if (idx !== -1) state.toys.splice(idx, 1, savedToy)
            else state.toys.push(savedToy)
        },
        setFilter(state, { filterBy }) {
            state.currFilterBy = filterBy
        }
    },
    actions: {
        loadToys: async ({ commit }) => {
            try {
                const toys = await toyService.query()
                commit({ type: 'setToys', toys })
            } catch (err) {
                console.log(err)
            }
        },
        removeToy: async ({ commit }, { id }) => {
            try {
                await toyService.remove(id)
                commit({ type: 'removeToy', id })
            } catch (err) {
                console.log(err)
            }
        },
        saveToy: async ({ commit }, { toy }) => {
            try {
                const savedToy = await toyService.save(toy)
                console.log('savedToy from actions:', savedToy)
                commit({type: 'saveToy', savedToy})
            } catch (err) {
                console.log(err)
            }
        }
    },
};
