<template>
  <div class="col-12 my-3">
    <div class="card shadow-lg rounded-1">
      <div class="card-body">
        <label for="report-title">Report Title</label>
        <input name="report-tile" class="px-0 h2 fw-bold w-100" type="text" v-model="info.title">
        <label for="report-title">Report Date</label>
        <input name="report-date" type="month" class="px-0 h3 fw-bold w-100" v-model="info.date">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useMainStore} from '@/store';
import {storeToRefs} from 'pinia';

export default defineComponent({
  name: 'ReportTitleInputs',
  setup() {
    const store = useMainStore();
    const {info} = storeToRefs(store);

    return {
      info,
    };
  }
});
</script>
