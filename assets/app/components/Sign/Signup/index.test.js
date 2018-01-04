import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '.';

describe('Signup', () => {
  it('shoud exists', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.exists()).toBe(true);
  });
});
