<template>

  <div id="app">
    <header></header>
     <!-- $route.path == '/login' || $route.path == '/' -->
    <router-view :key="$route.fullPath"></router-view>
    <footer></footer>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>

</style>
