<template>
  <div>
    <ul>
      <li v-for="status in statuses"
          :key="status.ID"
          :class="{ selected: status.ID == statusId }"
          v-on:click="$emit('setStatusParent', status.ID, orderId)">
        {{ status.NAME }}
      </li>
    </ul>
  </div>
</template>


<script>

export default {
  props: ['statuses', 'statusId', 'orderId'],
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