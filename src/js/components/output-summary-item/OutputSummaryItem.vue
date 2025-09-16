<template>
  <div class="row-item" @click="showDetails"> 
    <div class="text-item">{{ item.vehicle }}</div>
    <div class="text-item">£{{ item.vehicleReturnCost }}</div>
    <div class="text-item">{{ item.outboundRoute }} (£{{ item.outboundCost }})</div>
    <div class="text-item">{{ item.inboundRoute }} (£{{ item.inboundCost }})</div>
    <div class="text-item">£{{ item.totalCost }}</div>
  </div>

  <!-- Lists all relevant info for the price and format of the journey -->
  <ItemSummary v-if="displayData" :item="item" />
</template>

<script>
import ItemSummary from '../item-summary/ItemSummary.vue';

export default {
  name: 'OutputSummaryItem',
  components: { ItemSummary },

  props: {
    item: { type: Object, required: true }
  },

  data() {
    return {
      displayData: false,
    }
  },

  methods: {
    showDetails() {
      this.displayData = !this.displayData; // toggle open/close
    }
  },
}
</script>
