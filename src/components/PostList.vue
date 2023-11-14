<template>
  <div class="postList">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" alt="" />
    </div>
    <div class="postList-li" v-else>
      <ul>
        <li>
          <div class="nav">
            <span :class="{ curtab: tab === '全部' }" @click="curtab('全部')"
              >全部</span
            >
            <span :class="{ curtab: tab === '精华' }" @click="curtab('精华')"
              >精华</span
            >
            <span :class="{ curtab: tab === '分享' }" @click="curtab('分享')"
              >分享</span
            >
            <span :class="{ curtab: tab === '问答' }" @click="curtab('问答')"
              >问答</span
            >
            <span :class="{ curtab: tab === '招聘' }" @click="curtab('招聘')"
              >招聘</span
            >
          </div>
        </li>
        <li v-for="post in postData" :key="post.id">
          <div class="list-f">
            <!-- 头像 -->
            <img :src="post.author.avatar_url" alt="" />
            <!-- 回复/访问 -->
            <span class="r-num">
              <span class="reply_count">{{ post.reply_count }}</span>
              <span class="sep">/</span>
              <span class="visit_count">{{ post.visit_count }}</span>
            </span>
            <!-- 置ding页 -->
            <span
              :class="[
                {
                  put_good: post.good === true,
                  put_top: post.top === true,
                  top_tab: post.good === !true && post.top === !true,
                },
              ]"
            >
              {{ post | tabFormate }}
            </span>
            <!-- 文章标题 -->
            <router-link
              class="topic_title"
              :to="{ name: 'post_content', params: { id: post.id } }"
            >
              <span class="title">{{ post.title }}</span>
            </router-link>
          </div>
          <!-- 时间 -->
          <span class="last_reply">{{ post.last_reply_at | formatDate }}</span>
        </li>
      </ul>
      <pagination @changePage="handle"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      isLoading: false,
      postData: [],
      tab: "全部",
      currentPage: 1,
    };
  },
  methods: {
    getData() {
      this.$Axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.currentPage,
          },
        })
        .then((res) => {
          this.isLoading = false;
          console.log(res.data.data);
          this.postData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    curtab(tab) {
      this.tab = tab;
    },
    handle(value) {
      this.currentPage = value;
      this.getData();
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  components: {
    pagination,
  },
};
</script>

<style lang="less" scoped>
.postList {
  .postList-li {
    width: 90%;
    margin: 0 auto;
  }
  .loading {
    text-align: center;
  }
  .loading img {
    max-width: 30px;
  }
  ul {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  ul li {
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    list-style: none;
    background: #fff;
    border-top: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    padding: 10px 0 10px 10px;
    .list-f {
      display: flex;
      align-items: center;
      .r-num {
        padding-left: 10px;
      }
    }

    img {
      max-width: 30px;
      max-height: 30px;
    }
    .reply_count {
      color: #9e78c0;
    }
    .sep {
      // margin: 0 -3px;
      font-size: 10px;
    }
    .visit_count {
      font-size: 10px;
      color: #b4b4b4;
    }
    .title {
      padding-left: 7px;
      color: #333;
      font-size: 16px;
      // display: inline-block;
      // vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      // line-height: 30px;
    }
    .last_reply {
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #777;
      padding-right: 20px;
    }
  }

  .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-left: 10px;
  }
  .put_good {
    background: #01bdba7a;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-left: 10px;
  }
  .top_tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-left: 10px;
  }
}

ul li:first-child {
  background-color: #f6f6f6;
  padding: 10px;
  font-size: 15px;
  font-weight: 400;
  color: #333;
  border-radius: 5px 5px 0 0;
}
ul li:not(:first-child):hover {
  background-color: #f6f6f6;
}
.nav {
  margin: 0 10px;
  color: #80bd01;
  span {
    margin: 0 10px;
  }
  span:hover {
    color: #089fea90;
    cursor: pointer;
  }
  .curtab {
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }
}
.topic_title {
  margin-left: 10px;
  max-width: 400px;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  text-decoration-line: none;
}

.topic_title:hover {
  text-decoration-line: underline;
}
</style>