<template>
  <div class="tile-container">
    <TileSelect 
      v-for="(value, key) in menus" 
      :key="key" 
      :title="value.title" 
      :component="value.component" 
    />
  </div>
</template>

<script>
import TileSelect from '../tile-select/TileSelect.vue'

export default {
  name: 'TileSelectWrapper',
  components: { TileSelect },
  props: {
    menus: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log('menus prop:', this.menus)
  }
}
</script>

<style scoped>
.tile-container {
  display: flex;                /* enables flex layout */
  flex-wrap: wrap;              /* wrap to next line if too many tiles */
  justify-content: center;      /* horizontal centering */
  align-items: center;          /* vertical centering */
  height: 100%;                 /* ensure container fills parent for vertical centering */
  gap: 20px;                    /* space between tiles */
  min-height: 300px;            /* optional: makes vertical centering noticeable */
  min-width: fit-content;
}
</style>
