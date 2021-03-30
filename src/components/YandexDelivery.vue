<template>
  <div>
    <div class="id-block">
      <div v-if="!oasisOrderId">
        Задайте id поставщика
      </div>
      <div v-else-if="!yandexOrderId">
        <p>Введите номер заказа Yandex</p>
        <input placeholder="id заказа yandex" v-model="yandexIdInput">
        <button class="id-block__btn-line" v-on:click="setYandexId"></button>
        <br><br>
        <p>или создайте новый</p>
        <button class="id-block__btn btn" v-on:click="createOrder">Создать заказ</button>
      </div>
      <div v-else>
        <a class="yandex-id" target="_blank" :href="yandexLnk">
         {{ yandexOrderId }}
        </a>
        <span v-if="yandexOrderData && yandexOrderData['status']">
          <p>{{ yandexOrderData['status']['description'] }}</p>
          <p>{{ yandexOrderData['status']['datetime'] }}</p>
        </span>
        <button class="id-block__btn btn" v-on:click="createOrder">Пересоздать заказ</button>

        <button class="id-block__btn btn" v-on:click="removeYandexId">Удалить id</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return{
      yandexIdInput: '',
      oasisOrderId: false,
      yandexOrderId: false,
      yandexOrderData: {},
    }
  },
  props: ['orderKey'],
  mounted() {
    this.getOasisOrderId();

    if (this.oasisOrderId) {
      this.getOrderId();

      if (this.yandexOrderId) {
        this.$store.dispatch("yandexOrders/fetchOrder", {orderKey: this.orderKey, yandexId: this.yandexOrderId});
      }
    }

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation['payload']['orderKey'] == this.orderKey) {
        if (mutation['type'] == 'yandexOrders/updateOrder') {
          this.getOrder();
        } else if (mutation['type'] == 'orders/setOasisId') {
          this.getOasisOrderId();
        } else if (mutation['type'] == 'orders/setYandexId') {
          this.getOrderId();
        }
      }
    });
  },
  methods: {
    getOrder: function () {
      this.yandexOrderData = this.$store.getters['yandexOrders/getOrder'](this.orderKey);
    },
    getOasisOrderId: function () {
      this.oasisOrderId = this.$store.getters['orders/getOasisId'](this.orderKey);
    },
    getOrderId: function () {
      this.yandexOrderId = this.$store.getters['orders/getYandexId'](this.orderKey);
    },
    setYandexId: function ()
    {
      this.$store.dispatch("yandexOrders/setOrderId", {orderKey: this.orderKey, yandexId: this.yandexIdInput})
          .then((res) => {
            if (res['SUCCESS']) {
              this.$store.dispatch("orders/setYandexId", {orderKey: this.orderKey, yandexId: this.yandexIdInput});
            }
          });
    },
    removeYandexId: function ()
    {
      this.$store.dispatch("yandexOrders/removeOrderId", {orderKey: this.orderKey})
          .then((res) => {
            if (res['SUCCESS']) {
              this.$store.dispatch("orders/setYandexId", {orderKey: this.orderKey, oasisId: false});
            }
          });
    },
    createOrder: function ()
    {
      this.$store.dispatch("yandexOrders/createOrderId", {orderKey: this.orderKey});
    }
  },
  computed: {
    yandexLnk() {
      return 'https://partner.market.yandex.ru/delivery/' + process.env.VUE_APP_CABINET_ID + '/orders/item/' + this.yandexOrderId + '/';
    }
  },
  beforeDestroy() {
    this.unsubscribe();
  }
}
</script>

<style scoped>
  .yandex-id{
    padding: 5px 10px;
    font-size: 16px;
    background-color: #00db8e;
    color: #fff;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 5px;
  }
</style>