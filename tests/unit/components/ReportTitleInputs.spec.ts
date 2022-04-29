import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ReportTitleInputs from '@/components/input/ReportTitleInputs.vue'
import { useMainStore } from '@/store'

createTestingPinia({
  createSpy: jest.fn(),
})

const wrapper = mount(ReportTitleInputs, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useMainStore();

const inputValue = (valueSelector) => {
  const inputField: HTMLInputElement = wrapper.find(valueSelector).element as HTMLInputElement
  return inputField.value
}


describe('ReportTitleInputs.vue', () => {
  it('Test Store Defaults', () => {
    store.updateTitleState('title', 'Reset');

    expect(store.updateTitleState).toHaveBeenCalledTimes(1)
  })

  it('Matches Title', () => {
    expect(inputValue('.title')).toMatch('Maintenance Report');
  })

  it('Matches Date', () => {
    const date = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    expect(inputValue('.date')).toMatch(date);
  })

})
