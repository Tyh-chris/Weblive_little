<!-->用户注册手机号、验证码、密码</-->
<template>
<div class="comregister-info"> 
    <h1>注册第一步</h1>
   <van-form >
    <van-field
    v-model="userPhone"
    required
    label="手机号"
    placeholder="请输入手机号"
    />
    <van-field
        v-model="smsCode"
        center
        required
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码">
        <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
        </template>
    </van-field>
    <van-field required v-model="userPassword" type="password" label="密码" />
<div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" @click="to_personreg()">下一步</van-button>
  </div>
     </van-form>
</div>
</template>
<script>
export default {
    data(){
        return{
            userPhone:'',
            smsCode:'',
            userPassword:'',
            userType:'1',
            phoneNumber:'',//用于发送验证码的手机
        }
    },
    methods: {
        to_personreg(){
            if(this.userType=='0')
            {
            this.$router.push('/personReg')
            }
            else if(this.userType=='1')
            {
                   this.$router.push('/companyReg')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.comregister-info{
     width: 80%;
     margin: auto;
     margin-top: 40px;
     .van-cell{
         width: 100%;
     }
}
</style>
