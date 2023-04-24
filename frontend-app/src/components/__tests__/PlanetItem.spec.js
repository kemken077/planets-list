import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import PlanetItem from '../PlanetItem.vue';

describe('PlanetItem', () => {
  it('renders properly', () => {
    const testName = 'Planet test name';
    const wrapper = mount(PlanetItem, {props: { name: testName }});
    expect(wrapper.text()).toContain(testName);
  });
});