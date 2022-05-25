<template>

    <a-menu mode="horizontal" theme="dark">
        <a-menu-item key="app">
            <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="news">
            <router-link to="/News">News</router-link>
        </a-menu-item>
  </a-menu>

</template>
  
<script>
    export default {
        name: "Navigation"
    }
</script>