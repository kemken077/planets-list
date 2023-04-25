import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import PlanetGrid from '../PlanetsGrid.vue';

describe('Load button', () => {
  it('check for items property', () => {
    const testItems = [];
    const wrapper = mount(PlanetGrid, {props: { items: testItems }});
    expect(wrapper.props('items')).toEqual(testItems);
  });
});

