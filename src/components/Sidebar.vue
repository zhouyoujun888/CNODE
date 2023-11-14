<template>
  <div class="sidebar">
    <div class="userProfile">
      <div class="header">作者</div>
      <div class="wrapper">
        <img :src="userinfo.avatar_url" alt="" />
        <span>{{ userinfo.loginname }}</span>
      </div>
      <span>积分: {{ userinfo.score }}</span>
    </div>
    <div class="userPost">
      <div class="header">作者其它话题</div>
      <ul>
        <li v-for="topic in userinfo.recent_topics" :key="topic.id">
          <router-link
            :to="{
              name: 'post_content',
              params: {
                id: topic.id,
                name: topic.author.loginname,
              },
            }"
          >
            {{ topic.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="userTopic">
      <div class="header">最近参与的话题</div>
      <ul>
        <li v-for="topic in userinfo.recent_replies" :key="topic.id">
          <router-link
            :to="{
              name: 'post_content',
              params: {
                id: topic.id,
                name: topic.author.loginname,
              },
            }"
          >
            {{ topic.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  methods: {
    getUserinfoData() {
      this.$Axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then((res) => {
          this.userinfo = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount: function () {
    this.getUserinfoData();
  },
};
</script>

<style scoped>
ul,
ol {
  list-style: none;
}
.sidebar {
  width: 320px;
  float: left;
  margin-left: 60px;
}
.header {
  background-color: #f6f6f6;
  padding: 10px 0;
  border-radius: 4px 4px 0 0;
  color: #444;
  font-size: 13px;
  padding-left: 18px;
}
.userPost,
.userTopic,
.userProfile {
  background-color: #ffffff;
  margin-top: 30px;
  border-radius: 4px;
}
.userProfile img {
  max-width: 80px;
  margin: 10px;
  margin-right: 28px;
  border-radius: 4px;
}
.userProfile > span {
  font-size: 13px;
  margin-left: 10px;
}

.userProfile .wrapper {
  display: flex;
  align-items: center;
}
ul a {
  text-decoration-line: none;
  color: #778087;
  font-size: 14px;
}
ul a:hover {
  text-decoration-line: underline;
}
ul {
  padding: 18px;
}
ul > li {
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>