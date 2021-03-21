<template>
  <div>
    <div class="id-block">
      <div v-if="!yandexOrder['id']">
        <p>Введите номер заказа Yandex</p>
        <input placeholder="id заказа yandex" v-model="yandexIdInput">
        <button class="id-block__btn-line" v-on:click="setYandexId"></button>
        <br><br>
        <p>или создайте новый</p>
        <button class="id-block__btn btn" v-on:click="createOrder">Создать заказ</button>
      </div>
      <div v-else>
        <a class="yandex-id" target="_blank" :href="'https://partner.market.yandex.ru/delivery/' + cabinetId + '/orders/item/' + yandexOrder['id'] + '/'">
         {{ yandexOrder['id'] }}
        </a>
        <span v-if="yandexOrder['data']">
          <p>{{ yandexOrder['data']['description'] }}</p>
          <p>{{ yandexOrder['data']['datetime'] }}</p>
        </span>
        <button class="id-block__btn btn" v-on:click="createOrder">Пересоздать заказ</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return{
      yandexIdInput: '',
    }
  },
  props: ['yandexOrder', 'orderId', 'cabinetId'],
  mounted() {
    this.yandexIdInput = this.yandexOrder['id'];
  },
  methods: {
    setYandexId: function () {

      if (this.yandexIdInput.trim() && this.yandexIdInput != this.yandexOrder['id']) {
        this.$emit('setYandexIdParent', this.orderId, this.yandexIdInput);
      }
    },
    createOrder: function () {
      this.$emit('createYandexOrderParent', this.orderId);
    }
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