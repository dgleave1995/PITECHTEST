<template>
  <div class="itemFormat">

    <h4>Alternative Plane Routes</h4>

    <h5>Outbound Routes:</h5>
    <ul>
      <li
        v-for="(alt, i) in item.outboundAlternatives.slice(1)"
        :key="'out-' + i"
      >
        {{ alt.route }} (£{{ alt.cost }})
      </li>
    </ul>

    <h5>Inbound Routes:</h5>
    <ul>
      <li
        v-for="(alt, i) in item.inboundAlternatives.slice(1)"
        :key="'in-' + i"
      >
        {{ alt.route }} (£{{ alt.cost }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ItemSummary",
  props: {
    item: { type: Object, required: true },
  },
};
</script>

<style scoped>
  .itemFormat{
    text-align: left;
  }
</style>
