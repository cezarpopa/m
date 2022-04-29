import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useMainStore } from '@/store'
import ReportRecommendations from '@/components/card/ReportRecommendations.vue'

const wrapper = mount(ReportRecommendations, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useMainStore()

describe('ReportRecommendations.vue', () => {
  it('Test Store Defaults', () => {
    expect(store.itemState).toEqual({ urgent: 0, recommended: 0, completed: 0 })
  })

  it('Matches Urgent', () => {
    const valueSelector = '.action-type.urgent'

    expect(wrapper.find(valueSelector).text()).toMatch('0');
  })

  it('Matches Recommended', () => {
    const valueSelector = '.action-type.recommended'

    expect(wrapper.find(valueSelector).text()).toMatch('0');
  })

  it('Matches Recommended', () => {
    const valueSelector = '.action-type.normal'

    expect(wrapper.find(valueSelector).text()).toMatch('0');
  })
})
