<template>
  
  <navigation />
  <router-view />

</template>

<script>
  import navigation from './components/globals/navigation.vue'
  export default {
    components: {
      navigation
    }
  }
</script>

<style>
body {
  background-color: #14182d;
  color: white;
}
</style>