import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Analysis from '../../app/components/Analysis';

import dummyJob from '../helpers/dummyjob.json'


Enzyme.configure({ adapter: new Adapter() });



const dummyAnimation = 'processing'

function setup() {

  const component = shallow(<Analysis job={dummyJob} animation={undefined} />);
  const componentWithAnimation = shallow(<Analysis job={dummyJob} animation={dummyAnimation} />);
  return {
    component,
    componentWithAnimation    
  };

}

describe('Analysis component renders', () => {

  it('should have a table', () => {
    const { component } = setup();  
    const tables = component.find('table')

    expect(tables.length>0).toBe(true);
  });

  it('if animation is truthy, returns nothing', () => {
    const { componentWithAnimation } = setup();  
    expect( componentWithAnimation.isEmptyRender() ).toBe(true);
  });
  
});

describe('Analysis component content is correct', () => {
  
  it('should mention IBM and Azure in table headers', () => {
    const { component } = setup();  

    const tableHeaders = component.find('th')
    const numberOfServicesInTable = tableHeaders.reduce((previous,current) =>   dummyJob.services.includes(current.text()) ?  previous.concat(current) : previous  , [] )

    expect(  numberOfServicesInTable.length   ).toBe( 2 );
  });

  it('should return 50% tag similarity for test case',() => {
    const { component } = setup()

    const secondTableRow = component.find('tr').at(1)
    const thirdCell = secondTableRow.find('td').at(2)

    const thirdTableRow = component.find('tr').at(2)
    const secondCell    = thirdTableRow.find('td').at(1)

    expect( secondCell.text() && thirdCell.text()  ).toBe('50.00')
  })
  
})