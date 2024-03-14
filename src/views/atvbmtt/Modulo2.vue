<template>
  <div class="container">
    <h2 class="fs-4 mt-4 text-center">Tính mod với số mũ</h2>
    <div class="mt-4"></div>
    <v-form ref="form">
      <v-text-field
        v-model="xModel" label="x (cơ số)" 
        variant="outlined" :rules="inputRules"
      >
      </v-text-field>
      <v-text-field
        v-model="yModel" label="y (số mũ)" 
        variant="outlined" :rules="inputRules"
      >
      </v-text-field>
      <v-text-field
        v-model="nModel" label="n (số bị chia)" 
        variant="outlined" :rules="inputRules"
      >
    </v-text-field>
    <strong class="ms-2">
      {{ xModel || 'x' }} <sup>{{ yModel || 'y' }}</sup> mod {{ nModel || 'n' }} = {{ '?' }}
    </strong> <br>
    <v-btn color="primary" @click="handleSolve" class="mt-2">Giải</v-btn>
    <div class="mt-4" v-if="result != null">
      <p>{{ y }}={{ binExp }}B (binary)</p>
      <li v-for="(step, i) in listStep" :key="i">
        Bước i = {{ listStep.length - i - 1 }}, b{{ listStep.length - i - 1 }} = {{ listBinExp[i] }} <br>
        p = p * p = {{ step.pSquare }} <br>
        p = p mod {{ n }} = {{ step.pSquare }} mod {{ n }} = {{ step.pModulo }} <br>
        <template v-if="step.pMultipleX && step.pModulo2">
          p = p * x = {{ step.pModulo }} * {{ x }} = {{ step.pMultipleX }} <br>
          p = p mod {{ n }} = {{ step.pMultipleX }} mod {{ n }} = {{ step.pModulo2 }}
        </template>
      </li>
      <div>
        <span class="mdi mdi-arrow-right-bold-outline"></span>
        <strong class="ms-2">
          {{ x }} <sup>{{ y }}</sup> mod {{ n }} = {{ result }}
        </strong>
      </div>
    </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { decToBin, decToBinArray } from "../../utils/calculate";

const form = ref(null);
const inputRules = [
  v => !!v || "Trường không được để trống",
  v => /^\d+$/.test(v) || "Số không hợp lệ"
]

const xModel = ref("");
const yModel = ref("");
const nModel = ref("");
const x = ref("");
const y = ref("");
const n = ref("");
const binExp =ref("")
const listStep = ref([]);
const listBinExp = ref([]);
const result = ref(null);

function handleSolve() {
  result.value = null;
  listStep.value = [];
  listBinExp.value = [];
  x.value = xModel.value;
  y.value = yModel.value;
  n.value = nModel.value;
  binExp.value = decToBin(y.value);
  listBinExp.value = decToBinArray(y.value);
  let p = 1;
  for(let i = 0; i<listBinExp.value.length; i++) {
    let pSquare = p * p;
    let pModulo = pSquare % n.value;
    p = pModulo;
    let pMultipleX = null;
    let pModulo2 = null;
    if (listBinExp.value[i] == 1) {
      pMultipleX = p * x.value;
      pModulo2 = pMultipleX % n.value;
      p = pModulo2;
    }
    listStep.value.push({
      pSquare,
      pModulo,
      pMultipleX,
      pModulo2
    })
  };
  result.value = p;
  return result.value;
}

</script>

<style scoped>
p {
  margin-bottom: 8px;
}
</style>