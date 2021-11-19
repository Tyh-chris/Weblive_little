<!--注册页面-->
/* eslint-disable */
<template>
<div class="register-contain">
<div class="img-contain">
    <div class="img-left">
    <van-image class="img-round" round fit="cover" :src="require('../../assets/img/user.png')" @click="personreg()" />   
    <span>个人</span>
    <!-- <van-image class="img-round" round fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg">
        <template v-slot:default style="">个人</template>
    </van-image> -->
   </div>
   <div class="img-right">
    <van-image class="img-round" round fit="cover" :src="require('../../assets/img/company.png')" @click="companyreg()" />
    <span>企业</span>
     <!-- <van-image class="img-round" round fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg">
        <template v-slot:default >企业</template>
    </van-image> -->
     </div>      
</div>
<van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
  其他登陆方式
</van-divider>
<div>
    <p style=" text-align: center;">微信登录</p>
    <p style=" text-align: center;">qq登录</p>
</div>
</div>

</template>
<script>
export default {
    data() {
        return {
          userType:'',
        }
    },
    methods: {
        personreg(){
             this.userType = 0
            this.$router.push('/comRegister')
        },
        companyreg(){
                 this.userType = 1 
                 this.$router.push('/comRegister')
        }
    },
}
</script>
<style scoped>
.register-contain{
    width: 80%;
     margin: auto;/*常规布局*/
    margin-top: 20%;
}
 .img-round{
    width:60%;
    cursor: pointer;
}
.img-left,
.img-right{
    width: 50%;
    text-align: center;
    
}
span,p{
    display: block;
        font-size: 25px;
        margin:0 5px;
    }
.img-contain{
    display: flex;
    justify-content: center;
    align-items:center;
}



</style>
