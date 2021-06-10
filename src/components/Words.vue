<template>
  <div>
    <h3>我的单词本</h3>
    <div v-for="(word, index) in words" :key="index">
      <div class="text">
        <div style="margin-bottom: 2vh;"></div>
        <div style="margin-bottom: 2vh;">
          单词:{{ word.word }}&nbsp;&nbsp;&nbsp;&nbsp; 发音:{{ word.pronounce }}
        </div>
        <div>中文意思:{{ word.description }}</div>
        <div class="button">
          <button v-on:click="del(word.id)" class="button1">删除</button>
          <button style="margin-left: 6vw;" v-on:click="update(word)" class="button1">
            修改
          </button>
        </div>
        <br /><br />
      </div>
    </div>
    <hr align="center" width="90%" />
    <form class="center">
      <button v-on:click="changePage(1)" class="button2">首页</button>
      <button v-on:click="changePage(--page)" class="button2">上一页</button>
      <button v-on:click="changePage(++page)" class="button2">下一页</button>
      <button v-on:click="changePage(Math.ceil(count / 3))" class="button2">
        末页
      </button>
      <br /><br />
      <input type="text" v-model="num" placeholder="请输入需要跳转的页数"  class="text1"/>
      <button v-on:click="changePage(num)" class="button2">转到</button>
      <br /><br />
    </form>
    <div class="center">
      <router-link to="/addword">添加单词</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Words",
  data() {
    return {
      words: [],
      count: 0,
      page: 1,
      num: null,
    }
  },
  methods: {
    changePage: function (param) {
      console.log("param:" + param);
      console.log("count:" + this.count);
      if (param == 1) {
        this.page = 1;
      }
      if (param == Math.ceil(this.count / 3)) {
        this.page = Math.ceil(this.count / 3);
      }
      if (param >= 1 && param <= Math.ceil(this.count / 3)) {
        this.show(param);
      } else if (param < 1) {
        alert("已到顶页！");
        this.page = 1;
      } else if (param > Math.ceil(this.count / 3)) {
        alert("已到末页！");
        this.page = Math.ceil(this.count / 3);
      }
    },
    show: function (page) {
      console.log(page);
      this.$http
        .jsonp(
          "http://www.h5peixun.com/soya/apps/testdb/server/?action=wordList.list&perPage=3&page=" +
            page,
          {

          }).then(
          function (res) {
            console.log(res.data.data);
            this.words = res.data.data;
            this.count = res.data.count;
            console.log(res.data.count);
          },function (error) {
            console.log(error);
          });
    },
    del: function (id) {
      console.log(id);
      this.$http.jsonp("http://www.h5peixun.com/soya/apps/testdb/server/?action=wordList.delete&id" +id,
          {

          }).then(
          function (res) {
            console.log(res.data);
            if (res.data.ret == 0) {
              alert("删除成功！");
            } else {
              alert("删除失败！");
            }
            this.show(1);
          },function (error) {
            console.log(error);
          });
    },
    update: function (word) {
      console.log(word);
      this.$router.push({
        name: "UpdWord",
        params: {
          word: word,
        }
      });
    },
  },
  created() {
    this.show(1);
  },
};
</script>

<style>
h1,
h2 {
  font-weight: normal;
  text-align: center;
}
ul li {
  list-style: none;
}
.text {
  width: 80%;
  height: 110px;
  background-color: #e5e5e5;
  box-shadow: 3px 3px 6px 6px #888888;
  margin-left: 10%;
  margin-top: 4%;
  font-family: "微软雅黑";
  font-size: 2.1vh;
  padding: 1%;
}
.button {
  display: flex;
  flex-direction: row;
  padding-left: 50%;
  padding-top: 2%;
}
</style>
