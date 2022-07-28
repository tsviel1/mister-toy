<template>
  <section v-if="user && userReviews" class="flex flex-col gap-1 my-2">
    <h2>
      Reviews by <span class="clr-teal">{{ user.fullname }}</span>
    </h2>
    <article class="review p-2" v-for="review in userReviews" :key="review._id">
      <h1>
        by <span class="clr-teal">{{ review.user.username }}</span> about
        <span class="clr-teal">{{ review.toy.name }}</span>
      </h1>
      <p>{{ review.content }}</p>
      <p>{{ review.rate }}⭐</p>
    </article>
  </section>
  <section v-else class="text-center my-5 flex flex-col gap-2">
    <h2>Login first to see your reviews</h2>
    <button @click="$router.push('/login')" class="btn btn-primary-text">
      go to login page
    </button>
  </section>
</template>

<script>
export default {
  name: 'user-details',
  data() {
    return {
      userReviews: null,
    }
  },
  async created() {
    const userId = this.$store.getters.user?._id
    if (userId) {
      this.userReviews = await this.$store.dispatch({
        type: 'getReviews',
        filterBy: { userId },
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
}
</script>

<style></style>
