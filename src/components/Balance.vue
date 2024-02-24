<template>
  <h4>Your Balance</h4>
  <h1 id="balance">
    <span class="money" :class="computedClass">${{ total }}</span>
  </h1>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: Number
})

const computedClass = computed(() => {
  return props.total < 0 ? 'minus' : 'plus'
})
</script>

<style scoped>
.money {
  font-size: 2.5rem;
}
</style>
