<template>
    <section v-if="toy" class="toy-details flex flex-col items-center gap-2">
        <article>
            <p> {{ toy.name }}</p>
            <p><span class="fw-bold">Price:</span> ${{ toy.price }}</p>
            <p><span class="fw-bold">Created At:</span> {{ getCreatedAt }}</p>
            <p> {{ getInStock }}</p>
            <p v-if="toy.labels.length > 0"><span class="fw-bold">Labels:</span> {{ toy.labels }}</p>
        </article>
        <button @click="goBack" class="btn btn-primary">go back</button>
        <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
            <div class="form-control my-1">
                <label for="txt" class="form-label fw-600">Your review</label>
                <textarea name="txt" id="txt" rows="3" class="form-input" v-model="reviewToAdd.content"
                    required></textarea>
                <div class="form-control my-1">
                    <label for="rate" class="form-label">Rate</label>
                    <input id="rate" type="number" class="form-input" min="0" max="5"
                        v-model.number="reviewToAdd.rate" />
                </div>
            </div>
            <button class="btn btn-info">Add Review</button>
        </form>
        <div v-if="reviews?.length" class="my-1 flex flex-col gap-1">
            <h3>Reviews by users:</h3>
            <article class="review flex flex-col gap-1 items-start p-3" v-for="review in reviews" :key="review._id">
                <p class="fw-600">Review: {{ review.content }}</p>
                <p>Rate: {{ review.rate }}⭐</p>
                <p>By: {{ review.user?.username }}</p>
                <button v-if="user?.isAdmin" class="btn btn-danger" @click="removeReview(review._id)">
                    Delete review
                </button>
            </article>
        </div>
        <div class="chat-about-toy">
            <h3>Chat about {{toy.name}}</h3>
            <div class="chat-container">
                <ul id="messages">
                    <li class="message" v-for="(msg, idx) in msgs" :key="idx">
                        <span>{{ msg.from }}: </span>{{ msg.txt }}
                    </li>
                </ul>
            </div>
            <form @submit.prevent="sendMsg" id="form">
                <input type="text" v-model="msg.txt" id="input" autocomplete="off" placeholder="Your msg" />
            </form>
        </div>
    </section>
</template>

<script>
import { toyService } from '../services/toy.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { reviewService } from '../services/review.service'
import { userService } from '../services/user.service'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export default {
    name: 'toy-details',
    data() {
        return {
            toy: null,
            reviewToAdd: null,
            msg: { from: 'Guest', txt: '' },
            msgs: [],
            topic: null,
        }
    },
    async created() {
        const { toyId } = this.$route.params
        this.toy = await toyService.getById(toyId)
        const user = this.$store.getters.user


        // review-store
        await this.$store.dispatch({ type: 'getReviews', filterBy: { toyId: this.toy._id } })

        if (user) {
            this.reviewToAdd = await reviewService.getEmptyReview()
            this.reviewToAdd.userId = user._id
            this.reviewToAdd.toyId = this.toy._id
        }
        this.topic = this.toy._id
        socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
        socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
    },
    methods: {
        goBack() {
            this.$router.push('/toy')
        },
        async addReview() {
            try {
                if (!this.reviewToAdd.content) return
                await this.$store.dispatch({ type: 'addReview', review: this.reviewToAdd })
                showSuccessMsg('Review added')
                this.reviewToEdit = { txt: '', aboutUserId: null }
            } catch (err) {
                showErrorMsg('Cannot add review')
            }
        },
        async removeReview(reviewId) {
            try {
                await this.$store.dispatch({ type: 'removeReview', reviewId })
                showSuccessMsg('Review removed')
            } catch (err) {
                showErrorMsg('Cannot remove review')
            }
        },
        addMsg(msg) {
            this.msgs.unshift(msg)
        },
        sendMsg() {
            console.log('Sending', this.msg);
            const user = userService.getLoggedInUser()
            const from = (user && user.fullname) || 'Guest'
            this.msg.from = from
            socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)

            this.msg = { from, txt: '' }
        },
        changeTopic() {
            socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        toyId() {
            return this.$route.params.id
        },
        reviews() {
            return this.$store.getters.reviews
        },
        getCreatedAt() {
            const date = +this.toy.createdAt
            return new Date(date).toLocaleString('en-GB')
        },
        getInStock() {
            if (this.toy.inStock) return 'In stock'
            else return 'Out of stock'
        }
    },
    destroyed() {
        socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
        // socketService.terminate()
    },

}
</script>