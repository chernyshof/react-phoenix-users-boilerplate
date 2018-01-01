import React from 'react';
import { shallow } from 'enzyme';
import Component from '.';

describe('Signup', () => {
  it('shoud exists', () => {
    const wrapper = shallow(<Component />);
    expect(wrapper.exists()).toBe(true);
  });
});
