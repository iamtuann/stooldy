<template>
  <div class="container pb-5">
    <h2 class="fs-4 mt-4 text-center">Mã hóa Affine</h2>
    <div class="mt-4"></div>
    <v-form ref="form">
      <v-text-field
        v-model="input.x" label="Bản rõ X" 
        variant="outlined"
      >
      </v-text-field>
      <div class="row">
        <div class="col-12 col-md-6">
          <v-text-field
            v-model="input.k1" label="k1" 
            variant="outlined" :rules="numberInputRules"
          >
          </v-text-field>
          <v-text-field
            v-model="input.k2" label="k2" 
            variant="outlined" :rules="numberInputRules"
          >
          </v-text-field>
        </div>
      </div>
    </v-form>
    <div>
      Mã hóa {{ input.x.toUpperCase() }}
      <span class="mdi mdi-arrow-right-bold-outline"></span>
      {{ result }}
    </div>
    <v-btn color="primary" @click="handleSolve" class="mt-2">Giải</v-btn>

    <div class="mt-4" v-if="result">
      <ul>
        <li v-for="(step,i) in listStep" :key="i">
          Với x<sub>{{ i+1 }}</sub> = {{ step.x }} = {{ step.xValue }} <br>
          y<sub>{{ i+1 }}</sub> = 
          ({{ `${k1} * ${step.xValue} + ${k2}` }}) mod 26 = {{ step.yValue }} = {{ step.y }}
          <br>
        </li>
        <span class="mdi mdi-arrow-right-bold-outline"></span>
        Vậy bản mã y = {{ result }}
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const input = reactive({
  x: '',
  k1: '',
  k2: '',
})
const xArr = ref([]);
const yArr = ref([]);
const listStep = ref([]);
const k1 = ref(0);
const k2 = ref(0);

const result = ref('')
const form = ref(null);
const numberInputRules = [
  v => !!v || "Trường không được để trống",
  v => /^\d+$/.test(v) || "Số không hợp lệ"
]

async function handleSolve() {
  const { valid } = await form.value.validate();
  if (valid) {
    result.value = '';
    listStep.value = [];
    xArr.value = [];
    yArr.value = [];
    input.x = input.x.toUpperCase();
    xArr.value = input.x.trim().split("");
    k1.value = input.k1;
    k2.value = input.k2;
    xArr.value.forEach(x => {
      let xValue = x.charCodeAt(x) - 65;
      let yValue = (xValue * Number(k1.value) + Number(k2.value)) % 26;
      let y = String.fromCharCode(yValue + 65);
      yArr.value.push(y);
      listStep.value.push({
        x,
        xValue,
        y,
        yValue
      })
    })
    result.value = yArr.value.join('');
  }
}

</script>

<style scoped>

</style>