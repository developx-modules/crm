<template>
  <div>
    <div class="filter-info">
      <div class="filter-info__text">
      На странице показано заказов - {{ totalOrders }} <span v-if="pages > 1">из {{ records }}</span>, на сумму - {{ totalPrice }} руб
      </div>
      <div class="pagen" :ket="pages">
        <span v-for="page in pageNums" :key="page">
          <a href="javascript:void(0)" :class="{ selected: num == page}" v-on:click="changePage(page)">{{ page }}</a>
        </span>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: ['totalOrders', 'records', 'totalPrice', 'pages', 'num'],
  data() {
    return{
      pageNums: {},
    }
  },
  mounted() {

  },
  beforeUpdate() {
    console.log('beforeUpdate');
    this.setPageNav();
  },
  methods: {
    setPageNav: function () {
      var i = 1;
      this.pageNums = {};
      while (i <= this.pages){
        this.pageNums[i] = i;
        i++;
      }
    },
    changePage: function (num) {
      this.$emit('changePageParent', num);
    },
  }
}
</script>

<style scoped>
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
}
.pagen{
  float: right;
}
.pagen span{
  float: left;
  margin-right: 5px;
}
.pagen a{
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
}
.pagen a.selected{
  opacity: 0.5;
  cursor: initial;
}
.filter-info__text{
  margin-top: 6px;
  float: left;
}
</style>