<template>
  <h3>History</h3>
  <ul id="list" class="list h-[300px] overflow-y-scroll scroll-smooth px-2">
    <li
      v-for="(transaction, index) in transactions"
      :key="transaction.id"
      :class="plusOrMinus(transaction)"
      class="rounded-sm"
    >
      <p class="w-52 overflow-hidden truncate">
        {{ transaction.text }}
      </p>
      <span>${{ transaction.amount }} </span>
      <button class="delete-btn rounded-full" @click="removeTransaction(transaction.id)">
        <XCircleIcon class="size-6 text-[#c0392b]" />
      </button>
    </li>
  </ul>
</template>

<script setup>
import { XCircleIcon } from '@heroicons/vue/24/solid'
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

<style scoped>
.delete-btn {
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
