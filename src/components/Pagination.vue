<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button
      :class="[{ currentPage: currentPage == page }, 'pagebtn']"
      v-for="page in pageBtn"
      :key="page.id"
      @click="changeBtn(page)"
    >
      {{ page }}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageBtn: [1, 2, 3, 4, 5],
      currentPage: 1,
    };
  },
  methods: {
    changeBtn(page) {
      if (typeof page != "number") {
        switch (page.target.innerText) {
          case "下一页":
            document
              .getElementsByClassName("currentPage")[0]
              .nextElementSibling.click();
            break;
          case "上一页":
            document
              .getElementsByClassName("currentPage")[0]
              .previousElementSibling.click();
            break;
          case "首页":
            this.pageBtn = [1, 2, 3, 4, 5];
            this.changeBtn(1);
        }
        return;
      }
      this.currentPage = page;
      if (page === this.pageBtn[4]) {
        this.pageBtn.shift();
        this.pageBtn.splice(4, 0, this.pageBtn[3] + 1);
      }
      if (page === this.pageBtn[0] && page != 1) {
        this.pageBtn.unshift(this.pageBtn[0] - 1);
        this.pageBtn.pop();
      }
      this.$emit("changePage", this.currentPage);
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 6px 20px;
  border-radius: 5px;
  border: 1px solid #888888;
}
button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  width: 55px;
  height: 29px;
  vertical-align: middle;
}
.pagebtn {
  width: 40px;
  margin: 0 4px;
}
button:hover,
.currentPage {
  color: white;
  background-color: #1f1b1b;
}
</style>