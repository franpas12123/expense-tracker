<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input
        class="rounded-lg"
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
        class="rounded-lg"
        v-model="transaction.amount"
        type="number"
        id="amount"
        placeholder="Enter amount..."
      />
    </div>
    <button class="btn rounded-lg">Add transaction</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['add-transaction'])

const toast = useToast()

const transaction = ref({})

const initTransaction = () => {
  transaction.value.id = Math.floor(Math.random() * 100000000)
  transaction.value.text = ''
  transaction.value.amount = ''
}

onMounted(() => {
  initTransaction()
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
  initTransaction()
}
</script>
