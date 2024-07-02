<template>
  <div class="inc-exp-container rounded overflow-hidden shadow-lg">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+${{ totalIncome.toFixed(2) }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">-${{ totalExpense.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits(['update-income-expenses'])

const props = defineProps({
  transactions: Array
})

const totalIncome = ref(0)
const totalExpense = ref(0)

onMounted(() => {
  updateIncomeExpenses()
})

const updateIncomeExpenses = () => {
  const { income, expense } = calculateIncomeAndExpense()
  totalIncome.value = income
  totalExpense.value = expense

  emit('update-income-expenses', { income, expense })
}

const calculateIncomeAndExpense = () => {
  let income = 0
  let expense = 0

  props.transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      income += transaction.amount
    } else {
      expense += transaction.amount
    }
  })
  return { income, expense }
}

// watch for changes in transactions
watch(
  () => props.transactions.length,
  () => {
    updateIncomeExpenses()
  }
)
</script>
