<template>
  <div 
    class="menuBox"
    :class="{ expanded: isExpanded }"
    @click="expand"
  >
    <!-- Collapsed view -->
    <p v-if="!isExpanded" class="title">{{ title }}</p>

    <!-- Expanded view -->
    <div v-else class="content" @click.stop>
      <!-- Close button -->
      <button class="close-btn" @click="close">×</button>

      <h2 class="expanded-title">{{ title }}</h2>
      <div class="component-wrapper">
        <component :is="resolvedComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import OutputSummaryList from '../output-summary-list/OutputSummaryList.vue'
import ReadMe from '../read-me/ReadMe.vue'
import Considerations from '../considerations/Considerations.vue'

export default {
  props: {
    title: { 
      type: String, 
      required: true 
    },
    component: { 
      type: String, 
      required: false 
    }
  },

  components: {
    OutputSummaryList,
    ReadMe,
    Considerations
  },

  data() {
    return {
      isExpanded: false
    }
  },

  computed: {
    resolvedComponent() {
      return {
        OutputSummaryList: this.$options.components.OutputSummaryList,
        ReadMe: this.$options.components.ReadMe,
        Considerations: this.$options.components.Considerations
      }[this.component] || null
    }
  },

  methods: {
    expand() {
      if (!this.isExpanded) {
        this.isExpanded = true
      }
    },
    close() {
      this.isExpanded = false
    }
  }
}
</script>


<style scoped>
.menuBox {
  height: 250px;
  width: 250px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  cursor: pointer;
  overflow: hidden;
  margin: 30px;
  border: 1px solid black;
  font-size: 18px;
  color: #d80751;
}

.menuBox:hover {
  background-color: #87CEEB;
  border-color: black;
  height: 300px;
  width: 300px;
}

.menuBox.expanded {
  position: fixed;
  top: 5%;
  left: 5%;
  width: 80%;
  height: 80vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  cursor: default;
  overflow: hidden;
  background-color: #FFFFFF;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #d80751;
  text-align: center;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  position: relative;
  width: 80%;
}

.expanded-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  flex-shrink: 0;
}

.component-wrapper {
  flex: 1;
  width: 90%;
  overflow-y: auto;
  padding-right: 10px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #d80751;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #000;
}
</style>
