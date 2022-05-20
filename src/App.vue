<template>
  <div class="container">
    <div class="row">
      <ReportLogos/>
      <ReportTitleInputs/>
      <ReportRecommendations/>
      <PluginUpdates/>
      <CoreUpdates/>
      <HealthChecks/>

      <button class="btn btn-outline-primary" @click="download">Download</button>

      <div class="py-5"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { Document,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun, Header, HeadingLevel,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom, WidthType, BorderStyle, Paragraph, Packer, TextRun }
  from "docx";
import { saveAs } from 'file-saver';
import { useMainStore } from '@/store';
import PluginUpdates from '@/components/PluginUpdates.vue';
import ReportTitleInputs from '@/components/input/ReportTitleInputs.vue';
import ReportLogos from '@/components/file/ReportLogos.vue';
import ReportRecommendations from '@/components/card/ReportRecommendations.vue';
import HealthChecks from '@/components/HealthChecks.vue';
import CoreUpdates from '@/components/CoreUpdates.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'HomeView',
  components: {
    CoreUpdates,
    HealthChecks,
    ReportRecommendations,
    ReportLogos,
    ReportTitleInputs,
    PluginUpdates,
  },
  data () {
    return {
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
      },
      imgTagStyle: {
        'width': '210',
        'height': '80'
      }
    };
  },
  methods: {
    download: function () {
      const holder = document.createElement('div');

      const doc = new Document({
        styles: {
          default: {
            heading1: {
              run: {
                size: 32,
                bold: true,
                color: "000000",
              },
              paragraph: {
                spacing: {
                  after: 120,
                },
              },
            },
            heading2: {
              run: {
                size: 28,
                bold: true,
                underline: {
                  color: "000000",
                },
              },
              paragraph: {
                spacing: {
                  before: 240,
                  after: 120,
                },
              },
            },
            listParagraph: {
              run: {
                color: "#FF0000",
              },
            },
          },
        },
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: this.header.companyLogo,
                  transformation: {
                    width: 210,
                    height: 80,
                  },
                  floating: {
                    horizontalPosition: {
                      offset: 1014400,
                    },
                    verticalPosition: {
                      offset: 1014400,
                    },
                  },
                }),
              ],
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: this.header.clientLogo,
                  transformation: {
                    width: 210,
                    height: 80,
                  },
                  floating: {
                    horizontalPosition: {
                      offset: 4614400,
                    },
                    verticalPosition: {
                      offset: 1014400,
                    },
                  },
                }),
              ],
            }),
            new Paragraph({
              text: this.info.title,
              heading: HeadingLevel.TITLE,
              spacing: {
                before: 200,
              },
            }),
            new Paragraph({
              text: this.info.date,
              heading: HeadingLevel.HEADING_1,
              spacing: {
                before: 200,
              },
            }),
            new Paragraph({
              text: this.pluginsUpdates.title,
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: true,
            }),
            new Paragraph({
              text: this.pluginsUpdates.description,
            }),
            ...this.pluginsList
                .map((plugin) => {
                  const arr: Paragraph[] = [];

                  arr.push(this.itemisePlugin(plugin));

                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),
            new Paragraph({
              text: this.core.title,
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: true,
            }),
            new Paragraph({
              text: this.core.description,
            }),
            new Paragraph({
              text: this.healthChecks.title,
              heading: HeadingLevel.HEADING_1,
              pageBreakBefore: true,
            }),
            new Paragraph({
              text: this.healthChecks.description,
            }),
          ],
        }],
      });

      Packer.toBlob(doc).then((buffer) => {
        saveAs(buffer, "detailed_report.docx");
      });
    },
    itemisePlugin: function (plugin) {
      return new Paragraph({
        text: plugin.name + ' - ' + plugin.short_description,
        bullet: {
          level: 0
        }
      });
    },
  },
  setup () {
    const store = useMainStore();
    const {
      header,
      pluginsUpdates,
      pluginsList,
      info,
      core,
      healthChecks
    } = storeToRefs(store);

    return {
      header,
      info,
      pluginsUpdates,
      pluginsList,
      core,
      healthChecks
    };
  },
});
</script>

