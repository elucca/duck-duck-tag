import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Image from '../../app/components/Image';

Enzyme.configure({ adapter: new Adapter() });

function setup() {

  const component = shallow(<Image/>);
  return {
    component,
    buttons: component.find('button')
  };
}

describe('Image component', () => {

  it('should have a button', () => {
    const { buttons } = setup();
    
    expect(buttons.length>0).toBe(true);
  });

  
});
