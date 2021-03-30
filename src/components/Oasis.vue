<template>
  <div>
    <div class="id-block">
      <div v-if="!oasisOrderId">
        <p>Введите номер заказа Oasis</p>
        <input placeholder="id заказа oasis" v-model="oasisIdInput">
        <button class="id-block__btn-line" v-on:click="setOasisId"></button>
        <br><br>
        <p>Или создайте новый</p>
        <button class="id-block__btn btn" v-on:click="createOasisOrder">Создать заказ</button>
      </div>
      <div v-if="oasisOrderData">
        <div v-if="oasisOrderData['status']">
          <span class="oasis-id">{{ oasisOrderId }}</span>
          <p>Статус: {{ oasisOrderData['status'] }}</p>
          <p v-if="oasisOrderData['services'][0]">{{ oasisOrderData['services'][0]['name'] }}</p>
          <p>Сумма: {{ oasisOrderData['total'] }} руб</p>
          <button class="id-block__btn btn" v-on:click="removeOasisId">Удалить id</button>
        </div>
        <div v-else-if="oasisOrderData['ERROR']">
          <span class="oasis-id">{{ oasisOrderId }}</span>
          <p>{{ oasisOrderData['ERROR'] }}</p>
          <button class="id-block__btn btn" v-on:click="removeOasisId">Удалить id</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      oasisIdInput: '',
      oasisOrderId: false,
      oasisOrderData: {},
    }
  },
  props: ['orderKey'],
  mounted() {
    this.getOrderId();

    if (this.oasisOrderId) {
      this.$store.dispatch("oasisOrders/fetchOrder", {orderKey: this.orderKey, oasisId: this.oasisOrderId});
    }

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (
          mutation['payload']['orderKey'] == this.orderKey
      ) {
        if (mutation['type'] == 'oasisOrders/updateOrder') {
          this.getOrder();
        } else if (mutation['type'] == 'orders/setOasisId') {
          this.getOrderId();
        }
      }
    });
  },
  methods: {
    getOrder: function () {
      this.oasisOrderData = this.$store.getters['oasisOrders/getOrder'](this.orderKey);
    },
    getOrderId: function () {
      this.oasisOrderId = this.$store.getters['orders/getOasisId'](this.orderKey);
    },
    setOasisId: function () {
      this.$store.dispatch("oasisOrders/setOrderId", {orderKey: this.orderKey, oasisId: this.oasisIdInput})
          .then((res) => {
            if (res['SUCCESS']) {
              this.$store.dispatch("orders/setOasisId", {orderKey: this.orderKey, oasisId: this.oasisIdInput});
            }
          });
    },
    createOasisOrder: function () {
      this.$store.dispatch("oasisOrders/createOrderId", {orderKey: this.orderKey});
    },
    removeOasisId: function () {
      this.$store.dispatch("oasisOrders/removeOrderId", {orderKey: this.orderKey})
          .then((res) => {
            if (res['SUCCESS']) {
              this.$store.dispatch("orders/setOasisId", {orderKey: this.orderKey, oasisId: false});
            }
          });
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  }
}
</script>

<style scoped>
.oasis-id {
  padding: 5px 10px;
  font-size: 16px;
  background-color: #d800ff;
  color: #fff;
  display: inline-block;
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>