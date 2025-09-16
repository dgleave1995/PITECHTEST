<template>
  <div class="tile-container">
    <!-- Loops through the menu prop and for each item displays a new menu icon -->
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

  components: { 
    TileSelect 
  },

  props: {
    menus: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
.tile-container {
  display: flex;                
  flex-wrap: wrap;              
  justify-content: center;      
  align-items: center;          
  height: 100%;                 
  gap: 20px;                    
  min-height: 300px;            
  min-width: fit-content;
}
</style>
