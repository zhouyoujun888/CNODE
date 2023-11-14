<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" alt="" />
    </div>
    <div class="main">
      <div class="userinfo">
        <div class="header">用户详情</div>
        <div class="wrapper">
          <img :src="user.avatar_url" alt="" />
          <span>{{ user.loginname }}</span>
        </div>
        <div style="margin-top: 15px; padding-left: 29px">
          {{ user.score }}积分
        </div>
        <div style="margin-top: 15px; padding-left: 29px">
          注册时间:{{ user.create_at | formatDate }}
        </div>
      </div>
      <div class="create">
        <div class="header">最近创建的话题</div>
        <ul>
          <li v-for="topic in user.recent_topics" :key="topic.id">
            <router-link
              class="active"
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
      <div class="reply">
        <div class="header">最近参与的话题</div>
        <ul>
          <li v-for="topic in user.recent_replies" :key="topic.id">
            <router-link
              class="active"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      user: {},
    };
  },
  methods: {
    getUserinfoData() {
      this.$Axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.username}`)
        .then((res) => {
          this.isLoading = false;
          this.user = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getUserinfoData();
  },
};
</script>

<style scoped>
.loading {
  text-align: center;
}
.loading img {
  max-width: 30px;
}
.header {
  background-color: #f6f6f6;
  padding: 10px 0;
  border-radius: 4px 4px 0 0;
  color: #444;
  font-size: 13px;
  padding-left: 18px;
}

.main {
  width: 600px;

  margin-top: 30px;
}

.userinfo,
.create,
.reply {
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 4px;
}

ul,
ol {
  list-style: none;
  margin-left: 15px;
}
ul a {
  color: rgb(0, 136, 204);
  font-size: 14px;
}

ul > li {
  margin-top: 5px;
  margin-bottom: 5px;
}

.wrapper {
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 30px;
}
.wrapper > img {
  max-width: 80px;
  border-radius: 4px;
}
.wrapper > span {
  margin-top: -20px;
  margin-left: 20px;
  color: #778087;
}
.active {
  text-decoration: none;
}
.active:hover {
  text-decoration: underline;
  color: #778087;
}
</style>