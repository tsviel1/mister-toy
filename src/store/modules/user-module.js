import { userService } from '../../services/user.service'

export default {
    state: {
        loggedinUser: userService.getLoggedInUser(),
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },
    },
    mutations: {

    },
    actions: {
        
    }
};
