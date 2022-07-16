import { authService } from '../../services/auth.service'

export default {
    state: {
        loggedInUser: null,
    },
    getters: {

    },
    mutations: {
        setUser(state, {user}) {
            state.loggedInUser = user
        },
        removeUser(state) {
            state.loggedInUser = null
        }

    },
    actions: {
        signup: async ({ commit }, {signupInfo}) => {
            try {
                const user = await authService.signup(signupInfo)
                commit({type: 'setUser', user})
            } catch (err) {
                console.log(err);
            }
        },
        login: async ({ commit }, { credentials }) => {
            try {
                const user = await authService.login(credentials)
                commit({type: 'setUser', user})
            } catch (err) {
                console.log(err);
            }
        },
        logout: async ({commit}) => {
            try {
                await authService.logout()
                commit({type: 'removeUser'})
            } catch (err) {
                console.log(err);
            }
        }
    },
};
