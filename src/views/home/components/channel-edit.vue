/*  频道编辑 */
<template>
    <div class="channel-edit">
        <van-cell 
        :border="false"
        center
        >
            <div slot="title" class="title">我的频道</div>
            <van-button
                type="danger"
                plain
                size="mini"
                @click="isEdit = !isEdit"
            >{{isEdit ? '完成' : '编辑'}}</van-button>
        </van-cell>
        <!--  :class="{active: index === active}" 相等时文字高亮 -->
        <van-grid :gutter="10">
            <van-grid-item
            :icon="(isEdit && index !== 0) ? 'clear' : ''"
            class="grid-item"
            :class="{active: index === active}"
            v-for="(channel,index) in userChannels" 
            :key="index"
            :text="channel.name" 
            @click="onUserChannelClick(channel,index)"
            />
        </van-grid>

         <van-cell :border="false">
            <div slot="title" class="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item
            @click="onAdd(channel)" 
            class="grid-item"
            v-for="(channel,index) in recommendChannels" 
            :key="index"
             :text="channel.name" />
        </van-grid>
    </div>
</template>
<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage'
export default {
name:'ChannelEdit',
 
components: {},
 
props: {
    userChannels: {
        type: Array,
        required: true
    },
    active: {
        type: Number,
        required: true
    }
},
 
data () {
return {
    allchannels: [], //所有的频道列表
    isEdit: false // 标识编辑的状态
}
},
created () {
    this.LoadGetAllChannels()
},
methods: {
   async LoadGetAllChannels() {
       const {data} = await getAllChannels()
       console.log(data);
       this.allchannels = data.data.channels
    },
    // 添加我的频道列表
    async onAdd(channel){
        this.userChannels.push(channel)
        // 数据持久化
        if (this.user) {
        //登录了 后存储
        await addUserChannel({
            channels: [
                {id: channel.id,seq: this.userChannels.length}
                ]
        })
        } else {
        // 未登录，本地存储
        setItem('user-channels',this.userChannels)
        }
    },
    // 删除频道或者跳转频道
    onUserChannelClick(channel,index) {
        if (this.isEdit && index !== 0) {
            // 删除频道
            this.deleteChannel(channel,index)
        } else {
            this.switchChannel(index)
        }
    },
    // 删除频道
    async deleteChannel (channel,index) {
        console.log("删除频道");
        if (index < this.active) {
            // 更新active的值
            this.$emit('update-active',this.active - 1)
        } else if (index === this.active) {
                this.$emit('update-active',0)
        }
        this.userChannels.splice(index,1)
        // 数据持久化
        if (this.user) {
            // 在线持久化
          await deleteUserChannel(channel.id)
        } else {
            // 本地持久化
             setItem('user-channels',this.userChannels)
        }
    },
    // 切换频道
    switchChannel(index) {
        // 更新active
        this.$emit('update-active',index)
        // 更新弹出层的状态
        this.$emit('close')
        console.log('切换频道');
    }
},
computed: {
        recommendChannels () {
            return this.allchannels.filter(channel =>{
                return !this.userChannels.find(userchanle => {
                    return channel.id === userchanle.id
                })
            })
        //    var arr = [];
        //     this.allchannels.forEach(channel => {
        //            var flag = true
        //         for (var i= 0; i < this.userChannels.length; i++){
        //             if (channel.id === this.userChannels[i].id) {
        //                 flag = false;
        //                 break
        //             }
        //         }
        //         if (flag) {
        //             arr.push(channel)
        //         }
        //     })
        //     return arr
        },
        ...mapState(['user'])
}

}
</script>
<style scoped lang='less'>
    .channel-edit{
        padding-top: 54px;
        .title {
            font-size: 16px;
            color: #333333;
        }
        .grid-item {
            width: 80px;
            height: 43px;
            position: relative;
          /deep/ .van-grid-item__content{
                background-color: #f4f5f6;
                .van-grid-item__text {
                    font-size: 14px;
                    color: #222222;
                    margin-top: 0;
                }
            }
        /deep/.van-grid-item__icon {
            position:absolute;
            right: -6px;
            top:-6px;
            font-size: 20px;
            color: rgb(168, 165, 165);
            z-index: 3;
        }
        }
       .active {
         /deep/.van-grid-item__text {
                color: red !important;
            }
        }
    }
</style>