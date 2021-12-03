// 初始化dayjs相关的配置

import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置处理使用相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 相对时间
export const bettweenTime=(value)=>{
    return dayjs(value).from(dayjs())
}

// 格式化时间
export const formatTime=(value,format)=>{
    return dayjs(value).format(format)
}
// 某时间距离当前时间
// console.log(dayjs('2020-05-13').from(dayjs()))