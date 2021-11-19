<template>
<div class="companyreg-contain">
     <h1 >企业注册信息填写</h1>
     <div class="company-info">
   <van-form >
        <van-field v-model="EnterpriseRigDto.enterpriseName" label="单位全称" placeholder="请输入单位全称" />
        <div class="with-public">  
             <van-field v-model="EnterpriseRigDto.contactName" label="联系人"  placeholder="请输入联系人姓名" />          
             <van-checkbox v-model="checkedNamePub" shape="square" >公开</van-checkbox>
        </div>
        <div class="with-public"> 
             <van-field v-model="EnterpriseRigDto.contactPhone" type="tel" label="电话" />
             <van-checkbox v-model="checkedPhonePub" shape="square">公开</van-checkbox>
        </div>  
        <van-field right-icon="location-o" v-model="EnterpriseRigDto.enterpriseAddress" label="办公位置" placeholder="点击自动定位" @click="location()" /> 
         <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="EnterpriseRigDto.industry"
                    label="行业选择"
                    placeholder="点击选择行业"
                    @click="showPickerIndustry = true"
        />
             <van-popup v-model="showPickerIndustry" position="bottom">
                 <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirmIndustry"
                    @cancel="showPickerIndustry = false"
                 />
             </van-popup>
         <van-field name="checkboxGroup" label="企业福利">
             <template #input>
                 <van-checkbox-group 
                 v-model="EnterpriseRigDto.enterpriseWelfare" 
                 direction="horizontal" 
                  @change="ShowWelfare()"
                 :max="5">
                     <van-checkbox  
                        shape="square" 
                        v-for="(item,index) in Welfare" 
                        :key="index" 
                        :name="item">   <!--数组中的值为选中的复选框的name-->
                        {{item}}
                     </van-checkbox>
                </van-checkbox-group>
             </template>
         </van-field>
     <div style="margin: 16px;">
         <van-button round block type="info" native-type="submit">下一步</van-button>
     </div>
</van-form>
</div>

    </div> 
</template>

<script>
export default {
    data(){
        return{
            EnterpriseRigDto:{
                enterpriseName:'',//公司名称
                contactName:'',//联系人
                contactPhone:'',//电话，抓取收验证码的手机号
                enterpriseAddress:'',
                industry:'',
                enterpriseWelfare:[],
            },
            checkedNamePub:false,
            checkedPhonePub:false,
             value: '',
             columns: ['教育', '政府', '学生', ],
             showPickerIndustry : false,
             Welfare:['五险一金', '餐补', '双休','单休','法定节假日','环境好','交通补贴','五险','朝九晚五','包食宿','管住','事少','钱多','半天班','旅游']
        }
    },
    methods: {
          onConfirmIndustry(value) {  //行业选择的确定按钮
             this.industry = value;
             this.showPickerIndustry = false;
    },
    ShowWelfare(){
          console.log('显示福利')
        console.log(this.EnterpriseRigDto.enterpriseWelfare)
    },
    location(){

    },

//      getfun(){
//       const axios = require('axios').default;
//     axios.get('https://autumnfish.cn/api/joke/list?num=3')
//     .then((respond)=>{
//        console.log(respond);
//       this.info=respond.data.jokes;
//    console.log(this.info)
//     })
//       .catch(function (error) { // 请求失败处理
//         console.log(error);
//       })
//       },
    }
}
</script>

<style lang="scss" scope>
.companyreg-contain{
   width: 80%;
     margin: auto;
     margin-top: 40px;
     .van-cell{
         width: 80%;
     }
 }
 .van-cell{
    
   width: 70%;
 }
 .with-public{  
        display: flex;
        
 }
.van-checkbox{
    margin-bottom: 3px;
}
</style>