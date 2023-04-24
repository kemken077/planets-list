import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import LoadButton from '../LoadButton.vue';

describe('Load button', () => {
  it('renders properly', () => {
    const testText = 'test text';
    const wrapper = mount(LoadButton, {props: { text: testText }});
    expect(wrapper.text()).toContain(testText);
  });
});

