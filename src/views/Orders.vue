<template>
  <div>
    <Pagen
        :records="records"
        :totalOrders="totalOrders"
        :totalPrice="totalPrice"
        :pages="pages"
        v-on:changePageParent="changePageParent"
        :num="num"
    />
    <Filters
        :filters="filters"
        v-on:parentFilter="parentFilter"
        :key="keys['Filters']"
    />
    <div class="orders">
      <div class="table" v-if="orders">
        <div class="table__item">
          <div class="table__row">Данные заказа</div>
          <div class="table__row">Доставка / Оплата</div>
          <div class="table__row table__row--prods">Товары</div>
          <div class="table__row">Статусы</div>
          <div class="table__row"><a href="javascript:void(0)" v-on:click="getOasisData">Поставщик</a></div>
          <div class="table__row"><a href="javascript:void(0)" v-on:click="getYandexData">Я.Доставка</a></div>
        </div>
        <div class="table__item" v-for="(order, i) in orders" :key="order.ID">
          <div class="table__top">
            <span class="order-num">{{ i + 1  }}</span>
            <a target="_blank" :href="site + '/bitrix/admin/sale_order_view.php?ID=' + order.ID + '&filter=Y&set_filter=Y&lang=ru'">BitrixId {{ order.ID }}</a>
            <span>{{ order.DATE_INSERT }}</span>
          </div>
          <!--<td>
            <p>{{ order.USER_LOGIN + '(' + order.USER_ID + ')'}}</p>
            <p>{{ order.USER_EMAIL }}</p>
            <p>{{ order.USER_NAME + ' ' + order.USER_LAST_NAME}}</p>
          </td>-->
          <div class="table__row">
            <Props
                :site="site"
                :userId="order.USER_ID"
                :props="order.PROPS"
                :comments="order.COMMENTS"/>
          </div>
          <div class="table__row">
            <Delivery
                :deliveryList="deliveryList"
                :deliveryId="order.DELIVERY_ID"
                :deliveryType="order.DELIVERY_TYPE"
                :orderId="order.ID"
                v-on:setDeliveryParent="setDeliveryParent"/>
            {{ order.PAYMENT_NAME }}
          </div>
          <div class="table__row table__row--prods">
            <div class="product__list">
              <div class="product" v-for="prod in order.PRODS" :key="prod.ID">
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
            <div class="total">
              Итого: {{ order.PRICE }} руб
              (доставка {{ order.PRICE_DELIVERY }} руб)
            </div>
          </div>
          <div class="table__row">
            <Status
                :statuses="statuses"
                :statusId="order.STATUS_ID"
                :orderId="order.ID"
                v-on:setStatusParent="setStatusParent"/>
          </div>
          <div class="table__row">
            <span v-if="oasisOrders[i] && oasisOrders[i]['loaded']">
              <Oasis
                  :oasisOrder="oasisOrders[i]"
                  :orderId="order.ID"
                  v-on:setOasisIdParent="setOasisIdParent"
                  v-on:removeOasisIdParent ="removeOasisIdParent"
                  v-on:createOasisOrderParent="createOasisOrderParent"
              />
            </span>
          </div>
          <div class="table__row">
            <span v-if="yandexOrders[i] && yandexOrders[i]['loaded']">
              <span v-if="oasisOrders[i]['id']">
                <YandexDelivery
                    :yandexOrder="yandexOrders[i]"
                    :orderId="order.ID"
                    :cabinetId="cabinetId"
                    v-on:setYandexIdParent="setYandexIdParent"
                    v-on:createYandexOrderParent="createYandexOrderParent"
                />
              </span>
              <span v-else>
                Сначала задайте заказ в oasis
              </span>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="orders__empty">
        <div class="">Нет заказов :(</div>
        <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 64 64" width="512"><g id="outline"><path d="m29 10h2v2h-2z"/><path d="m33 10h2v2h-2z"/><path d="m32 16a2 2 0 0 1 2 2h2a4 4 0 0 0 -8 0h2a2 2 0 0 1 2-2z"/><path d="m40 2h-16v7a4 4 0 0 0 0 8v5h16v-5a4 4 0 0 0 0-8zm-14 2h12v2h-12zm-4 9a2 2 0 0 1 2-2v4a2 2 0 0 1 -2-2zm20 0a2 2 0 0 1 -2 2v-4a2 2 0 0 1 2 2zm-4 7h-12v-12h12z"/><path d="m45.857 48.485a1 1 0 0 0 -.486-.414l-4.371-1.748v-12.909l.845-.844 5.323 7.985a1 1 0 0 0 .663.43.965.965 0 0 0 .169.015 1 1 0 0 0 .6-.2l7.733-5.8h1.667a3 3 0 0 0 0-6h-4a1 1 0 0 0 -.625.219l-4.148 3.319-3.395-5.093a2 2 0 0 0 -.293-.279c-.02-.013-.115-.072-.145-.085l-7-3a.985.985 0 0 0 -.394-.081h-12a.985.985 0 0 0 -.394.081l-7 3c-.03.013-.125.072-.145.085a2 2 0 0 0 -.293.279l-3.395 5.093-4.148-3.319a1 1 0 0 0 -.625-.219h-4a3 3 0 0 0 0 6h1.667l7.733 5.8a1 1 0 0 0 .6.2.965.965 0 0 0 .169-.015 1 1 0 0 0 .663-.43l5.323-7.985.845.844v12.909l-4.371 1.748a1 1 0 0 0 -.486.414l-3.038 5.068a3.145 3.145 0 0 0 1.448 4.347 2.488 2.488 0 0 0 1.108.264 3.832 3.832 0 0 0 2.848-1.634 10.968 10.968 0 0 0 1.079-1.53h1.412v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6h1.412a10.968 10.968 0 0 0 1.079 1.525 3.832 3.832 0 0 0 2.848 1.634 2.488 2.488 0 0 0 1.108-.264 3.159 3.159 0 0 0 1.41-4.41zm2.99-13.5a1.007 1.007 0 0 0 .778-.207l4.726-3.778h3.649a1 1 0 0 1 0 2h-2a1 1 0 0 0 -.6.2l-7.154 5.365-4.959-7.438 1.558-1.558 3.323 4.986a1 1 0 0 0 .679.433zm-14.715-8.985-2.132 3.2-2.132-3.2zm-18.378 12.565-7.154-5.365a1 1 0 0 0 -.6-.2h-2a1 1 0 0 1 0-2h3.649l4.726 3.781a1 1 0 0 0 1.457-.226l3.323-4.986 1.558 1.558zm5-10.228 5.451-2.337h1.26l3.7 5.555a1 1 0 0 0 1.664 0l3.706-5.555h1.265l5.453 2.337-3.375 3.376-2.318-1.545-1.11 1.664 2.55 1.703v12.465h-14v-12.465l2.555-1.7-1.11-1.664-2.318 1.545zm-3.3 27.768a1.126 1.126 0 0 1 -.59-1.59l2.821-4.715 4.507-1.8h2.808v3a2 2 0 0 1 -2 2h-2.132l.964-1.445-1.664-1.11s-3.979 6.031-4.721 5.66zm7.546-1.105a4 4 0 0 0 4-4v-3h2v12h-6zm14 5h-6v-12h2v3a4 4 0 0 0 4 4zm7.553-3.9c-.78.381-4.721-5.66-4.721-5.66l-1.664 1.11.964 1.45h-2.132a2 2 0 0 1 -2-2v-3h2.808l4.508 1.8 2.789 4.643a1.147 1.147 0 0 1 -.552 1.662z"/><path d="m59 41.586-1.293-1.293-1.414 1.414 2 2a1 1 0 0 0 1.414 0l2-2-1.414-1.414z"/><path d="m16 23a1 1 0 0 0 .707-.293l2-2-1.414-1.414-1.293 1.293-1.293-1.293-1.414 1.414 2 2a1 1 0 0 0 .707.293z"/><path d="m9.707 25.707 2-2-1.414-1.414-1.293 1.293-1.293-1.293-1.414 1.414 2 2a1 1 0 0 0 1.414 0z"/><path d="m58 46a7.778 7.778 0 0 1 -.684 3.523c-1.522-2.407-3.159-2.748-4.031-2.688a2.973 2.973 0 0 0 -2.632 1.894 2.757 2.757 0 0 0 .64 2.978 5.019 5.019 0 0 0 5.293 1.111 1.479 1.479 0 0 1 -.189 1.1c-.814 1.172-3.914 1.241-5.288 1.09l-.219 1.988a14.036 14.036 0 0 0 1.489.074c1.733 0 4.464-.294 5.658-2.007a3.728 3.728 0 0 0 .288-3.488c.895-1.015 1.675-2.72 1.675-5.575zm-5.293 4.293a.743.743 0 0 1 -.188-.842.974.974 0 0 1 .861-.619h.053c.767 0 1.646.781 2.413 2.129a3.011 3.011 0 0 1 -3.139-.668z"/><path d="m31 34h2v2h-2z"/><path d="m31 38h2v2h-2z"/><path d="m31 42h2v2h-2z"/></g></svg>
      </div>
    </div>
  </div>
</template>


<script>

import Status from "@/components/Status";
import Oasis from "@/components/Oasis";
import YandexDelivery from "@/components/YandexDelivery";
import Delivery from "@/components/Delivery";
import Props from "@/components/Props";
import Consts from '../consts'
import Filters from "@/components/Filters";
import Pagen from "@/components/Pagen";


export default {
  components: {Pagen, Props, Delivery, YandexDelivery, Oasis, Status, Filters},
  data() {
    var Data = new Date();
    return{
      orders: [],
      records: 0,
      pages: 0,
      totalPrice: 0,
      totalOrders: 0,
      num: 1,
      statuses: [],
      oasisOrders: [],
      yandexOrders: [],
      deliveryList: [],
      server: process.env.VUE_APP_SERVER,
      site: process.env.VUE_APP_SITE,
      cabinetId: process.env.VUE_APP_CABINET_ID,
      apiKey: process.env.VUE_APP_API_KEY,
      filters: {
        size: {
          name: 'Заказов',
          values: [
            {
              name: '20',
              value: 20,
            },
            {
              name: '40',
              value: 40
            },
            {
              name: '80',
              value: 80
            }
          ]
        },
        days: {
          name: 'Дата',
          values: [
            {
              name: 'Все',
              value: 999
            },
            {
              name: 'Сегодня',
              value: 1,
            },
            {
              name: 'Вчера',
              value: 2
            },
            {
              name: 'Позавчера',
              value: 3
            },
            {
              name: 'За 7 дней',
              value: 7
            },
            {
              name: 'За эту неделю',
              value: Data.getDay(),
            },
            {
              name: 'За 30 дней',
              value: 30
            },
            {
              name: 'За этот месяц',
              value: Data.getDate()
            }
          ]
        },
        status: {
          name: 'Статус',
          values: [],
          selected: 0
        }
      },
      keys: {
        Filters: 0
      }
    }
  },
  mounted() {
    /*this.getStatuses().then(() => {
      this.setFilterDefaults();
      this.getOrders();
    });*/

  },
  methods: {
    async getStatuses () {
      const response = await this.axios.get(this.server + '/api/?action=GetStatuses' + '&apiKey=' + this.apiKey);
      this.statuses = response.data;
      for (var i in this.statuses){
        var status = this.statuses[i];
        this.filters['status']['values'][i] = {
          name: status['NAME'],
          value: status['ID']
        }
      }
      i++;
      this.filters['status']['values'][i] = {
        name: 'Все, кроме выполенных и отмененных',
        value: 0
      }
    },
    changePageParent: function (num) {
      this.num = num;
      this.setUrlParams();
      this.getOrders();
    },
    parentFilter: function (filterData) {
      console.log(filterData);
      for(var i in filterData){
        if (filterData[i] !== "undefined") {
          this.filters[i]['selected'] = filterData[i];
        }
      }
      this.setUrlParams();
      this.getOrders();
    },
    getOrders: function () {
      this.orders = [];
      this.axios
          .get(this.server + '/api/?action=GetOrders&' + this.getOrdersFilterParams() + '&apiKey=' + this.apiKey)
          .then(response => {
            this.orders = response.data.orders;
            this.records = response.data.records;
            this.pages = response.data.pages;
            this.totalPrice = response.data.total;
            if (typeof response.data.orders !== "undefined" && response.data.orders !== null) {
              this.totalOrders = response.data.orders.length;
            } else {
              this.totalOrders = 0;
            }
            this.getOasisData();
            this.getYandexData();
            this.$forceUpdate();
          });
    },
    getOrdersFilterParams: function () {
      var statues = 0;
      if (this.filters['status']['selected']){
        statues = this.filters['status']['selected'];
      }
      return 'size=' + this.filters['size']['selected'] + '&num=' + this.num + '&days=' + this.filters['days']['selected'] + '&status=' + statues;
    },
    setFilterDefaults: function () {
      var params = this.getUrlParams();

      for (var code in this.filters){
        var filter = this.filters[code];
        if (typeof params[code] !== "undefined") {
          filter['selected'] = params[code];
          filter['key'] = 0;
        } else {
          if (typeof filter['selected'] === "undefined") {
            filter['selected'] = filter['values'][0]['value'];
            filter['key'] = 0;
          }
        }
      }
      if (typeof params['num'] !== "undefined") {
        this.num = params['num'];
      }
      this.keys['Filters']++;
    },
    getUrlParams: function (){
      return window
          .location
          .search
          .replace('?','')
          .split('&')
          .reduce(
              function(p,e){
                var a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
              },
              {}
          );
    },
    setUrlParams: function ()
    {
      var params = this.getOrdersFilterParams();
      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
        window.history.pushState({path:newurl},'',newurl);
      }
    },
    getOasisData: function () {
      for (var i in this.orders) {
        var oasisId = this.orders[i]['PROPS']['OASIS_ID']['VALUE'];
        this.oasisOrders[i] = {};
        this.oasisOrders[i]['loaded'] = false;
        this.oasisOrders[i]['id'] = oasisId;
        if (oasisId) {
          this.getOasisOrder(i);
        } else {
          this.oasisOrders[i]['loaded'] = true;
        }
        //delete this.orders[i]['PROPS']['OASIS_ID']['VALUE'];
      }
      this.$forceUpdate();
    },
    getYandexData: function (){
      if (Consts.DELIVERY == 'yandex'){
        var ids = [];
        for(var i in this.orders) {
          var yandexId = this.orders[i]['PROPS']['YANDEX_ID']['VALUE'];
          this.yandexOrders[i] = {};
          this.yandexOrders[i]['loaded'] = false;
          if (yandexId) {
            this.yandexOrders[i]['id'] = yandexId;
            ids[ids.length] = yandexId;
          } else {
            this.yandexOrders[i]['loaded'] = true;
          }

        }
        this.$forceUpdate();
        if (ids.length > 0) {
          this.getYandexOrders(ids);
        }
      }
    },
    setStatusParent: function (id, orderId)
    {
      this.axios
          .get(this.server + '/api/?action=SetStatus&id=' + id + '&orderId=' + orderId + '&apiKey=' + this.apiKey)
          .then(response => {
            if (response.data.SUCCESS) {
              /*console.log(this.getOrderIndexById(orderId));
              console.log(this.orders);
              console.log(id);*/
              this.orders[this.getOrderIndexById(orderId)]['STATUS_ID'] = id;
            }
          });
    },
    setDeliveryParent: function (id, orderId)
    {
      this.axios
          .get(this.server + '/api/?action=SetDelivery&id=' + id + '&orderId=' + orderId + '&apiKey=' + this.apiKey)
          .then(response => {
            if (response.data.SUCCESS) {
              this.orders[this.getOrderIndexById(orderId)]['DELIVERY_ID'] = id;
            } else {
              alert(response.data['ERROR']);
            }
          });
    },
    /* Oasis */
    /*getOasisOrders: function () {
      for(var i in this.orders) {
        var oasisId = this.orders[i]['PROPS']['OASIS_ID']['VALUE'];
        if (oasisId) {
          this.getOasisOrderById(oasisId);
        }
      }
    },*/
    getOasisOrder: function (i) {
      if (this.oasisOrders[i]['id']) {
        this.oasisOrders[i]['loaded'] = false;
        this.axios
            .get(this.server + '/api/?action=GetOasisOrderById&id=' + this.oasisOrders[i]['id'] + '&apiKey=' + this.apiKey)
            .then(response => {
              this.oasisOrders[i]['data'] = response.data;
              this.oasisOrders[i]['loaded'] = true;
              this.$forceUpdate();
            });
      }
    },
    setOasisIdParent: function (oasisId, orderId) {
      var i = this.getOrderIndexById(orderId);
      this.oasisOrders[i]['loaded'] = false;
      this.axios
          .get(this.server + '/api/?action=SetOasisOrder&id=' + oasisId + '&orderId=' + orderId + '&apiKey=' + this.apiKey)
          .then(response => {
            if (response.data.SUCCESS) {
              this.oasisOrders[i]['id'] = oasisId;
              this.getOasisOrder(i);
              this.$forceUpdate();
            } else if (response.data.ERROR){
              alert(response.data.ERROR)
            }
          });
    },
    createOasisOrderParent: function (orderId) {
      var i = this.getOrderIndexById(orderId);
      this.oasisOrders[i]['loaded'] = false;
      this.axios
          .get(this.server + '/api/?action=CreateOasisOrder&id=' + orderId + '&apiKey=' + this.apiKey)
          .then(response => {
            if (response.data.SUCCESS) {
              /*this.oasisOrders[i]['id'] = oasisId;
              this.getOasisOrder(i);
              this.$forceUpdate();*/
            } else if (response.data.ERROR){
              alert(response.data.ERROR)
            }
          });
    },
    removeOasisIdParent: function (orderId) {
      var i = this.getOrderIndexById(orderId);
      this.oasisOrders[i]['loaded'] = false;
      this.$forceUpdate();
      this.axios
          .get(this.server + '/api/?action=RemoveOasisOrder&orderId=' + orderId + '&apiKey=' + this.apiKey)
          .then(response => {
            if (response.data.SUCCESS) {
              this.oasisOrders[i]['id'] = null;
              this.oasisOrders[i]['data'] = null;
              this.oasisOrders[i]['loaded'] = true;
              this.$forceUpdate();
            } else if (response.data.ERROR){
              alert(response.data.ERROR)
            }
          });
    },


    /* Yandex  */
    getYandexOrders: function (ids) {
      this.axios
          .get(this.server + '/api/?action=GetOrdersStatus&ids=' + ids.join(',') + '&apiKey=' + this.apiKey)
          .then(response => {
            if (response.data.code == 200){
              var orders = {};
              for(var i in response.data.response) {
                orders[response.data.response[i]['id']] = response.data.response[i]['status'];
              }

              for(var yi in this.yandexOrders) {
                var yOrder = this.yandexOrders[yi];
                if (yOrder['id'] && typeof orders[yOrder['id']] !== "undefined"){
                  yOrder['data'] = orders[yOrder['id']]
                }
                this.yandexOrders[yi]['loaded'] = true;
              }
              this.$forceUpdate();
            }
          });
    },
    getYandexOrder: function (i) {
      if (this.yandexOrders[i]['id']) {
        this.axios
            .get(this.server + '/api/?action=GetYandexOrderById&id=' + this.yandexOrders[i]['id'] + '&apiKey=' + this.apiKey)
            .then(response => {
              this.yandexOrders[i]['data'] = response.data;
            });
      }
    },
    setYandexIdParent: function (orderId, yandexId)
    {
      this.axios
          .get(this.server + '/api/?action=SetYandexOrder&id=' + yandexId + '&orderId=' + orderId + '&apiKey=' + this.apiKey)
          .then(() => {
            this.orders[this.getOrderIndexById(orderId)].PROPS.YANDEX_ID.VALUE = yandexId;
          });
    },
    createYandexOrderParent: function (orderId)
    {
      var i = this.getOrderIndexById(orderId);
      this.yandexOrders[i]['loaded'] = false;
      /*console.log(i);
      console.log(this.yandexOrders[i]);*/
      this.$forceUpdate();
      this.axios
          .get(this.server + '/api/?action=CreateYandexOrder&orderId=' + orderId + '&apiKey=' + this.apiKey)
          .then(response => {
            console.log(response);
            if (response['data']['code'] == 200) {
              this.yandexOrders[i]['id'] = response.data.response[0];
              //console.log(this.yandexOrders[i]);
              this.getYandexOrders([response.data.response[0]]);
            } else if (response.data.ERROR){
              alert(response.data.ERROR)
            } else {
              alert('Ошибка')
            }
          });
    },

    getOrderIndexById: function (id)
    {
      for (var i in this.orders){
        if (this.orders[i]['ID'] == id){
          return i;
        }
      }
      return false;
    }
  },
  watch: {
  },
}
</script>

