<template>
  <div class="pa-0 ma-0">
    <v-btn
      :disabled="prev"
      class="mr-2"
      outlined
      small
      @click="getPrev"
      v-text="'上一頁'"
    />

    <v-btn
      :disabled="next"
      outlined
      small
      @click="getNext"
      v-text="'下一頁'"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseButtonPage',
  props: {
    prev: {
      type: Boolean
    },
    next: {
      type: Boolean
    }
  },
  methods: {
    getPrev () {
      this.$emit('get-prev')
    },
    getNext () {
      this.$emit('get-next')
    }
  }
}
</script>
