<template>
    <div>
        <div class="title">
            <router-link to="/">返回</router-link>
        </div>
        <h1>录入新单词</h1>
        <hr align="center" width="80%"> <br><br>
        <form class="center">
            单词: <input type="text" v-model="newWord.word" placeholder="请输入一个单词" class="text1"><br><br><br>
            发音: <input type="text" v-model="newWord.pronounce" placeholder="请输入此单词的发音" class="text1"><br><br><br>
            汉语: <input type="text" v-model="newWord.description" placeholder="请输入汉语意思" class="text1"><br><br>
            <input type="submit" value="添加单词" v-on:click="addWord(newWord)" class="button1">
        </form>
    </div>
</template>
<script>
export default {
        name:'AddWord',
        data(){
            return{
                newWord:{
                    word:'',
                    pronounce:'',
                    description:''
                }
            }
        },
        methods:{
            addWord:function(newWord){
                console.log(newWord.word);
                if(newWord.word==''){
                    alert("输入的单词不能为空");
                }else if(newWord.description==''){
                    alert("输入的中文意思不能为空");
                }else if(newWord.pronounce==''){
                    alert("输入的单词发音不能为空");
                }else{
                    this.$http.jsonp("http://www.h5peixun.com/soya/apps/testdb/server/?action=wordList.insert&word="+newWord.word+"&pronounce="+newWord.pronounce+"&memberId=100&description="+newWord.description,{
                        //请求参数
                    }).then(function(res){
                        console.log(res.data);
                        if(res.data.ret==0){
                            alert("添加成功");
                        }else{
                            alert("添加失败");
                        }
                    },function(error){
                        console.log(error);
                    });
                }
            }
        }
}
</script>