<style>
*{
  box-sizing: border-box;
}
body #app{
  color: #fff;
}
body{
  margin: 0;
  padding: 0;
  background-color: #3e3e3e;
  color: #fff;
}
body a{
  color: #87b1ff;
}
table{
  text-align: left;
  border-spacing: 0;
}
th{
  padding: 10px 5px;
}
td{
  vertical-align: top;
  border-top: 1px solid #6b6b6b;
  padding: 10px 5px;
}
p{
  padding: 0;
  margin: 0 0 5px;
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
}
.product__lnk{
  float: left;
  width: 100%;
}
.product__qty{
  background-color: #67005f;
  padding: 3px 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 5px;
  left: 5px;
}
.product__price{
  background-color: #67005f;
  padding: 3px 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.product__info{
  padding: 5px;
  float: left;
  width: 100%;
}

.product__id{
  float: left;
  background-color: #5e5e5e;
  padding: 0 3px;
  border-radius: 5px;
  margin: 0 5px 0 0;
}

input{
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #ddd;
  border: none;
  max-width: 100%;
}

.btn{
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  display: inline-block;

}

.id-block{
  position: relative;
}
.id-block p{
  font-size: 12px;
  margin: 0 0 5px
}
.id-block__btn-line{
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
  border: none;
  width: 35px;
  height: 35px;
  right: 0;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='484.5px' height='484.5px' viewBox='0 0 484.5 484.5' style='enable-background:new 0 0 484.5 484.5;' xml:space='preserve'%3E%3Cg%3E%3Cg fill='%23fff'%3E%3Cpolygon points='433.5,114.75 433.5,216.75 96.9,216.75 188.7,124.95 153,89.25 0,242.25 153,395.25 188.7,359.55 96.9,267.75 484.5,267.75 484.5,114.75 '/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");background-size: 50%;
  background-color: #006ac5;
  border-radius: 5px;
}
a{
  color: #0059ff;
  text-decoration: none;
}
.orders{
  margin-bottom: 34px;
  display: inline-block;
  width: 100%;
}
.orders__r{
  float: left;
  background-color: #555555;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}
.orders__r .btn-provider{
  width: 100%;
  margin-bottom: 10px;
  float: right;
  clear: both;
}
.orders__l{
  float: left;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.filter__btns{
  float: right;
  width: 15%;
}
.product__list{
  max-height: 350px;
  overflow: auto;
  padding: 0 0 10px;
}
.total {
  color: #daff00;
}
.order-num{
  background-color: #67005f;
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
.table__top{
  background-color: #4a4a4a;
  padding: 5px 10px;
  float: left;
  width: 100%;
  line-height: 30px;
  transition: 0.9s;
}
.table__top .order-num{
  float: left;
}
.table__top a{
  float: left;
  margin: 0 15px;
}
.table__top span{
  float: right;
}
.table__item {
  float: left;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #6f6f6f;
  padding: 0 0 10px;
  transition: 0.3s;
}

.table__item:hover,
.table__item:hover .table__top{
  background-color: #2b2b2b;
}

.table__item:first-child{
  padding: 10px 0;
  background-color: #2b2b2b;
}
.table__row {
  float: left;
  width: 15%;
  padding: 5px 10px;
}
.table__row a{

}
.table__row--prods{
  width: 25%;
}

.orders__empty{
  text-align: center;
  color: #fff;
  fill: #505050;
}
.orders__empty div{
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0;
}
</style>