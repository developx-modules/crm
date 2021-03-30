<template>
  <div>
    <ul>
      <li v-for="status in $store.getters['filters/getStatuses']"
          :key="status['value']"
          :class="{ selected: status['value'] == statusId }"
          v-on:click="setStatus(status.value)">
        {{ status['name'] }}
      </li>
    </ul>
  </div>
</template>


<script>

export default {
  data() {
    return {
      statusId: false
    }
  },
  props: ['orderKey'],
  methods: {
    setStatus: function (id) {
      this.$store.dispatch("orders/setStatus", {id: id, orderKey: this.orderKey});
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    getStatus: function ()
    {
      this.statusId = this.$store.getters['orders/getOrderStatus'](this.orderKey);
    }
  },
  mounted() {
    this.getStatus();
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (
           mutation['payload']['orderKey'] == this.orderKey &&
           mutation['type'] == 'orders/setStatus'
       ) {
          this.getStatus();
       }
    });
  }
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
    cursor: pointer;
  }
  li.selected{
    background-color: #00a92c;
    color: #fff;
    cursor: inherit;
  }
</style>