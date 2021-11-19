// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'

// tyh的加入
import { Form, Field, Icon, Divider, Button, Image as VanImage,  DropdownMenu, DropdownItem, RadioGroup, Radio, 
  DatetimePicker, Popup, Checkbox, CheckboxGroup, Picker, Cell, CellGroup, Uploader, ActionSheet} from 'vant'
Vue.use(VanImage)
Vue.use(Form)
Vue.use(Field)
Vue.use(Icon)
Vue.use(Divider)
Vue.use(Button)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Picker)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(ActionSheet)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
