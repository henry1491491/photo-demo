<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        PIXNET 測驗
      </v-toolbar-title>

      <v-spacer />

      <router-link :to="{path:'/'}">
        <v-btn icon>
          <v-icon v-text="'mdi-home'" />
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
@import "src/assets/css/main.scss";
</style>
