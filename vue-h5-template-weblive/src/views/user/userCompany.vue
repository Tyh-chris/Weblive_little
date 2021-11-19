<!-->我的（企业）已经登陆的页面</-->
<template>
    <div class="userCompany-contain">
        <div class="company-top">
            <div>
         <van-image
         alt="个人头像"
            round
            :src="require('../../assets/img/user.png')"
            @click="editCompanyInfo()"
         />   
         <p style="text-align:center">点击头像修改基本信息</p>
         </div>
    <div class="top-left">
             <div class="top-info">
                 <van-cell title="单位名称" :value="enterpriseName" />
                <van-button type="default" size="small">角色互换</van-button>
             </div>
            <div class="top-info"> 
                 <van-cell  title="我的积分" :value="point" />
                 <van-button type="default" size="small">兑换积分</van-button>
                 <van-button type="default"  size="small">赚积分</van-button>
           </div>
            </div> 
       </div>
       <div class="company-bottom">
       <div class="verify">
         <van-field name="uploader" label="认证" >
             <template #input>
               <van-uploader v-model="verifyfileList" multiple :max-count="2" :max-size="500 * 1024" @oversize="onOversize"/>
                <van-checkbox v-model="checkedWatermark">加水印</van-checkbox>
             </template>
           </van-field>
        </div>
        <div class="three-button">
            <van-button type="primary" @click="gopostPosition()">发布职位</van-button>
            <van-button type="info">收到简历</van-button>
            <van-button type="default">收到信息</van-button>
        </div>
        <div class="showJobs">
            <h2>显示发布的职位</h2>
            <p>......</p>
        </div>
        <div class="live-info">
          <van-field name="checkliveSetting" label="申请直播设置">
             <template #input>
                 <van-checkbox-group 
                 v-model="liveSetting" 
                 direction="horizontal" 
                  @change="ShowliveDay()"
                 >
                     <van-checkbox  
                        shape="square" 
                        v-for="(item) in liveDay" 
                        :key="item" 
                        :name="item">   <!--数组中的值为选中的复选框的name-->
                        {{item}}
                     </van-checkbox>
                </van-checkbox-group>
             </template>
         </van-field>
          <van-field name="uploader" label="直播区" >
             <template #input>
               <van-uploader v-model="livePicture" multiple :max-count="5" :max-size="500 * 1024" @oversize="onOversize"/>
             </template>
           </van-field>
           <van-field
                v-model="livemsg"
                rows="2"
                autosize
                label="留言"
                type="textarea"
                maxlength="200"
                placeholder="请输入介绍文字"
                show-word-limit
            />
            <van-field name="checkliveMusic" label="直播间音乐复选框">
             <template #input>
                 <van-checkbox-group 
                 v-model="liveMusic" 
                 direction="horizontal" 
                 @change="showMusic()"
                 >
                     <van-checkbox  
                        shape="square" 
                        v-for="(item) in liveMusicSetting" 
                        :key="item.url" 
                        :name="item.MusicName">   <!--数组中的值为选中的复选框的name-->
                        {{item.MusicName}}
                     </van-checkbox>
                </van-checkbox-group>
             </template>
         </van-field>
        <van-field name="Musicradio" label="直播间音乐单选">
            <template #input>
                <van-radio-group v-model="Musicradio" direction="horizontal">
                <van-radio v-for="(item) in liveMusicSetting" 
                         :key="item.url" 
                         :name="item.MusicName">{{item.MusicName}}</van-radio>
                </van-radio-group>
            </template>
    </van-field>
    </div>
    </div>
</div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            point:'123',
             enterpriseName:'北京科技有限公司',
               verifyfileList: [],//执照图片
               checkedWatermark:false,//加水印
               liveSetting:[],//直播申请最终选择的日子
               liveMusic:[],//直播间最终选择的音乐
               liveDay:['周一','周二','周三'],
               livePicture:[],
               livemsg:'',
               liveMusicSetting:[
                   {url:'89843',MusicName:'大海星辰'},
                   {url:'435',MusicName:'年轮'},
                   {url:'354',MusicName:'你是人间四月天'}
                   ],
                   Musicradio:'',
        }
    },
    methods: {
        //点击头像编辑企业信息
        editCompanyInfo(){ 
            this.$router.push('/companyreg')
        },
        //上传执照方法
         afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 500kb');
    },
    ShowliveDay(){
        console.log(this.liveSetting)
    },
    showMusic(){
         console.log(this.liveMusic)
    },
    gopostPosition(){
        this.$router.push('/postPosition')
    }
    },
}
</script>
<style lang='scss' scoped>
.company-top{
    display: flex;
    margin-top: 20px;
    .top-left{
        width: 90%;
        margin: auto;
    }
.van-image{
    cursor: pointer;
}
.top-info{
        display: flex;
     .van-button{
        margin: auto;
         }
     .van-cell{
            width: 70%;
        }
}
}
.company-bottom{
    width: 70%;
    margin:auto;
}
.three-button{
    text-align: center;
    .van-button{
        margin: 10px;
    }
}
.van-checkbox,
.van-radio{
    margin-bottom: 3px;
}
.van-cell__value{
    text-align: left;
}
</style>