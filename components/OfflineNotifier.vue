<template>
  <div>
    <v-snackbar v-model="$nuxt.isOffline" timeout="-1">
      You are offline. Some functionality may be limited.
    </v-snackbar>
  </div>
</template>
