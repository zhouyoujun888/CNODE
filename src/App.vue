<template>
  <div id="app" class="clearfix">
    <Header></Header>
    <div class="main1">
      <router-view name="main"></router-view
      ><router-view name="sidebar"></router-view>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import PostList from "@/components/PostList.vue";
export default {
  components: {
    Header,
    PostList,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main1 {
  background-color: #e1e1e1;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
