<template>
  <div>
    <div class="product__list">
      <div class="product" v-for="prod in prods" :key="prod.ID">
        <span class="product__info product__cell">
          <a class="product__lnk" target="_blank" :href="site + prod.DETAIL_PAGE_URL">{{ prod.NAME }}</a>
          <span class="product__id">id: <a target="_blank" :href="site + '/bitrix/admin/iblock_element_edit.php?IBLOCK_ID=' + prod.CATALOG_XML_ID + '&type=catalog&ID=' + prod.PRODUCT_ID + '&lang=ru'">{{ prod.ID }}</a></span>
          <span class="product__id">арт: <a :href="'https://www.oasiscatalog.com/item/' + prod.OASIS_ID" target="_blank">{{ prod.OASIS_ID }}</a></span>
          <br>
          <span v-if="prod.DISCOUNT_PRICE > 0">
            скидка: {{ prod.DISCOUNT_PRICE}}<br>
          </span>
        </span>
        <span class="product__qty product__cell">{{ prod.QUANTITY }} шт</span>
        <span class="product__price product__cell">{{ parseInt(prod.PRICE) + ' руб ' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prods: this.$store.getters['orders/getProds'](this.orderKey),
      site: process.env.VUE_APP_SITE
    }
  },
  props: ['orderKey'],
}
</script>

<style scoped lang="scss">
  .product__list{
    max-height: 350px;
    overflow: auto;
    padding: 0 0 10px;
  }
  .product{
    margin-bottom: 5px;
    background-color: #313131;
    border-radius: 5px;
    position: relative;
    padding-bottom: 28px;
    display: inline-block;
    width: 100%;
    float: left;
    &__lnk{
      float: left;
      width: 100%;
    }
    &__qty{
      background-color: #67005f;
      padding: 3px 5px;
      border-radius: 5px;
      position: absolute;
      bottom: 5px;
      left: 5px;
    }
    &__price{
      background-color: #67005f;
      padding: 3px 5px;
      border-radius: 5px;
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
    &__id{
      float: left;
      background-color: #5e5e5e;
      padding: 0 3px;
      border-radius: 5px;
      margin: 0 5px 0 0;
    }
    &__info{
      padding: 5px;
      float: left;
      width: 100%;
    }
  }
</style>