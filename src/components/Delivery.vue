<template>
  <div>
    {{ type[deliveryType] }}
    <!--<ul>
      <li v-for="delivery in deliveryList"
          :key="delivery.ID"
          :class="{ selected: delivery.ID == deliveryId }"
          v-on:click="$emit('setDeliveryParent', delivery.ID, orderId)">
        {{ delivery.NAME }}
      </li>
    </ul>-->
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
    }
  },
  props: ['deliveryList', 'deliveryId', 'orderId', 'deliveryType'],
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