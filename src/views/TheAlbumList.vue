<template>
  <v-card
    id="views-the_album_list"
    class="pa-2"
    outlined
  >
    <v-card-text
      class="pa-1"
      v-text="'相簿列表'"
    />

    <v-divider />

    <v-card-text class="pa-1">
      <BaseImageSizeChanger
        :current-size="currentSize"
        :image-size="imageSize"
        justify="start"
        @change-size="changeSize"
      />
    </v-card-text>

    <v-divider />

    <v-card-text class="text-right pa-2">
      <BaseButtonPage
        :prev="currentPage <= 1"
        :next="currentPage >= lastPage"
        @get-prev="getPrev"
        @get-next="getNext"
      />
    </v-card-text>

    <v-card-text class="py-0">
      <v-row>
        <v-col
          v-for="item in sets"
          :key="item.id"
          :cols="currentCols"
        >
          <router-link :to="{name:'TheAlbumSet',params:{setId:item.id}}">
            <v-skeleton-loader
              v-if="isLoading"
              class="skeleton-image-square"
              type="image"
            />
            <v-img
              v-if="!isLoading"
              :src="item.thumb"
            />
          </router-link>

          <router-link :to="{name:'TheAlbumSet',params:{setId:item.id}}">
            {{ item.title }}
          </router-link>

          <v-card-text
            v-show="item.total_pictures > 0"
            class="pa-0"
            v-text="`${item.total_elements}張相片`"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="text-center">
      <BaseButtonPage
        :prev="currentPage <= 1"
        :next="currentPage >= lastPage"
        @get-prev="getPrev"
        @get-next="getNext"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { apiAlbumSets } from '../api'
import BaseButtonPage from '../components/BaseButtonPage'
import BaseImageSizeChanger from '../components/BaseImageSizeChanger'
export default {
  name: 'TheAlbumList',
  components: {
    BaseButtonPage,
    BaseImageSizeChanger
  },
  data () {
    return {
      currentPage: 1,
      currentSize: '小',
      imageSize: [
        { text: '小', cols: '2' },
        { text: '中', cols: '3' },
        { text: '大', cols: '4' }
      ],
      sets: [],
      total: null,
      toggle_exclusive: undefined
    }
  },
  computed: {
    currentCols () {
      return this.imageSize.filter(el => el.text === this.currentSize)[0].cols
    },
    isLoading () {
      return this.$store.getters.isLoading
    },
    lastPage () {
      if (this.total < 100) return 1
      return this.total % 100 === 0
        ? this.total / 100
        : Math.ceil(this.total / 100) + 1
    }
  },
  created () {
    this.getAlbumSets()
  },
  methods: {
    changeSize (size) {
      this.currentSize = size
    },
    async getAlbumSets (page = 1) {
      try {
        const res = await apiAlbumSets({
          params: { page }
        })
        this.sets = res.data.sets
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      }
    },
    getPrev () {
      if (this.sets.length < 100 && this.currentPage === 1) return
      this.currentPage = this.currentPage - 1
      this.getAlbumSets(this.currentPage)
    },
    getNext () {
      if (this.sets.length < 100 && this.currentPage >= this.lastPage) return
      this.currentPage = this.currentPage + 1
      this.getAlbumSets(this.currentPage)
    }
  }
}
</script>

<style lang="scss">
.skeleton-image-square {
  max-width: 90px;
  max-height: 90px;
}
</style>
