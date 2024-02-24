<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="(transaction, index) in transactions"
      :key="transaction.id"
      :class="plusOrMinus(transaction)"
    >
      {{ transaction.text }}
      <span>${{ transaction.amount }} </span>
      <button class="delete-btn" @click="removeTransaction(transaction.id)">x</button>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  transactions: Array
})

const plusOrMinus = (transaction) => {
  return transaction.amount < 0 ? 'minus' : 'plus'
}

const emit = defineEmits(['remove-transaction'])

const removeTransaction = (id) => {
  emit('remove-transaction', id)
}
</script>
