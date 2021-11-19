<template>
    <div class='login-contain'>
        <p class='welcome'>欢迎来到xxx</p>
        <van-form @submit="onSubmit">
      <div class='login-info'>
  <van-field
    v-model="userPhone"
    name="用户名"
    left-icon="manager"
    label="用户名"
    placeholder="请输入电话号码"
    :rules="[{ required: true, message: '请填写电话号码' },{pattern:/^\d{11}$/, message:'电话号码格式错误'}]"
  />
  <van-field
    v-model=" userPassword"
    type="password"
    left-icon="lock"
    name="密码"
    label="密码"
    placeholder="请输入密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin:20px 0px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
  </div>
</van-form>
<a @click="gotoregister()">免费注册</a>
<div class="other-login">
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
    其他登陆方式
  </van-divider>
</div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      userPassword:'',
      userPhone:'',
    }
  },
  methods: {
    gotoregister(){
      this.$router.push({path:'/register'})

    }
  },
}
</script>
<style lang="scss" scoped>
.welcome{
  font-size:25px;
  margin-left:7%;
}
.login-info{
  width: 80%;
     margin: auto;
     margin-top: 40px;
     .van-cell{
         width: 100%;
         margin-top:5%;
     }
}
a{
  display:block;
  text-align: right;
  margin-right:7%;
  cursor:pointer;
  font-size: 15px;
}
</style>

