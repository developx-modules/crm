<template>
  <div>
    <span v-for="prop in props" :key="prop.ID">
      <div class="prop" v-if="prop.VALUE">
        <div  v-if="prop.CODE == 'NAME' || prop.CODE == 'FIO'">
          <span class="prop__name">{{ prop.NAME }}:</span> <a class="prop__val" target="_blank" :href="site + '/bitrix/admin/user_edit.php?lang=ru&ID=' + userId">{{ prop.VALUE }} ({{ userId }})</a>
        </div>
        <div v-else>
          <span class="prop__name">{{ prop.NAME }}:</span> <span class="prop__val">{{ prop.VALUE }}</span>
        </div>
      </div>
    </span>
    <div v-if="comments">
       <div>Комментарий клиента: {{ comments }}</div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      userId: this.$store.getters['orders/getUserId'](this.orderKey),
      props: this.$store.getters['orders/getProps'](this.orderKey),
      comments: this.$store.getters['orders/getComments'](this.orderKey),
      site: process.env.VUE_APP_SITE
    }
  },
  props: ['orderKey'],
}
</script>

<style scoped lang="scss">
  .prop{
    span{
      border-top: 1px solid #696969;
      padding: 0 3px;
      margin-bottom: 5px;
      float: left;
    }
    &:last-child{
      border-bottom: none;

      span{
        border-top: none;
      }
    }
    &__name{
      display: inline-block;
      background-color: #5e5e5e;
      padding: 0 5px;
      border-radius: 5px;
      float: left;
      clear: both;
      margin-right: 5px;
      margin-bottom: 5px;
    }
    &__val{
      float: left;
      margin-bottom: 5px;
    }
  }

  li.selected{
    background-color: #00a92c;
    color: #fff;
    cursor: inherit;
  }
</style>