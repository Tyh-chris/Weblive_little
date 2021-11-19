import { mapState } from 'vuex'
import Vue from 'vue'
import bg from '../../assets/image/myBg.png'
import axios from "axios";

export const mixinPlayer = {
    data() {
        return {
            userId:'',
            changeId:'0',
            share_url: '',
            isShow_playUrl: false,
            timer_record: null,
            time_value: {
                hour: 0,
                minute: 0,
                second: 0,
            },
            playerTime: '00:00:00',
            volumeValue: 70,
            showSetVolume: false,
            audioContent: '关闭麦克风',
            isMute: false,
            playContent: '暂停',
            isPlay: true,
            _timer: 0,
            live_title: '',
            cdnPlayUrl: {
                flv: '',
                hls: ''
            }
        }
    },
    computed: {
        ...mapState({
            chatInfo: state => state.conversation.chatInfo,
            playType: state => state.conversation.playType,
            currentMessageList: state => state.conversation.currentMessageList,
            userInfo: state => state.user.userInfo,
            isLogin: state => state.user.isLogin,
            isSDKReady: state => state.user.isSDKReady,
            userID: state => state.user.userID
        }),
        // changeId:function(){
        //     if(this.$store.state.user.isLogin==true){
        //         // if(this.$store.state.userType.length==0){
        //         //     console.log(11111111111111111111111111)
        //         // }
        //         console.log(1111111111111111111)
        //     }
        // }
    },
    watch: {
        isSDKReady(newName, oldName) {
        //   console.log(11111111111111111);
            let form={ avatar: '', nick: '' };
            let userId=this.userId
            form.avatar = "https://i.bmp.ovh/imgs/2021/10/448c6afefd4569e6.jpg";
            form.nick = '游客：' + userId;
            const options = {}
            // 过滤空串
            Object.keys(form).forEach(key => {
                if (form[key]) {
                    options[key] = form[key]
                }
            })
            this.im.setMyProfile(options)
                .then((imResponse) => {
                    // this.$store.commit('showMessage', {
                    //     message: '修改成功'
                    // })
                    const { nick, avatar, userID } = imResponse.data
                    this.userInfo.nickName = this.canIUseNick(nick) ? nick : userID
                    if (avatar) {
                        this.userInfo.avatar = avatar
                    }
                    this.showEditMyProfile = false
                })
                .catch(imError => {
                    this.$store.commit('showMessage', {
                        message: imError.message,
                        type: 'error'
                    })
                })
        }
      } ,
    created() {
        this.cdnPlay()
    },
    mounted() {
        // 初始化监听器
        this.initListener()
        //this.startPlay()
    },
    destroyed() {
        this.stopPlay()
    },
    methods: {

        canIUseNick(nick) {
            if (nick && nick !== '""' && nick !== '\'\'') {
              return true
            }
            return false
          },

        cdnPlay() {
            // CDN  分享 播放
            this.$store.commit('setPlayType', 'cdn')
            //let share_Url = window.location.origin + window.location.pathname + '#/player'
            let query = this.$route.query
            if (query.type === 'cdn') {
                let roomId = query.roomid
                if (roomId) {
                    this.$store.commit('setGroupId', roomId)
                }
            }
        },

        // 加入直播间
        enterRoom() {
            this.im.enterRoom(this.chatInfo.groupId).then((imResponse) => {
                const status = imResponse.data.status
                if (status === this.TWebLive.TYPES.ENTER_ROOM_SUCCESS || status === this.TWebLive.TYPES.ALREADY_IN_ROOM) {
                    console.log(this.chatInfo.groupId, '观众匿名加入直播间')
                }
            }).catch((imError) => {
                console.log('失败', imError)
                if (imError.code === 10007 || imError.code === 10015) {
                    this.$store.commit('showMessage', { type: 'warning', message: '直播间可能已解散' })
                }
            })
        },
        initListener() {
            const player = Vue.prototype.TWebLive.createPlayer()
            window.player = player
            Vue.prototype.player = player
            this.player.setCustomConfig({
                autoplay: true,
                poster: { style: 'cover', src: bg },
                pausePosterEnabled: false,
                wording: {
                    1: '您观看的直播已结束哦~ ',
                    2: '您观看的直播已结束哦~ ',
                    4: '您观看的直播已结束哦~ ',
                    13: '您观看的直播已结束',
                    2032: '请求视频失败，请检查网络',
                    2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
                }
            })
            this.setRenderView()
            // 播放时
            this.player.on(this.TWebLive.EVENT.PLAYER_PLAYING, this.onPlayerPlaying)
            // 暂停
            this.player.on(this.TWebLive.EVENT.PLAYER_PAUSE, this.onPlayerPause)
            // 浏览器不允许自动播放
            this.player.on(this.TWebLive.EVENT.PLAYER_AUTOPLAY_NOT_ALLOWED, this.onPlayerAutoPlayNotAllowed)
            this.player.on(this.TWebLive.EVENT.PLAYER_ERROR, this.onPlayerError)
        },
        onPlayerPlaying(event) {
            console.log('demo player | onPlayerPlaying |', event)
        },
        onPlayerPause(event) {
            console.log('demo player | onPlayerPause |', event)
        },
        onPlayerAutoPlayNotAllowed(event) {
            this.$store.commit('showMessage', {
                message: '不能自动播放',
                type: 'info'
            })
            console.log('demo player | onPlayerAutoPlayNotAllowed |', event)
        },
        onPlayerError(event) {
            console.log('demo player | onPlayerError |', event)
        },
        // 设置渲染界面
        setRenderView() {
            this.player.setRenderView({ elementID: 'player-container' })
            //开始播放
            this.startPlay()
        },
        resumeAudio() {
            this.player.resumeAudio().then(() => {
                console.log('demo player | resumeAudio | ok')
                this.isMute = false
                this.audioContent = '关闭麦克风'
            }).catch((error) => {
                console.error('demo player | resumeAudio | failed', error)
            })
        },
        pauseAudio() {
            this.player.pauseAudio().then(() => {
                this.isMute = true
                this.audioContent = '打开麦克风'
                console.log('demo player | pauseAudio | ok')
            }).catch((error) => {
                console.error('demo player | pauseAudio | failed', error)
            })
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        },
        //播放
        startPlay() {
            //随机生成一个用户id用于游客播放
            let userId = this.getRandomInt(2000, 9999).toString()
            this.userId=userId
            let roomId = this.chatInfo.groupId
            //调接口获取直播地址
            axios(
                {
                    method: 'get',
                    url: this.$store.state.baseUrl + '/api/live/getPlayerUrl',
                    params: { userId: userId, roomId: roomId },
                }
            ).then((res) => {
                if (res.data.code === 200) {
                    this.$store.state.desc=res.data.data.roomInfo.roomDesc
                    console.log("jxhjxh1111111111111111111111")
                    console.log(this.$store.state.desc)
                    this.player.startPlay(res.data.data.playerUrl).then(() => {
                        console.log('demo player | startPlay | ok')
                        this.timeRecord()
                        this.isPlay = true
                        this.playContent = '暂停播放'
                    }).catch((error) => {
                        console.error('demo player | startPlay | failed', error)
                    })
                    //登录
                    this.webLiveLogin(userId, roomId)
                }
            });
        },
        webLiveLogin(userId, roomId) {
            //调接口获取usersig
            axios(
                {
                    method: 'get',
                    url: this.$store.state.baseUrl + '/api/user/getUserSig',
                    params: { userId: userId },
                }
            ).then((res) => {
                if (res.data.code === 200) {
                    //该用户进入直播房间
                    this.im.login({
                        userID: userId,
                        userSig: res.data.data.userSig,
                    }).then(() => {
                        this.loading = false
                        this.$store.commit('toggleIsLogin', true)
                        this.$store.commit('showLogin', false)
                        let _webLiveSmsLoginInfo = {
                            loginTime: Date.now(),
                            roomID: roomId,
                            userID: userId,
                            userSig: res.data.data.userSig,
                        }

                        this.$store.commit('setChatInfo', _webLiveSmsLoginInfo)
                        this.$store.commit('showMessage', { message: '登录成功', type: 'success' })
                        this.enterRoom()
                        this.changeId=1;
                    }).catch((err) => {
                        this.loading = false
                        this.$store.commit('showMessage', { message: '登录失败', type: 'error' })
                    })
                }
            });
        },

        //暂停播放 {
        pauseVideo() {
            this.player.pauseVideo().then(() => {
                this.isPlay = false
                this.playContent = '开启播放'
                clearInterval(this.timer_record)
                console.log('demo player | pauseVideo | ok')
            }).catch((error) => {
                console.error('demo player | pauseVideo | failed', error)
            })
        },
        // 回复播放
        resumeVideo() {
            this.player.resumeVideo().then(() => {
                this.isPlay = true
                this.playContent = '暂停播放'
                this.timeRecord()
                console.log('demo player | resumeVideo | ok')
            }).catch((error) => {
                console.error('demo player | resumeVideo | failed', error)
            })
        },
        // 正在播放
        isPlaying() {
            return this.player.isPlaying()
        },
        //
        setPlayoutVolume() {
            // 关闭进度条
            clearTimeout(this._timer)
            this._timer = setTimeout(() => {
                this.showSetVolume = false
            }, 3000)
            console.log('demo player | setPlayoutVolume', this.volumeValue)
            this.player.setPlayoutVolume(this.volumeValue)
        },
        // 停止播放
        stopPlay() {
            this.player.stopPlay()
            console.log('demo player | stopPlay | ok')
            clearInterval(this.timer_record)
            this.isPlay = false
        },
        shareHandler() {
            this.isShow_playUrl = true
        },
        // 计时器
        timeRecord() {
            let hour = this.time_value.hour
            let minute = this.time_value.minute
            let second = this.time_value.second
            this.timer_record = setInterval(() => {
                second = parseInt(second) + 1
                if (second >= 60) {
                    second = 0
                    minute = parseInt(minute) + 1
                }
                if (minute >= 60) {
                    minute = 0
                    hour = parseInt(hour) + 1
                }
                this.time_value.hour = hour
                this.time_value.minute = minute
                this.time_value.second = second
                let h = hour < 10 ? ('0' + hour) : hour
                let m = minute < 10 ? ('0' + minute) : minute
                let s = second < 10 ? ('0' + second) : second
                this.playerTime = h + ':' + m + ':' + s

            }, 1000)
        },
    }
}
