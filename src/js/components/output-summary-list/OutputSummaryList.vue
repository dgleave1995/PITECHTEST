<template>
  <div>
    <h3 class="text-lg font-bold mb-2">Output Summary List</h3>
    <div> <!-- Headings of the table -->
      <div class="text-heading">Vehicle</div>
      <div class="text-item">Vehicle Cost</div>
      <div class="text-item">Outbound Route</div>
      <div class="text-item">Inbound Route</div>
      <div class="text-item">Total Cost</div>
    </div>

    <!-- Loops through OutputSummaryItem to display each journey -->
    <OutputSummaryItem
      v-for="(journey, index) in journeys"
      :key="index"
      :item="journey"
    /> 
  </div>
</template>

<script>
import journeyCalculator from '../../services/journey-calculator.js'
import journeysJson from '../../../configs/journeys.json'
import OutputSummaryItem from '../output-summary-item/OutputSummaryItem.vue'

export default {
  name: 'OutputSummaryList',
  components: { OutputSummaryItem },
  data() {
    return {
      journeys: journeyCalculator.calculateJourneySuggestions(journeysJson) //calculateJourneySuggestions service to display the cheapest journeys
    }
  }
}
</script>

