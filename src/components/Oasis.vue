<template>
  <div>
    <div class="id-block">
      <div v-if="!oasisOrder['id']">
        <p>Введите номер заказа Oasis</p>
        <input placeholder="id заказа oasis" v-model="oasisIdInput">
        <button class="id-block__btn-line" v-on:click="setOasisId"></button>
        <br><br>
        <p>Или создайте новый</p>
        <button class="id-block__btn btn"  v-on:click="createOasisOrder">Создать заказ</button>
      </div>
      <div v-else-if="oasisOrder['data']['ERROR']">
        <span class="oasis-id">{{ oasisOrder['id'] }}</span>
        <p>{{ oasisOrder['data']['ERROR'] }}</p>
        <button class="id-block__btn btn" v-on:click="removeOasisId">Удалить id</button>
      </div>
      <div v-else>
        <span class="oasis-id">{{ oasisOrder['id'] }}</span>
        <p>Статус: {{ oasisOrder['data']['response']['status'] }}</p>
        <p v-if="oasisOrder['data']['response']['services'][0]">{{ oasisOrder['data']['response']['services'][0]['name'] }}</p>
        <p>Сумма: {{ oasisOrder['data']['response']['total'] }} руб</p>
        <button class="id-block__btn btn" v-on:click="removeOasisId">Удалить id</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return{
      oasisIdInput: '',
    }
  },
  props: ['oasisOrder', 'orderId'],
  mounted() {
    this.oasisIdInput = this.oasisOrder['id'];
  },
  methods: {
    setOasisId: function () {
      if (this.oasisIdInput && this.oasisIdInput != this.oasisOrder['id']) {
        /*console.log(this.oasisOrder);
        console.log(this.orderId);
        console.log(this.oasisIdInput);*/
        this.$emit('setOasisIdParent', this.oasisIdInput, this.orderId);
      }
    },
    removeOasisId: function () {
      this.$emit('removeOasisIdParent', this.orderId);
    },
    createOasisOrder: function () {
      this.$emit('createOasisOrderParent', this.orderId);
    }
  }
}
</script>

<style scoped>
  .oasis-id{
    padding: 5px 10px;
    font-size: 16px;
    background-color: #d800ff;
    color: #fff;
    display: inline-block;
    border-radius: 5px;
    margin-bottom: 5px;
  }
</style>