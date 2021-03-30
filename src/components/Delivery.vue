<template>
  <div>
    {{ type[deliveryId] }}
  </div>
</template>


<script>

export default {
  data() {
    return {
      type: {
        COURIER: 'Курьер',
        PICKUP: 'Самовывоз'
      },
      deliveryId: this.$store.getters['orders/getDeliveryType'](this.orderKey)
    }
  },
  props: ['orderKey']
}
</script>

<style scoped>
ul{
  padding: 0;
  margin: 0;
  list-style: none;
}
li{
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
li.selected{
  background-color: #00a92c;
  color: #fff;
  cursor: inherit;
}
</style>