<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  mounted() {
  	console.log('discounts mounted --------');
  },
};
</script>

<style>
#app {
  /* height: 100%; */
  overflow: auto;
}

</style>
