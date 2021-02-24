<template>
  <van-cell class="article-item" @click="$router.push({
    name: 'article',
    params: {
      articleId: article.art_id
    }
  })">
    <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>

    <div slot="label">

      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-wrap-item"
             v-for="(img, index) in article.cover.images"
            :key="index">
          <van-image
            fit="cover"
            :src="img"
            class="cover-item"
          />
        </div>
      </div>

      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>

    </div>

    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  components: {},

  props: {
    article: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {};
  },
};
</script>
<style scoped lang='less'>
    .article-item {
        .title {
            font-size: 16px;
            color: #3a3a3a;
        }
        .van-cell__value {
            flex: unset;
            width: 116px;
            height: 73px;
            margin-left: 12px;
        }
        .right-cover{
            width: 116px;
            height: 73px;
        }
        .cover-wrap {
            display: flex;
            padding: 15px 0;
            height: 73px;
            .cover-wrap-item {
                flex: 1;
                &:not(:last-child){
                    padding-right: 4px;
                }
                .cover-item {
                width:100%;
                height:73px;
                }
            }
        }
        .label-wrap{
            font-size: 11px;
            color: #b4b4b4;
            & span {
                margin-right: 12px;
            }
        }
    }
</style>