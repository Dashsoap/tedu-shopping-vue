<template>
  <div id="app">
   <my-header class="header"></my-header>
   <router-view class="my-body"></router-view>
  </div>
</template>

<script>
import MyHeader from './components/Header/Header'

export default {
  name: 'app',
  components: {
    MyHeader
  }
}
</script>

<style>
html{
  box-sizing: border-box;
  font-size: 16px;
}
body{
  margin: 0;
}
</style>
