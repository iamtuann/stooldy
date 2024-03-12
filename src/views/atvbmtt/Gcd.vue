<template>
  <div class="container pb-5">
    <h2 class="fs-4 mt-4 text-center">Thuật toán Euclidean tìm UCLN</h2>
    <div class="mt-4"></div>
    <v-form ref="form">
      <v-text-field
        v-model="number1" label="Số thứ nhất" 
        variant="outlined" :rules="inputRules"
      >
      </v-text-field>
      <v-text-field
        v-model="number2" label="Số thứ hai" 
        variant="outlined" :rules="inputRules"
      >
      </v-text-field>
    </v-form>
    <div>
      Tính GCD({{ number1 || 'a'}}, {{ number2 || 'b'  }})
    </div>
    <v-btn color="primary" @click="handleSolve" class="mt-2">Giải</v-btn>

    <div class="mt-4">
      <div v-if="listStep.length > 0"
        v-for="(step, i) in listStep" :key="i"
      >
        <p class="mb-2">
          (*) A = {{ step.a }}, B = {{ step.b }} <br>
          A / B = {{ step.a }} / {{ step.b }} = {{ step.q }} dư {{ step.r }} <br>
          Theo Euclidean GCD({{ step.a+", "+step.b }}) = GCD({{ step.b+", "+step.r }})
        </p>
      </div>
      <div v-if="result">
        Kết quả: GCD({{ number1 + ', ' + number2 }}) = {{ result }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref(null);
const inputRules = [
  v => !!v || "Trường không được để trống",
  v => /^\d+$/.test(v) || "Số không hợp lệ"
]

const number1 = ref("");
const number2 = ref("");
const result = ref(null);
const listStep = ref([]);

async function handleSolve() {
  const { valid } = await form.value.validate();
  if (valid) {
    result.value = 0;
    listStep.value = [];
    if (Number(number1.value) > Number(number2.value)) {
      euclidean(number1.value, number2.value);
    } else {
      euclidean(number2.value, number1.value)
    }
  }
}

function euclidean(bigNumber, smallNumber) {
  let a = bigNumber;
  let b = smallNumber;
  if (a == 0) {
    result.value = b;
    return b;
  } else if (b == 0) {
    result.value = a;
    return a;
  } else {
    while(b > 0) {
      let r = a % b;
      const stepItem = {
        a: a,
        b: b,
        r: r,
        q: Math.floor(a/b)
      }
      listStep.value.push(stepItem);
      a = b;
      b = r;
    }
    result.value = a;
    return result.value;
  }

}
</script>

<style scoped>

</style>