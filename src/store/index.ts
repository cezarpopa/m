import { defineStore } from 'pinia'
import IReportState from '@/imports/interfaces/store/IReportState'
import IReportDetails from '@/imports/interfaces/store/IReportDetails'
import IReportInfo from '@/imports/interfaces/store/IReportInfo'
import IEnumPlugins from '@/imports/interfaces/store/IEnumPlugins'
import IPluginsInfo from '@/imports/interfaces/store/IPluginsInfo'
import ICoreInfo from '@/imports/interfaces/store/ICoreInfo'
import IHealthInfo from '@/imports/interfaces/store/IHealthInfo'

const reportStateObject: IReportState = {
  urgent: 0,
  recommended: 0,
  completed: 0,
}

const reportLogosObject: IReportDetails = {
  client: 'Client',
  maintainer: 'Maintainer'
}

const reportInfoObject: IReportInfo = {
  title: 'Maintenance Report',
  date: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
}

const pluginsArray: IEnumPlugins[] = []

const pluginsObject: IPluginsInfo = {
  display: true,
  title: 'WordPress Plugins updated',
  description: 'Description of work done.'
}

const coreObject: ICoreInfo = {
  display: true,
  title: 'WordPress Core Updates',
  description: 'Description of work done.'
}

const healthCheckObject: IHealthInfo = {
  display: true,
  title: 'Health checks',
  description: 'Health checks & advisories'
}

export const useMainStore = defineStore('main', {
  state: () => ({
    reportState: reportStateObject,
    reportLogos: reportLogosObject,
    reportInfo: reportInfoObject,
    pluginsUpdates: pluginsObject,
    pluginsUpdateArray: pluginsArray,
    coreUpdates: coreObject,
    healthChecks: healthCheckObject
  }),
  getters: {
    itemState: state => state.reportState,
    logos: state => state.reportLogos,
    info: state => state.reportInfo,
    plugins: state => state.pluginsUpdates,
    pluginsList: state => state.pluginsUpdateArray,
    core: state => state.coreUpdates,
    health: state => state.healthChecks
  },
  actions: {
    updateReportState(key, value) {
      this.reportState[key] = value
    },
    updateTitleState(key, value) {
      this.reportState[key] = value
    },
  },
})
