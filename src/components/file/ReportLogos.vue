<template>
  <div class="col-12">
    <div class="card shadow-lg rounded-1">
      <div class="card-body">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="header-display" v-model="header.display">
          <label class="form-check-label" for="header-display">
            Display section?
          </label>
        </div>
        <div class="row" v-if="header.display">
          <div class="col-6">
            <div class="position-relative" id="company-preview">
              <input class="is-hidden stretched-link" type="file" @change="onCompanyImageChange"/>
              <img class="logo" v-if="header.companyLogo" :src="header.companyLogo" alt="Acme Maintenance Company"/>
            </div>
          </div>
          <div class="col-6">
            <div class="position-relative float-end" id="preview">
              <input class="is-hidden stretched-link" type="file" @change="onClientImageChange"/>
              <img class="logo" v-if="header.clientLogo" :src="header.clientLogo" alt="Acme Client Company"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useMainStore} from "@/store";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: 'ReportLogos',
  methods: {
    onClientImageChange(e) {
      const file = e.target.files[0];
      this.header.clientLogo = URL.createObjectURL(file);
    },
    onCompanyImageChange(e) {
      const file = e.target.files[0];
      this.header.companyLogo = URL.createObjectURL(file);
    },
  },
  setup() {
    const store = useMainStore();
    const {header} = storeToRefs(store);

    return {
      header,
    };
  }
});
</script>
