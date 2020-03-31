<template>
  <v-row
    align="center"
    class="ml-1"
    :justify="justify"
  >
    <v-btn-toggle
      v-model="toggle_exclusive"
      dense
      mandatory
    >
      <v-btn
        v-for="item in imageSize"
        :key="item.text"
        class="btn-change-size"
        icon
        @click="changeSize(item.text)"
      >
        <span v-text="item.text" />
      </v-btn>
    </v-btn-toggle>
  </v-row>
</template>

<script>
export default {
  name: 'BaseImageSizeChanger',
  props: {
    currentSize: { type: String, default: '小' },
    imageSize: {
      type: Array,
      default: () => {
        return [
          { text: '小', cols: '2' },
          { text: '中', cols: '3' },
          { text: '大', cols: '4' }
        ]
      }
    },
    justify: { type: String, default: 'start' }
  },
  data () {
    return {
      toggle_exclusive: 0
    }
  },
  methods: {
    changeSize (size) {
      this.$emit('change-size', size)
    }
  }
}
</script>
