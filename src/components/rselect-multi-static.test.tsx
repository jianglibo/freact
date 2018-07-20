import * as enzyme from 'enzyme';
import * as React from 'react';
import RselectMultiStatic from "./rselect-multi-static";

it('should render rselect', () => {
  const options = [{label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3}];
  const rselect = enzyme.shallow(<RselectMultiStatic staticOptions={options}/>);
  expect(rselect.find('input')).not.toBeNull();
  console.log(rselect.find('input'));
  expect(rselect.find('input').html()).toEqual('<input/>');
});