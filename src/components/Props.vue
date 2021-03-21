<template>
  <div>
    <span v-for="prop in props" :key="prop.ID">
      <div class="prop" v-if="prop.VALUE">
        <div  v-if="prop.CODE == 'NAME' || prop.CODE == 'FIO'">
          <span class="prop__name">{{ prop.NAME }}:</span> <a class="prop__val" target="_blank" :href="site + '/bitrix/admin/user_edit.php?lang=ru&ID=' + userId">{{ prop.VALUE }} ({{ userId }})</a>
        </div>
        <div v-else>
          <span class="prop__name">{{ prop.NAME }}:</span> <span class="prop__val">{{ prop.VALUE }}</span>
        </div>
      </div>
    </span>
    <div v-if="comments">
       <div>Комментарий клиента: {{ comments }}</div>
    </div>
  </div>
</template>


<script>

export default {
  props: ['props', 'comments', 'userId', 'site'],
}
</script>

<style scoped>
.prop{

}
.prop:first-child span{
  border-top: none;
}
.prop span{
  border-top: 1px solid #696969;
  padding: 0 3px;
  margin-bottom: 5px;
  float: left;
}
.prop:last-child{
  border-bottom: none;
}
li.selected{
  background-color: #00a92c;
  color: #fff;
  cursor: inherit;
}
.prop__name{
  display: inline-block;
  background-color: #5e5e5e;
  padding: 0 5px;
  border-radius: 5px;
  float: left;
  clear: both;
  margin-right: 5px;
  margin-bottom: 5px;
}
.prop__val{
  float: left;
  margin-bottom: 5px;
}
</style>