<template>
  <div class="container pb-5">
    <h2 class="fs-4 mt-4 text-center">Thuật toán Euclidean mở rộng tìm phần tử ngịch đảo</h2>
    <div class="mt-4"></div>
    <v-form ref="form">
      <v-text-field
        v-model="r0Model" label="r0" 
        variant="outlined" :rules="inputRules"
      >
      </v-text-field>
      <v-text-field
        v-model="r1Model" label="r1" 
        variant="outlined" :rules="inputRules"
      >
      </v-text-field>
    </v-form>
    <div>
      Tính {{ r1Model || 'r1' }}<sup>-1</sup> mod {{ r0Model || 'r0' }}
    </div>
    <v-btn color="primary" @click="handleSolve" class="mt-2">Giải</v-btn>

    <div class="mt-4" v-if="gcd && gcd != 1">
      GCD({{ r0 }}, {{ r1 }}) != 1
    </div>

    <div class="mt-4" v-if="result != null">
      <ul>
        <template v-for="(step, i) in listStep" :key="i">
          <li v-if="i < listStep.length-1">
            Bước i = {{ i }}: r<sub>i</sub> =  r<sub>{{i}}</sub> = {{step.ri}},  r<sub>i+1</sub> =  r<sub>{{i+1}}</sub> = {{step.rip1}} <br>
            Lấy r<sub>{{i}}</sub> = {{ step.ri }} chia cho r<sub>{{i+1}}</sub> = {{ step.rip1 }} <br>
            Thương q<sub>i+1</sub> = q<sub>{{i+1}}</sub> = {{ step.qip1 }} <br>
            Dư r<sub>i+2</sub> = r<sub>{{i+2}}</sub> = {{ step.rip2 }} <br>
            <template v-if="i<2">
              s<sub>i</sub> = s<sub>{{ i }}</sub> = {{ step.si }}, t<sub>i</sub> = t<sub>{{ i }}</sub> = {{ step.ti }}
            </template>
            <template v-else>
              s<sub>i</sub> = s<sub>{{ i }}</sub>  = s<sub>i-2</sub> - q<sub>i-1</sub> * s<sub>i-1</sub>
              = s<sub>{{i-2}}</sub> - q<sub>{{i-1}}</sub> * s<sub>{{i-1}}</sub> <br> &nbsp;
              = {{ listStep[i-2].si }} - {{ listStep[i-2].qip1 }} * {{ listStep[i-1].si }}
              = {{ step.si }} <br>
              t<sub>i</sub> = t<sub>{{ i }}</sub>  = t<sub>i-2</sub> - q<sub>i-1</sub> * t<sub>i-1</sub>
              = t<sub>{{i-2}}</sub> - q<sub>{{i-1}}</sub> * t<sub>{{i-1}}</sub> <br> &nbsp;
              = {{ listStep[i-2].ti }} - {{ listStep[i-2].qip1 }} * {{ listStep[i-1].ti }}
              = {{ step.ti }}
            </template>
          </li>
          <li v-else>
            Bước i = {{ i }}: <br>
            s<sub>i</sub> = s<sub>{{ i }}</sub>  = s<sub>i-2</sub> - q<sub>i-1</sub> * s<sub>i-1</sub>
            = s<sub>{{i-2}}</sub> - q<sub>{{i-1}}</sub> * s<sub>{{i-1}}</sub> <br> &nbsp;
            = {{ listStep[i-2].si }} - {{ listStep[i-2].qip1 }} * {{ listStep[i-1].si }}
            = {{ step.si }} <br>
            t<sub>i</sub> = t<sub>{{ i }}</sub>  = t<sub>i-2</sub> - q<sub>i-1</sub> * t<sub>i-1</sub>
            = t<sub>{{i-2}}</sub> - q<sub>{{i-1}}</sub> * t<sub>{{i-1}}</sub> <br> &nbsp;
            = {{ listStep[i-2].ti }} - {{ listStep[i-2].qip1 }} * {{ listStep[i-1].ti }}
            = {{ step.ti }}
          </li>
        </template>
      </ul>
      Vậy {{ r1 }}<sup>-1</sup> mod {{ r0 }} = {{ result }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const r0Model = ref("");
const r1Model = ref("");
let r0, r1;
const gcd = ref(null);

const result = ref(null);
let ri;
let rip1;
let rip2;
let si;
let ti;
let qip1;

let step = 0;
const listStep = ref([]);


const form = ref(null);
const inputRules = [
  v => !!v || "Trường không được để trống",
  v => /^\d+$/.test(v) || "Số không hợp lệ"
]

function handleSolve() {
  gcd.value = euclidean(r0Model.value, r1Model.value);
  r0 = r0Model.value;
  r1 = r1Model.value;
  listStep.value = [];
  result.value = null;
  if (gcd.value != 1) {
    return;
  } else {
    ri=null;
    rip1=null;
    rip2=null;
    si=null;
    ti=null;
    qip1=null;
    step=0;
    extendedEuclid();
  }
}

function extendedEuclid() {
  while (rip2 != 0) {
    if (step == 0) {
      si = 1;
      ti = 0;
      ri = r0Model.value;
      rip1 = r1Model.value;
    }
    if (step == 1) {
      si = 0;
      ti = 1;
    }
    if (step > 0) {
      ri = listStep.value[step-1].rip1;
      rip1 = listStep.value[step-1].rip2;
    }
    qip1 = Math.floor(ri / rip1);
    rip2 = ri % rip1;
    if (step >= 2) {
      si = listStep.value[step-2].si - listStep.value[step-2].qip1 * listStep.value[step-1].si;
      ti = listStep.value[step-2].ti - listStep.value[step-2].qip1 * listStep.value[step-1].ti;
    }
    listStep.value.push({
      ri,
      qip1,
      rip1,
      rip2,
      si,
      ti
    })
    step++;
    if (rip2 == 0) {
      si = listStep.value[step-2].si - listStep.value[step-2].qip1 * listStep.value[step-1].si;
      ti = listStep.value[step-2].ti - listStep.value[step-2].qip1 * listStep.value[step-1].ti;
      listStep.value.push({
        si,
        ti
      })
    }
  }
  result.value = listStep.value[step]?.ti;
  console.log(listStep.value);
  return result.value
}

function euclidean(a, b) {
  if (a == 0) {
    return b;
  } else if (b == 0) {
    return a;
  } else {
    while(b > 0) {
      let r = a % b;
      a = b;
      b = r;
    }
    return a;
  }
}
</script>

<style scoped>

</style>