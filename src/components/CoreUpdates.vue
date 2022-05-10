<template>
  <div class="col-12">
    <div class="card shadow-lg rounded-1">
      <div class="card-body">
        <div class="form-check my-3">
          <input class="form-check-input" type="checkbox" id="core-display" v-model="core.display">
          <label class="form-check-label fw-bold" for="core-display">
            {{ core.display ? 'Hide' : 'Show ' }} core updates section?
          </label>
        </div>
        <div v-if="core.display">
          <label class="form-check-label fw-bold" for="core-title">Section heading</label>
          <input class="px-0 h2 fw-bold w-100 mb-4" type="text" name="core-title" v-model="core.title">
          <Editor
              api-key="no-api-key"
              v-model="core.description"
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
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useMainStore} from '@/store';
import {storeToRefs} from 'pinia';
import Editor from '@tinymce/tinymce-vue';

export default defineComponent({
  name: 'CoreUpdates',
  components: {
    Editor
  },
  setup() {
    const store = useMainStore();
    const {core} = storeToRefs(store);

    return {
      core,
    };
  },
});
</script>
