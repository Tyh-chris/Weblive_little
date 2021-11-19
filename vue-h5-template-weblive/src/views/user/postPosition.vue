<template>
    <div class="postJob-contain">
        <h1>发布职位</h1>
         <van-field colon v-model="jobRequire.jobName" label="职位名称"  />
         <van-field colon v-model="jobRequire.jobAddress" label="工作地点"  />
         <van-field colon v-model="jobRequire.jobSalary" label="薪资" >
             <template #input>
                    <van-field v-model="minSalary"  placeholder="请输入最低薪资" />~
                    <van-field v-model="maxSalary"  placeholder="请输入最高薪资" />
             </template>
         </van-field>
         <van-field colon name="require" label="要求" >
            <template #input>
                 <van-field colon name="checkenSex" label="性别" >
                       <template #input>   
                            <van-radio-group v-model="jobRequire.radioSex"  direction="horizontal">
                                <van-radio name="女" shape="square">女</van-radio>
                                <van-radio  name="男" shape="square">男</van-radio>
                                <van-radio  name="不限" shape="square">不限</van-radio>
                            </van-radio-group>
                         </template>
                </van-field>
            </template>
         </van-field>
       <van-field
             colon
            label="工作经验"
            center     
            is-link
            @click="showexperienceYear=true"
            placeholder="请选择"
            v-model="jobRequire.jobExperience"
            >
         </van-field> 
         <van-action-sheet 
            v-model="showexperienceYear" 
            :actions="experienceYear"
            @select="onSelect"   
            description="工作经验选择"
          />           
         <van-field colon v-model="jobRequire.degree" label="学历"  />
         <van-field colon v-model="jobRequire.major" label="专业"  />
  <div style="margin: 16px;">
      <van-button round block type="info" @click="backuserCompany()">提交</van-button>
  </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default ({
    data() {
        return{
            jobRequire:
                {
                    jobName:'',
                    jobSalary:'',
                    jobAddress:'',
                    radioSex:'',
                    jobExperience:'',
                    degree:'',
                    major:'',
                    },
                    minSalary:'',
                    maxSalary:'',
              showexperienceYear: false,
             experienceYear: [{ name: '不要求' },{ name: '1年' }, { name: '2年' }, { name: '3年' }, { name: '4年' }, { name: '5年' }],
        }   
    },
    methods: {
        backuserCompany(){
            this.$router.push('/userCompany')
        },
         onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
            this.showexperienceYear = false;
            this.jobRequire.jobExperience=item.name;
    },
    },
})
</script>
<style lang="scss" scope>
.postJob-contain{
       width: 80%;
     margin: auto;
     margin-top: 40px;
     .van-cell{
         width: 100%;
     }
     .van-field__label{
       width: auto;
    }   
    .van-action-sheet{
        max-height: 40%;
    }
}

</style>
