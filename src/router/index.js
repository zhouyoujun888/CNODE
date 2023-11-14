import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "@/components/PostList";
import Article from "@/components/Article";
import userinfo from "@/components/userinfo.vue";
import Sidebar from "@/components/Sidebar.vue";

Vue.use(VueRouter);

const routes = [
  { name: "root", path: "/", components: { main: PostList } },
  {
    name: "post_content",
    path: "/topic/:id&author=:name",
    components: {
      main: Article,
      sidebar: Sidebar,
    },
  },
  {
    name: "user_info",
    path: "/user/:username",
    components: { main: userinfo },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
