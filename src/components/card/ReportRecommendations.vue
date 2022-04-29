<template>
    <div class="col-12 my-4">
      <h2>Report Status</h2>
        <h2 class="fw-bold mt-2 text-danger">Urgent {{ itemState.urgent }}</h2>
        <h2 class="fw-bold mt-2 text-warning">Recommended {{ itemState.recommended }}</h2>
        <h2 class="fw-bold mt-2 text-success">Completed {{ itemState.completed }}</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ReportRecommendations',
  setup() {
    const store = useMainStore();
    const { itemState } = storeToRefs(store)

    return {
      itemState,
    }
  },
})
</script>
