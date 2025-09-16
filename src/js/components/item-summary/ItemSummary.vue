<template>
  <div class="itemFormat">

    <h4>Alternative Plane Routes</h4>

    <h5>Outbound Routes:</h5>
    <ul>
      <li
        v-for="(item, index) in item.outboundAlternatives.slice(1)"  
        :key="index"
      >                                                     <!-- Presents the 2nd best outbound flight -->
        {{ item.route }} (£{{ item.cost }})
      </li>
    </ul>

    <h5>Inbound Routes:</h5>
    <ul>
      <li
        v-for="(item, index) in item.inboundAlternatives.slice(1)"
        :key="index"
      >                                                   <!-- Presents the 2nd best inbound flight -->
        {{ item.route }} (£{{ item.cost }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ItemSummary",
  props: {
    item: { 
      type: Object, 
      required: true 
    },
  },
};
</script>

<style scoped>
  .itemFormat{
    text-align: left;
  }
</style>
