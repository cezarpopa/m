<template>
    <div class="col-12 my-5">
      <input class="px-0 h2 fw-bold w-100" type="text" v-model="info.title">
      <input type="date" class="px-0 h3 fw-bold w-100" v-model="info.date">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ReportTitleInputs',
  setup() {
    const store = useMainStore();
    const { info } = storeToRefs(store)

    return {
      info,
    }
  }
})
</script>
