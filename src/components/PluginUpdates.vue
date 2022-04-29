<template>
  <div class="col-12">
    <div class="position-relative my-3">
      <input class="form-check-input" type="checkbox" id="core-display" v-model="pluginsUpdates.display">
      <label class="form-check-label fw-bold" for="core-display">{{ pluginsUpdates.display ? 'Hide' : 'Show ' }} plugins section?</label>
    </div>
    <div class="row" v-if="pluginsUpdates.display">
      <div class="col-12">
        <input class="px-0 h2 fw-bold w-100" type="text" v-model="pluginsUpdates.title">
        <Editor
          api-key="no-api-key"
          v-model="pluginsUpdates.description"
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
        <div class="row">
          <div class="col-12">
            <div class="position-relative mt-3">
              <label for="plugin-typeahead">Search and select updated plugins</label>
              <input @keydown="searchPlugin(searchTerm)"
                     type="text"
                     v-model="searchTerm"
                     name="plugin-typeahead"
                     placeholder="Type in your plugin name..."
                     class="p-2 mb-1 w-full rounded">
              <ul v-if="plugins.length"
                  class="menu rounded bg-white border p-2 position-absolute d-flex flex-column">
                <li
                  class="list-item cursor-pointer p-1"
                  v-for="plugin in plugins"
                  :key="plugin.name"
                  @click="selectPlugin(plugin)"
                  v-html="plugin.name">
                </li>
              </ul>
            </div>
          </div>


          <div class="col-12">
            <div class="card my-4" v-if="pluginsList.length > 0">
              <div class="card-body">
                <ol>
                  <li class="col-12" v-for="(item, index) in pluginsList" :key="item.slug">
                    <div class="d-flex align-items-center">
                      <img class="me-2" v-if="item.hasOwnProperty('icons')" width="30" height="30"
                           :src="item.icons['2x'] ?? item.icons['1x']" alt="">
                      <strong v-html="item.name"></strong>
                      <span class="ms-2" v-html="item.short_description"></span>

                      <BootstrapIcon
                        @click="removePlugin(index)"
                        class="cursor-pointer float-end  d-print-none"
                        icon="x"
                        variant="danger"
                        title="Remove plugin"
                        size="2x"/>
                    </div>
                  </li>
                </ol>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'
import Editor from '@tinymce/tinymce-vue'
import IEnumPlugins from '@/imports/interfaces/store/IEnumPlugins'

const API_URL = 'https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[search]=:query'

export default defineComponent({
  name: 'PluginUpdates',
  components: {
    Editor
  },
  data () {
    return {
      plugins: [],
      searchTerm: '',
    }
  },
  methods: {
    selectPlugin (pluginName) {
      let plugin: IEnumPlugins = {
        name: pluginName['name'],
        short_description: pluginName.short_description,
        icons: pluginName.icons,
      }
      this.pluginsList.push(plugin)
      this.searchTerm = ''
      this.plugins = []
    },
    removePlugin (index) {
      this.pluginsList.splice(index, 1)
    },
    async searchPlugin (searchTerm) {
      if (searchTerm !== '') {
        const res = await fetch(API_URL.replace(':query', searchTerm))
        const {
          info,
          plugins
        } = await res.json()

        if (info.results > 1) {
          this.plugins = plugins
        }
      }
    },
  },
  setup () {
    const store = useMainStore()
    const {
      pluginsUpdates,
      pluginsList
    } = storeToRefs(store)

    return {
      pluginsUpdates,
      pluginsList
    }
  },
})
</script>
