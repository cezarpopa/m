<template>
  <div class="container">
    <div class="row">
      <ReportLogos/>
      <ReportTitleInputs/>
      <div class="col-12" ref="reportRecommendations">
        <div class="row">
          <ReportRecommendations/>
        </div>
      </div>
      <PluginUpdates/>
      <CoreUpdates/>
      <HealthChecks/>

      <button @click="download">Download</button>

      <div class="py-5"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import html2pdf from 'html2pdf.js'
import { useMainStore } from '@/store'
import PluginUpdates from '@/components/PluginUpdates.vue'
import ReportTitleInputs from '@/components/input/ReportTitleInputs.vue'
import ReportLogos from '@/components/file/ReportLogos.vue'
import ReportRecommendations from '@/components/card/ReportRecommendations.vue'
import HealthChecks from '@/components/HealthChecks.vue'
import CoreUpdates from '@/components/CoreUpdates.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'HomeView',
  components: {
    CoreUpdates,
    HealthChecks,
    ReportRecommendations,
    ReportLogos,
    ReportTitleInputs,
    PluginUpdates
  },
  data () {
    return {
      pdfMarkup: '',
      h1PrefaceStyle: {
        'font-size': '50px',
        'font-weight': 'bold',
        'margin-top': '100px',
        'margin-bottom': '20px'
      },
      h2PrefaceStyle: {
        'font-size': '44px',
        'font-weight': 'bold',
      },
      h2PageStyle: {
        'font-size': '36px',
        'font-weight': 'bold',
        'margin-bottom': '20px'
      }
    }
  },
  methods: {
    download: function () {
      const holder = document.createElement('div')

      const opt = {
        margin: 1,
        filename: 'maintenance-report.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        pagebreak: {
          mode: 'avoid-all',
          before: '#page-break'
        },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'in',
          format: 'A4',
          orientation: 'portrait'
        }
      }

      holder.append(this.generateElement(this.info.title, 'h1', this.h1PrefaceStyle))
      holder.append(this.generateElement(this.info.date, 'h2', this.h2PrefaceStyle))
      holder.append(this.$refs.reportRecommendations as HTMLElement)

      holder.append(this.pareBreakElement())

      if (this.pluginsUpdates.display) {
        holder.append(this.generateElement(this.pluginsUpdates.title, 'h2', this.h2PageStyle))
        holder.append(this.generateElement(this.pluginsUpdates.description))

        holder.append(this.pareBreakElement())
      }

      if (this.core.display) {
        holder.append(this.generateElement(this.core.title, 'h2', this.h2PageStyle))
        holder.append(this.generateElement(this.core.description))
        holder.append(this.pareBreakElement())
      }

      if (this.healthChecks.display) {
        holder.append(this.generateElement(this.healthChecks.title, 'h2', this.h2PageStyle))
        holder.append(this.generateElement(this.healthChecks.description))
        holder.append(this.pareBreakElement())
      }

      html2pdf().from(holder).set(opt).save()
    },
    generateElement: function (value: string, type = 'div', cssValues = {}) {
      const htmlElement = document.createElement(type)
      htmlElement.innerHTML = value

      if (cssValues !== {}) {
        this.elementCssStyle(htmlElement, cssValues)
      }

      return htmlElement
    },
    pareBreakElement: function () {
      const pagebreak = document.createElement('div')
      pagebreak.id = 'page-break'

      return pagebreak
    },
    elementCssStyle: function (element: HTMLElement, style) {
      for (const property in style) {
        element.style[property] = style[property]
      }
    }
  },
  setup () {
    const store = useMainStore()
    const {
      pluginsUpdates,
      pluginsList,
      info,
      core,
      healthChecks
    } = storeToRefs(store)

    return {
      info,
      pluginsUpdates,
      pluginsList,
      core,
      healthChecks
    }
  },
})
</script>

