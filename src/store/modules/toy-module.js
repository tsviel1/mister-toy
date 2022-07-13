import { toyService } from '../../services/toy.service'

export default {
    state: {
        toys: [],
        currFilterBy: null
    },
    getters: {
        toysToDisplay(state) {
            var toys = state.toys
            console.log('state.currFilterBy', state.currFilterBy)
            

            if (state.currFilterBy?.status === 'in-stock') {
                console.log('hello');
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
            console.log('savedToy', savedToy)
            const idx = state.toys.findIndex((currToy) => currToy._id === savedToy._id)
            if (idx !== -1) state.toys.splice(idx, 1, savedToy)
            else state.toys.unshift(savedToy)
        },
        setFilter(state, { filterBy }) {
            state.currFilterBy = filterBy
        }
    },
    actions: {
        loadToys({ commit }) {
            toyService.query()
                .then((toys) => {
                    commit({ type: 'setToys', toys })
                })
        },
        removeToy({ commit }, { id }) {
            return toyService.remove(id)
                .then(() => {
                    commit({ type: 'removeToy', id })
                })
        },
        saveToy({ commit }, { toy }) {
            return toyService.save(toy)
                .then((savedToy) => {
                    commit({ type: 'saveToy', savedToy })
                })
        }
    },
};