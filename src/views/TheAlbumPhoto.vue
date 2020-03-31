<template>
  <v-card
    id="views-the_album_photo"
    outlined
  >
    <v-breadcrumbs
      v-if="items.length"
      :items="items"
    />

    <v-divider />

    <v-card-text class="c-carousel d-flex align-center">
      <v-btn
        icon
        @click="getPrev"
      >
        <v-icon v-text="'mdi-chevron-left'" />
      </v-btn>

      <v-img
        v-for="item in elements"
        :key="item.id"

        :class="{'active':item.id === $route.params.photoId}"
        :src="item.thumb"
        class="mx-1"
        max-height="70px"
        max-width="70px"
        @click="showDialog(item.id)"
      />

      <v-btn
        icon
        @click="getNext"
      >
        <v-icon v-text="'mdi-chevron-right'" />
      </v-btn>
    </v-card-text>

    <v-divider />

    <v-dialog
      v-model="dialog"
      activator
      width="60%"
      height="60%"
    >
      <v-card class="dialog-card pa-2">
        <v-btn
          icon
          color="grey"
          @click="dialog = false"
        >
          <v-icon v-text="'mdi-close-box'" />
        </v-btn>
        <v-img :src="element.large" />
      </v-card>
    </v-dialog>

    <v-card-text
      v-if="element.title"
      class="pb-2 pt-0"
      v-text="`${element.title}`"
    />
  </v-card>
</template>

<script>
import { apiAlbumElementsWithId, apiAlbumElements } from '../api'
export default {
  name: 'TheAlbumPhoto',
  data () {
    return {
      currentIndex: null,
      currentPage: 1,
      dialog: true,
      element: {},
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
      setId: JSON.parse(localStorage.getItem('set_id')) || [],
      totalPages: null
    }
  },
  async beforeRouteUpdate (to, from, next) {
    if (to.name === 'TheAlbumPhoto' && from.name === 'TheAlbumPhoto') {
      this.dialog = false
      const result = await this.getElement(to.params.photoId)
      if (!result) return
      if (this.elements.length) {
        next()
        this.dialog = true
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async getElement (id) {
      try {
        const res = await apiAlbumElementsWithId({
          id: this.$route.params.photoId || id
        })
        this.element = res.data.element
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async getAlbumElementsByPage (page) {
      try {
        let res
        if (page === undefined) {
          res = await apiAlbumElements({ params: { set_id: this.setId } })
          this.currentIndex = Number(
            res.data.elements.filter(
              el => el.id === this.$route.params.photoId
            )[0].position
          )
          const countPage = pageType => {
            return pageType % 5 === 0 ? pageType / 5 : Math.ceil(pageType / 5)
          }
          this.currentPage = countPage(Number(this.currentIndex) + 1)
          this.totalPages = countPage(res.data.elements.length)
        }
        res = await apiAlbumElements({
          params: {
            page,
            per_page: 5,
            set_id: this.setId
          }
        })
        this.elements = res.data.elements
        this.items[1].text = res.data.set.title
        this.items[1].href = `/set/${res.data.set.id}`
        return this.elements
      } catch (e) {
        console.log(e)
      }
    },
    async getPrev () {
      if (this.currentPage && this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
        this.getAlbumElementsByPage(this.currentPage)
      }
    },
    async getNext () {
      if (this.currentPage && this.currentPage < this.totalPages) {
        this.currentPage = this.currentPage + 1
        this.getAlbumElementsByPage(this.currentPage)
      }
    },
    async init () {
      const result = await this.getAlbumElementsByPage()
      if (!result.length) return
      this.getElement()
    },
    showDialog (id) {
      this.$router.push(`/photo/${id}`)
    }
  }
}
</script>

<style lang="scss">
#views-the_album_photo {
  .dialog-card {
    position: relative;
    .v-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
    }
  }
  .c-carousel {
    .v-image {
      border: 0.23rem solid #b0bec5;
    }
    .v-image:hover {
      border: none;
    }
    .active {
      border: 0.23rem solid #3f51b5;
    }
  }
}
</style>
