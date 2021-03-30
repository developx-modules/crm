<template>
  <div>
    <div class="filter">
      <div class="filter__item"  v-for="(filter, code) in $store.getters['filters/getTopFilters']"  :key="filter['name']">
        <span>{{ filter['name'] }}</span>
        <select :name="code" v-model="filterData[code]">
          <option
              v-for="value in filter['values']"
              :value="value['value']"
              :key="value['key']">
            {{ value['name'] }}
          </option>
        </select>
      </div>
      <button v-on:click="filter" class="btn btn__filter">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511.99982">
          <path d="m492.476562 0h-471.976562c-11.046875 0-20 8.953125-20 20 0 55.695312 23.875 108.867188 65.503906 145.871094l87.589844 77.851562c15.1875 13.5 23.898438 32.898438 23.898438 53.222656v195.03125c0 15.9375 17.8125 25.492188 31.089843 16.636719l117.996094-78.660156c5.5625-3.710937 8.90625-9.953125 8.90625-16.640625v-116.367188c0-20.324218 8.710937-39.722656 23.898437-53.222656l87.585938-77.851562c41.628906-37.003906 65.503906-90.175782 65.503906-145.871094 0-11.046875-8.953125-20-19.996094-20zm-72.082031 135.972656-87.585937 77.855469c-23.71875 21.085937-37.324219 51.378906-37.324219 83.113281v105.667969l-77.996094 51.996094v-157.660157c0-31.738281-13.605469-62.03125-37.324219-83.117187l-87.585937-77.851563c-28.070313-24.957031-45.988281-59.152343-50.785156-95.980468h429.386719c-4.796876 36.828125-22.710938 71.023437-50.785157 95.976562zm0 0"/>
        </svg>
      </button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return{
      filterData: {
        size: '',
        days: '',
        status: ''
      }
    }
  },
  props: ['urlParams', 'filterKey'],
  mounted() {
    this.$store.dispatch("filters/fetchStatuses").then(() => {
      this.setFilter();
      this.filter();
    });
  },
  methods: {
    setFilter: function () {
      var params = this.urlParams;
      var storeFilters = this.$store.getters['filters/getTopFilters'];
      for (var code in this.filterData){
        if (storeFilters[code]['values'].length > 0) {
          var val = storeFilters[code]['values'][0]['value'];
          if (typeof params[code] !== "undefined") {
            val = params[code];
          }
          this.filterData[code] = val;
        }
      }
    },
    filter: function () {
      this.$emit('changeFilterParent', this.filterData);
    },
  },
  watch: {
    'urlParams': {
      handler: function () {
        this.setFilter();
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
  .filter {
    float: left;
    width: 100%;
    padding: 20px;
    background-color: #4a4a4a;

    &__item-info{
      background-color: #3e3e3e;
      padding: 5px 10px;
      line-height: 21px;
      font-size: 15px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px #3e3e3e;
    }
    &__item {
      text-align: left;
      float: left;
      width: 18%;
      margin-right: 1%;
      span {
        float: left;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;
      }
      select {
        width: 100%;
        padding: 8px 10px;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
        background-color: #ddd;
        border: none;
      }
      input{
        width: 100%;
      }
    }
  }
  .btn__filter{
    float: right;
    height: 36px;
    width: 5%;
    margin-top: 26px;
    border-radius: 5px;
    background-color: #006ac5;
    svg{
      fill: #cccccc;
      padding: 3px;
      margin-top: 2px;
      width: 25px;
    }
  }
</style>