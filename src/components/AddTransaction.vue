<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input
        v-model="transaction.text"
        type="text"
        id="text"
        placeholder="Enter text..."
      />
    </div>
    <div class="form-control">
      <label for="amount">
        Amount <br />
        (negative - expense, positive - income)
      </label>
      <input
        v-model="transaction.amount"
        type="number"
        id="amount"
        placeholder="Enter amount..."
      />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['add-transaction'])

const toast = useToast()

const transaction = ref({
  id: Math.floor(Math.random() * 100000000),
  text: '',
  amount: ''
})

function onSubmit() {
  if (transaction.value.text.trim() === '') {
    toast.error('Please add a text')
    return
  }
  if (transaction.value.amount === 0 || transaction.value.amount === '') {
    toast.error('Please add an amount')
    return
  }
  emit('add-transaction', transaction.value)
}
</script>
