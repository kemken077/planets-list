import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import LoadingMessage from '../LoadingMessage.vue';

describe('Loading message', () => {
  it('renders propery', () => {
    const testMessage = 'Loading...';
    const wrapper = mount(LoadingMessage, {props: { message: testMessage }});
    expect(wrapper.text()).toContain(testMessage);
  });
});