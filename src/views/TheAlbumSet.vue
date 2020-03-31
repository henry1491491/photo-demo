<template>
  <v-card
    id="views-the_album_set"
    outlined
  >
    <v-breadcrumbs
      :items="items"
      class="pa-2"
    />

    <v-divider />

    <v-card-text class="text-right pa-2">
      <BaseButtonPage
        :prev="currentPage <= 1"
        :next="currentPage >= lastPage"
        @get-prev="getPrev"
        @get-next="getNext"
      />
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col
          v-for="item in elements"
          :key="item.id"
          cols="2"
        >
          <router-link :to="{name:'TheAlbumPhoto',params:{photoId:item.id}}">
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
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="text-center pa-2">
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
import { apiAlbumElements } from '../api'
import BaseButtonPage from '../components/BaseButtonPage'
export default {
  name: 'TheAlbumSet',
  components: {
    BaseButtonPage
  },
  data () {
    return {
      currentPage: 1,
      elements: [],
      items: [
        {
          text: '相簿列表',
          disabled: false,
          href: '/list'
        },
        {
          text: '',
          disabled: false,
          href: ''
        }
      ],
      setId: '',
      total: null,
      zoom: 0
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    lastPage () {
      if (this.elements.length < 100) return 1
      return this.total % 100 === 0
        ? this.total / 100
        : Math.ceil(this.total / 100) + 1
    }
  },
  created () {
    this.getAlbumElements()
  },
  methods: {
    async getAlbumElements (page = 1) {
      try {
        if (!this.$route.params.setId) return
        localStorage.setItem('set_id', this.$route.params.setId)
        const res = await apiAlbumElements({
          params: { page, set_id: this.$route.params.setId }
        })
        this.elements = res.data.elements
        this.items[1].text = res.data.set.title
        this.items[1].href = `/set/${res.data.set.id}`
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      }
    },
    getPrev () {
      if (this.elements.length < 100 && this.currentPage === 1) return
      this.currentPage = this.currentPage - 1
      this.getAlbumElements(this.currentPage)
    },
    getNext () {
      if (this.elements.length < 100 && this.currentPage >= this.lastPage) { return }
      this.currentPage = this.currentPage + 1
      this.getAlbumElements(this.currentPage)
    }
  }
}
</script>

<style lang="scss">
#views-the_album_set {
  .skeleton-image-square {
    max-width: 90px;
    max-height: 90px;
  }
}
</style>
