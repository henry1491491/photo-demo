<template>
  <v-row id="views-the_home">
    <v-col cols="8">
      <router-view :key="$route.fullPath" />
    </v-col>

    <v-col cols="4">
      <v-card outlined>
        <v-list-item class="px-2">
          <v-list-item-avatar
            color="grey"
            size="80"
            tile
          >
            <img
              :alt="user.display_name"
              :src="user.avatar"
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item
              class="pa-0"
              v-text="`${user.display_name}`"
            />
            <v-list-item-subtitle v-text="`所有相簿(${setsLength})`" />
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            outlined
            small
            v-text="'加為好友'"
          />
          <v-btn
            outlined
            small
            v-text="'加入訂閱'"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { apiAlbumSets } from '../api'
export default {
  name: 'TheHome',
  data () {
    return {
      setsLength: 0,
      user: {}
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
  },
  created () {
    this.getAlbumSets()
  },
  methods: {
    async getAlbumSets () {
      try {
        const res = await apiAlbumSets()
        this.setsLength = res.data.sets.length
        this.user = res.data.sets[0].user
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
