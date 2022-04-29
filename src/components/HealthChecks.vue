<template>
  <div class="col-12">
    <div class="form-check my-3">
      <input class="form-check-input" type="checkbox" id="health-display" v-model="health.display">
      <label class="form-check-label fw-bold" for="health-display">
        {{ health.display ? 'Hide' : 'Show ' }} health check section?
      </label>
    </div>
    <div v-if="health.display">
    <input class="px-0 h2 fw-bold w-100 mb-4" type="text" v-model="health.title">
      <Editor
        api-key="no-api-key"
        v-model="health.description"
        :init="{
           height: 350,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'
import Editor from '@tinymce/tinymce-vue'

export default defineComponent({
  name: 'HealthChecks',
  components: {
    Editor
  },
  setup () {
    const store = useMainStore()
    const { health } = storeToRefs(store)

    return {
      health,
    }
  },
})
</script>
