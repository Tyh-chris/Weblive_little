<template>
<div>
<div class="perreg-contain">
    <van-cell-group>
        <van-field v-model="userName" label="姓名" placeholder="请输入真实姓名" />
        <van-field name="sex" label="性别">
            <!-- <template #input>
              <van-dropdown-menu>
                <van-dropdown-item v-model="sex" :options="sexchoose" />
             </van-dropdown-menu>
            </template> -->
            <template #input>
             <van-radio-group v-model="sexRadio" direction="horizontal">
                <van-radio name="1">女</van-radio>
                <van-radio name="2">男</van-radio>
             </van-radio-group>
            </template>
        </van-field>
       <van-field v-model="userYear" label="出生年份" placeholder="请选择"  @click="showYearPop()" />   
    <van-popup v-model="showYear" position="bottom" >
      <van-datetime-picker 
            v-model="currentDate"
            type="date" 
             :min-date="minDate"
           :max-date="maxDate"
            @change="changeFn()"
            @confirm="confirmFn()" 
             @cancel="cancelFn()" 
        />
    </van-popup>
    </van-cell-group>    
      </div>
 </div>
</template>
<script>
export default {
    data(){
        return{
            userName:'',
            sexRadio:'',
            userYear:'',
           
            // sexchoose:[
            //      { text: '女', value: 0 },
            //      { text: '男', value: 1 },
            // ]
           
             currentDate: new Date(),//用于选择年月日的参数
        changeDate: new Date(),
        show: false, // 用来显示弹出层 
        showYear:false,
        minDate: new Date(1980, 0, 1),
         maxDate: new Date(),
      //  timeValue: ''

        }
    },
    methods: {
          showYearPop() {
        this.showYear = true;
      },
      changeFn() { // 值变化是触发
        this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
      },
      confirmFn() { // 确定按钮
        this.userYear = this.timeFormat(this.currentDate);
        this.showYear = false;
      },
      cancelFn(){ //取消按钮
        this.showYear = false;
      },
      timeFormat(time) { // 时间格式化 2019-09-08
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return year + '年' + month + '月' + day + '日'
      }
    },

}
</script>
<style lang="scss" scope>


</style>