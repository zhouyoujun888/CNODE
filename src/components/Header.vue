<template>
  <div class="header">
    <img src="@/assets/cnodeLogo.svg" alt="" />
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-color: #5a5555;
  height: 50px;
  img {
    max-width: 120px;
    margin: 6px 20px;
  }
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin-right: 30px;
    li {
      padding: 10px 15px;
    }
  }
  & a {
    text-decoration: none;
    text-shadow: none;
    color: #ccc;
    font-size: 14px;
  }
  & a:hover {
    color: #fff;
  }
}
</style>
