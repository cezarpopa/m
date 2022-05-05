<template>
    <div class="col-12">
      <div class="form-check d-print-none">
        <input class="form-check-input" type="checkbox" id="core-display" v-model="this.header.display">
        <label class="form-check-label" for="core-display">
          Display section?
        </label>
      </div>
      <div class="row" v-if="this.header.display">
        <div class="col-6">
          <div class="position-relative" id="company-preview">
            <input class="is-hidden stretched-link" type="file" @change="onCompanyImageChange"/>
            <img class="logo" v-if="this.header.companyLogo" :src="this.header.companyLogo" alt="Acme Maintenance Company"/>
          </div>
        </div>
        <div class="col-6">
          <div class="position-relative float-end" id="preview">
            <input class="is-hidden stretched-link" type="file" @change="onClientImageChange"/>
            <img class="logo" v-if="this.header.clientLogo" :src="this.header.clientLogo" alt="Acme Client Company"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useMainStore} from "@/store";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: 'ReportLogos',
  methods: {
    onClientImageChange (e) {
      const file = e.target.files[0];
      this.header.clientLogo = URL.createObjectURL(file);
    },
    onCompanyImageChange (e) {
      const file = e.target.files[0];
      this.header.companyLogo = URL.createObjectURL(file);
    },
  },
  setup() {
    const store = useMainStore();
    const { header } = storeToRefs(store);

    return {
      header,
    };
  }
});
</script>
