<template>
  <div>
    <div class="filter-info">
      <div class="filter-info__text">
        {{ $store.getters['orders/getAllRecords'] }} заказов (на сумму - {{ $store.getters['orders/getTotalPrice'] }} руб)
        <span v-if="$store.getters['orders/getPages'] > 1">из {{ $store.getters['orders/getRecords'] }}</span>
      </div>
      <div class="pagen">
        <span v-for="page in $store.getters['orders/getPages']" :key="page">
          <a href="javascript:void(0)" :class="{ selected: num == page}" v-on:click="changePage(page)">{{ page }}</a>
        </span>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: ['num'],
  data() {
    return{
      pageNums: {},
    }
  },
  methods: {
    changePage: function (num) {
      this.$emit('changePageParent', num);
    },
  }
}
</script>

<style scoped lang="scss">
  .filter-info{
    width: 100%;
    float: left;
    background-color: #67005f;
    color: #fff;
    padding: 5px 20px;
    position: fixed;
    bottom: 0;
    z-index: 10;
    text-align: left;
    &__text{
      margin-top: 6px;
      float: left;
    }
  }
  .pagen {
    float: right;
    span {
      float: left;
      margin-right: 5px;
    }
    a {
      background-color: #006ac5;
      color: #fff;
      padding: 0;
      clear: both;
      float: left;
      border-radius: 50%;
      line-height: 30px;
      height: 30px;
      width: 30px;
      text-align: center;
      &.selected {
        opacity: 0.5;
        cursor: initial;
      }
    }
  }
</style>