<template>
  <div>
    <div class="biaoti">
      <router-link to="/">返回</router-link>
    </div>
    <h1>纠正错误</h1>
    <p class="biaoti">一、需要修改的单词</p>
    <hr align="center" width="80%" />
    <br />
    <div class="text">
      单词:{{ this.$route.params.word.word }}<br />
      发音:{{ this.$route.params.word.pronounce }} <br />
      中文意思:{{ this.$route.params.word.description }}
    </div>
    <hr align="center" width="80%" />
    <p class="biaoti">二、需要修改的内容</p>
    <hr align="center" width="80%" />
    <form class="center">
        单词: <input type="text" v-model="newWord.word" placeholder="请输入改正后的单词(可选)" class="text1"><br><br>
        汉语: <input type="text" v-model="newWord.description" placeholder="请输入改正后的汉语意思(可选)" class="text1"><br><br>
        发音: <input type="text" v-model="newWord.pronounce" placeholder="请输入改正后的发音(可选)" class="text1">
        <br><br>
        <input type="submit" value="修改单词" v-on:click="update()" class="button1">
    </form>
  </div>
</template>
<script>
    export default {
        name:'UpdWord',
        data(){
            return {
                newWord:{
                    word:'',
                    pronounce:'',
                    description:''
                }
            }
        },
        methods:{
            fun(){
                if(this.newWord.word==''){
                    this.newWord.word=this.$route.params.word.word;
                }
                if(this.newWord.pronounce==''){
                    this.newWord.pronounce=this.$route.params.word.pronounce;
                }
                if(this.newWord.description==''){
                    this.newWord.description=this.$route.params.word.description;
                }
            },
            update(){
                this.fun();
                let id = this.$route.params.word.id;
                let word = this.newWord.word;
                let pronounce = this.newWord.pronounce;
                let description = this.newWord.description;
                this.$http.jsonp("http://www.h5peixun.com/soya/apps/testdb/server/?action=wordList.update",
                {//请求参数
                    params:{
                        id:id,
                        word:word,
                        pronounce:pronounce,
                        description:description
                    }
                }).then(function(res){
                    console.log(res.data);
                    if(res.data.ret==0){
                        alert('修改成功!');
                    }else{
                        alert("修改失败!");
                    }
                },function(error){
                    console.log(error);
                });
            }
        }
    }
</script>
<style>
    .text{
        padding-left: 80px;
        text-align: center;
    }
</style>
