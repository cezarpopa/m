import { defineStore } from 'pinia'
import IReportState from '@/imports/interfaces/store/IReportState'
import IReportInfo from '@/imports/interfaces/store/IReportInfo'
import IEnumPlugins from '@/imports/interfaces/store/IEnumPlugins'
import IPluginsInfo from '@/imports/interfaces/store/IPluginsInfo'
import ICoreInfo from '@/imports/interfaces/store/ICoreInfo'
import IHealthInfo from '@/imports/interfaces/store/IHealthInfo'
import IReportHeader from "@/imports/interfaces/store/IReportHeader";

const DEFAULT_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAABQAQMAAABWL7nSAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAjUlEQVRIie3PMQrDMAyFYQVMq8FDMR3SIep7eA/kAs79b1U5Sx1KLxD0DzLmsw0WiaLocrXZB2SefLGUxfLXqIdpN+YiLH/sSSFHM7PVdLFVpkSO1tS3G7Vyk5ubDQa9w9VP+MOJhSd7Ye+2Qx6J+WwEugGCn3uV3ephTsMf0BYzmk/I/s4c/x5F0WX6ALDWD8C/qEnqAAAAAElFTkSuQmCC'

const reportHeaderLogos: IReportHeader = {
  companyLogo: DEFAULT_IMG,
  clientLogo: DEFAULT_IMG,
  display: true,
}

const reportStateObject: IReportState = {
  urgent: 0,
  recommended: 0,
  completed: 0,
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
    reportHeader: reportHeaderLogos,
    reportState: reportStateObject,
    reportInfo: reportInfoObject,
    pluginsUpdates: pluginsObject,
    pluginsUpdateArray: pluginsArray,
    coreUpdates: coreObject,
    healthChecks: healthCheckObject
  }),
  getters: {
    header: state => state.reportHeader,
    itemState: state => state.reportState,
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
