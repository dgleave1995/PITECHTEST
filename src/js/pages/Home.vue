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
import { defineAsyncComponent } from 'vue'
import home from '../display-configs/home.js'

// Automatically import all Vue components from the components folder
const components = import.meta.glob('../components/**/*.vue')

// Resolve component dynamically based on name from config
function resolveComponent(name) {
  // Find the path that ends with /[ComponentName].vue
  const path = Object.keys(components).find((p) => p.endsWith(`/${name}.vue`))
  if (!path) return 'div' // fallback if component not found
  return defineAsyncComponent(components[path])
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
