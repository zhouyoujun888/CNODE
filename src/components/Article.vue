<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" alt="" />
    </div>
    <div class="article main" v-else>
      <div class="post_header">
        <p class="topic_title">{{ post.title }}</p>
        <div class="changes">
          <span>发布于 {{ post.create_at | formatDate }} </span>
          <span>作者 {{ post.author.loginname }} </span>
          <span> {{ post.visit_count }} 次浏览</span>
          <span>来自 {{ post | tabFormate }} </span>
        </div>
      </div>
      <div class="content" v-html="post.content"></div>
      <div class="replylist">
        <div class="header">{{ post.replies.length }} 条回复</div>
        <ul>
          <li
            class="reply-item"
            v-for="(reply, index) in post.replies"
            :key="reply.id"
          >
            <div class="author_content">
              <router-link
                :to="{
                  name: 'user_info',
                  params: {
                    username: reply.author.loginname,
                  },
                }"
              >
                <img :src="reply.author.avatar_url" alt="" />
              </router-link>
              <router-link
                :to="{
                  name: 'user_info',
                  params: {
                    username: reply.author.loginname,
                  },
                }"
              >
                <span>{{ reply.author.loginname }}</span>
              </router-link>
              <span class="reply_time"
                >{{ index + 1 }}楼•{{ reply.create_at | formatDate }}</span
              >
              <span class="up-count">👍 {{ reply.ups.length }}</span>
            </div>
            <div v-html="reply.content"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false,
      post: {},
    };
  },
  methods: {
    getArticleData() {
      this.$Axios
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          if (res.data.success === true) {
            this.post = res.data.data;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
};
</script>

<style lang="less">
@import url("../assets/markdown-github.css");

.loading {
  text-align: center;
}
.loading img {
  max-width: 30px;
}

.article {
  width: 67%;
  float: left;
}

.main {
  width: 800px;
  margin-left: 100px;
  margin-top: 30px;
}

.post_header {
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 10px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
}
.post_header > .topic_title {
  margin-bottom: 18px;
  font-size: 22px;
  font-weight: 700;
}
.post_header > .changes {
  color: #838383;
  font-size: 12px;
}
.changes > span::before {
  content: "• ";
}

.content {
  padding: 20px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
}
.replylist {
  margin-top: 18px;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
}
.replylist > .header {
  background-color: #f6f6f6;
  padding: 10px 0;
  border-radius: 4px 4px 0 0;
  color: #444;
  font-size: 13px;
  padding-left: 18px;
}

.reply-item {
  border-top: 1px solid #f0f0f0;
  padding: 18px;
  list-style: none;
  position: relative;
}
.author_content {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.author_content img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 13px;
}

.author_content a {
  text-decoration-line: none;
  font-weight: 900;
  color: #333;
  font-size: 12px;
}

.author_content > .reply_time {
  color: #08c;
  font-size: 12px;
}
.author_content > span {
  margin-left: 8px;
}
.author_content > .up-count {
  font-size: 12px;
  position: absolute;
  right: 20px;
  top: 10px;
  color: gray;
}
</style>