<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses
      :transactions="transactions"
      @update-income-expenses="updateIncomeExpenses"
    />
    <AddTransaction @add-transaction="addTransaction" />
    <TransactionList
      :transactions="transactions"
      @remove-transaction="onRemoveTransaction"
    />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

import { ref, onMounted, computed } from 'vue'

import { useToast } from 'vue-toastification'
const toast = useToast()

const transactions = ref([])

const incomeExpense = ref({
  income: 0,
  expense: 0
})

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if (savedTransactions) {
    transactions.value = savedTransactions
  }
  updateIncomeExpenses()
})

const addTransaction = (transaction) => {
  const { id, text, amount } = transaction
  transactions.value.push({ id, text, amount })
  toast.success('Transaction added')
  saveToLocalStorage()
}

const updateIncomeExpenses = (updatedIncomeExpense = { income: 0, expense: 0 }) => {
  incomeExpense.income = updatedIncomeExpense?.income
  incomeExpense.expense = updatedIncomeExpense?.expense
}

const total = computed(() => {
  return transactions.value
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
})

const onRemoveTransaction = (id) => {
  transactions.value.splice(transactions.value.map((t) => t.id).indexOf(id), 1)
  toast.success('Transaction removed')
  saveToLocalStorage()
}

const saveToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>

<style lang="scss" scoped></style>
