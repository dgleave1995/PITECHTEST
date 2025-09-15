<template>
  <div class="section-container">
    <!-- Loop over sections -->
    <div v-for="(section, key) in home.formSections" :key="key" class="section">
      <h2>{{ section.title }}</h2>

      <!-- Loop over elements -->
      <component
        v-for="(element, elementKey) in section.elements"
        :key="elementKey"
        :is="resolveComponent(element.component)"
        v-bind="element.props"
      />
    </div>
  </div>
</template>

<script setup>
import home from '../display-configs/home.js'
import Heading from '../components/heading/heading.vue'
import TileSelectWrapper from '../components/tile-select-wrapper/TileSelectWrapper.vue'
import OutputSummaryList from '../components/output-summary-list/OutputSummaryList.vue'

const componentsMap = {
  TileSelectWrapper,
  OutputSummaryList,
  Heading
}

function resolveComponent(name) {
  return componentsMap[name] || 'div'
}
</script>

<style scoped>
.section {
  display: flex;
  justify-content: center; /* horizontal centering */
  align-items: center;     /* vertical centering */
  flex-direction: column;
  min-height: 80vh;        /* give some height for vertical centering */
}
</style>
