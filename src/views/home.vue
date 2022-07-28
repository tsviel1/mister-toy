<template>
    <div>
        <h2>home sweet home</h2>
    </div>
    <section v-if="user" class="user-info">
        <pre>
                {{ user }}
            </pre>
        <button @click="logout">Logout</button>
    </section>
    <form v-else @submit.prevent="onLogin">
        <input type="text" v-model="credentials.username" placeholder="username">
        <input type="password" v-model="credentials.password" placeholder="password">
        <button>Login</button>
    </form>
    <hr />
    <form @submit.prevent="signup">
        <h2>Signup</h2>
        <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
        <input type="text" v-model="signupInfo.username" placeholder="Username" />
        <input type="password" v-model="signupInfo.password" placeholder="Password" />
        <button>Signup</button>
    </form>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            user: null,
            credentials: {
                username: '',
                password: ''
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async onLogin() {
            try {
                const user = await this.$store.dispatch({ type: 'login', userCred: this.credentials })
                this.user = user
            } catch(err) {
                console.log('cannot login', err);
            }
        },
        async signup() {
            try {
                const user = await this.$store.dispatch({ type: 'signup', userCred: this.signupInfo })
                this.user = user
            } catch(err) {
                console.log(err);
            }
        },
        async logout() {
            try {
                await this.$store.dispatch({ type: 'logout' })
                this.user = null
            } catch(err) {
                console.log('cannot logout', err);
            }
        }
    },
    created() {
        this.user = this.$store.getters.loggedinUser
    }
}
</script>

<style>
</style>