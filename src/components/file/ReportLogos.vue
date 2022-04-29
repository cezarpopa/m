<template>
    <div class="col-12">
      <div class="form-check d-print-none">
        <input class="form-check-input" type="checkbox" id="core-display" v-model="display">
        <label class="form-check-label" for="core-display">
          Display section?
        </label>
      </div>
      <div class="row" v-if="display">
        <div class="col-6">
          <div class="position-relative" id="company-preview">
            <input class="is-hidden stretched-link" type="file" @change="onCompanyImageChange"/>
            <img class="logo" v-if="companyLogo" :src="companyLogo" alt="Acme Maintenance Company"/>
          </div>
        </div>
        <div class="col-6">
          <div class="position-relative float-end" id="preview">
            <input class="is-hidden stretched-link" type="file" @change="onClientImageChange"/>
            <img class="logo" v-if="clientLogo" :src="clientLogo" alt="Acme Client Company"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const DEFAULT_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAABQAQMAAABWL7nSAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAjUlEQVRIie3PMQrDMAyFYQVMq8FDMR3SIep7eA/kAs79b1U5Sx1KLxD0DzLmsw0WiaLocrXZB2SefLGUxfLXqIdpN+YiLH/sSSFHM7PVdLFVpkSO1tS3G7Vyk5ubDQa9w9VP+MOJhSd7Ye+2Qx6J+WwEugGCn3uV3ephTsMf0BYzmk/I/s4c/x5F0WX6ALDWD8C/qEnqAAAAAElFTkSuQmCC'

export default defineComponent({
  name: 'ReportLogos',
  data () {
    return {
      companyLogo: DEFAULT_IMG,
      clientLogo: DEFAULT_IMG,
      display: true,
    }
  },
  methods: {
    onClientImageChange (e) {
      const file = e.target.files[0]
      this.clientLogo = URL.createObjectURL(file)
    },
    onCompanyImageChange (e) {
      const file = e.target.files[0]
      this.companyLogo = URL.createObjectURL(file)
    },
  },
})
</script>
