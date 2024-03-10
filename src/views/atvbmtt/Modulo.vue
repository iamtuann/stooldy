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
      {{ xModel || 'x' }} <sup>{{ yModel || 'y' }}</sup> mode {{ nModel || 'n' }} = {{ '?' }}
    </strong> <br>
    <v-btn color="primary" @click="handleSolve" class="mt-2">Giải</v-btn>
    <div class="mt-4" v-if="result != null">
      <p>{{ y }}={{ binExp }}B (binary)</p>
      <p>
        {{ y }}=
        <template v-for="(bin,i) in binExpArray" :key="i">
          <template v-if="bin==1">
            2<sup>{{ i }}</sup><template v-if="i<binExpArray.length-1">+</template>
          </template>
        </template>
        = {{ displayRecipe(parseExp, '+') }}
      </p>
      <p>
        <span class="mdi mdi-arrow-right-bold-outline"></span>
        {{ x }}<sup>{{ y }}</sup> mod {{ n }} = 
        {{ x }}<sup>{{ displayRecipe(parseExp, '+') }}</sup> mod {{ n }} <br>
        = (<span v-html="displayRecipeExponent(parseExp, ' x ', x)"></span>) mod {{ n }}
      </p>
      <li v-for="(item, i) in listExpCaluate" :key="i" class="mb-2">
        <template v-if="item.exp == 1">
          {{ x }}<sup>{{ item.exp }}</sup> mod {{ n }} = {{ item.result }}
        </template>
        <template v-else>
          {{ x }}<sup>{{ item.exp }}</sup> mod {{ n }} = ({{ x }}<sup>{{ item.exp / 2 }}</sup> mod {{ n }} x {{ x }}<sup>{{ item.exp / 2 }}</sup> mod {{ n }}) mod {{ n }} <br>
          = ({{ listExpCaluate[i-1].result }} x {{ listExpCaluate[i-1].result }}) mod {{ n }}
          = {{ listExpCaluate[i-1].result * listExpCaluate[i-1].result }} mod {{ n }} = {{ item.result }}
        </template>
      </li>
      <p>
        <span class="mdi mdi-arrow-right-bold-outline"></span>
        (<span v-html="displayRecipeExponent(parseExp, ' x ', x)"></span>) mod {{ n }} <br>
        = ( {{ displayRecipe(resultModParseExp, ' x ') }} ) mod {{ n }} <br>
        = {{ product }} mod {{ n }} = {{ result }}
      </p>
      <div>
        <span class="mdi mdi-arrow-right-bold-outline"></span>
        <strong class="ms-2">
          {{ x }} <sup>{{ y }}</sup> mode {{ n }} = {{ result }}
        </strong>
      </div>
    </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { decToBin } from "../../utils/calculate";

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
const result = ref(null);
const binExp = ref("");
const binExpArray = ref([]);
const parseExp = ref([]);
const resultModParseExp = ref([])
const listExpCaluate = ref([]);
const product = ref(1);

async function handleSolve() {
  const {valid} = await form.value.validate();
  if (valid) {
    result.value = null;
    product.value = 1;
    listExpCaluate.value = [];
    resultModParseExp.value = [];
    x.value = xModel.value;
    y.value = yModel.value;
    n.value = nModel.value;
    binExp.value = decToBin(y.value);
    console.log(binExp.value);
    binExpArray.value = binExp.value.split("");
    parseExp.value = binExpArray.value.reverse().map((x, i) => {
      if (x != 0) {
        return Math.pow(2, i);
      } else return 0;
    }).filter(x => x!=0)
    console.log(parseExp.value);
    for(let i = 1; i<=parseExp.value[parseExp.value.length-1]; i*=2) {
      const result = calculateMod(x.value, i, n.value);
      listExpCaluate.value.push({
        exp: i,
        result: result
      })
      if (parseExp.value.findIndex(x => x == i) != -1) {
        product.value *= result;
        resultModParseExp.value.push(result);
      }
    }
    result.value = product.value % n.value;
  }
}

function displayRecipe(array, operation) {
  return array.join(operation);
}
function displayRecipeExponent(array, operation, base) {
  return array.map(x => `${base}<sup>${x}</sup>`).join(operation)
}

function calculateMod(x, y, n) {
  if (y==1) {
    return x % n;
  } else {
    return Math.pow(calculateMod(x, y/2, n), 2) % n;
  }
}

</script>

<style scoped>
p {
  margin-bottom: 8px;
}
</style>