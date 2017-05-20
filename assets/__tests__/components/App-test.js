import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../../app/components/App';

jest.dontMock('../../app/components/App');

describe('<App />', () => {
  it('should exist', () => {
    expect(shallow(<App />).contains(<h2 id="heading">Hello, World!</h2>)).toBe(true);
  });
});
