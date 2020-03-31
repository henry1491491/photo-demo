<template>
  <v-card
    id="views-the_album"
    outlined
  >
    <v-skeleton-loader
      v-if="isLoading"
      type="image"
    />
    <v-img
      v-if="!isLoading"
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title v-text="`${user.display_name}的相簿`" />
    </v-img>

    <v-card-text class="px-2 py-1">
      <span v-text="'最近更新的相簿'" />
    </v-card-text>

    <v-row class="px-2">
      <v-col
        v-for="item in displaySets"
        :key="item.id"
        cols="3"
      >
        <router-link :to="{ name: 'TheAlbumSet', params: { setId: item.id } }">
          <v-img
            v-if="!isLoading"
            :src="item.thumb"
          />
        </router-link>
        <router-link :to="{ name: 'TheAlbumSet', params: { setId: item.id } }">
          {{ item.title }}
        </router-link>
      </v-col>
    </v-row>

    <v-card-text
      class="
          text-right"
    >
      <router-link :to="{ name: 'TheAlbumList' }">
        <v-btn
          class="px-0"
          text
        >
          <v-icon v-text="'mdi-chevron-double-right'" />
          <span v-text="`看全部${setsTotal}本相簿`" />
        </v-btn>
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { apiAlbumSets } from '../api'
export default {
  name: 'TheAlbum',
  data () {
    return {
      sets: [],
      setsTotal: 0,
      user: {}
    }
  },
  computed: {
    displaySets () {
      return this.sets.slice(0, 4)
    },
    isLoading () {
      return this.$store.getters.isLoading
    }
  },
  mounted () {
    this.getAlbumSets()
  },
  methods: {
    async getAlbumSets () {
      try {
        const res = await apiAlbumSets()
        this.sets = res.data.sets
        this.user = res.data.sets[0].user
        this.setsTotal = res.data.total
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
