import * as enzyme from 'enzyme';
import * as React from 'react';
import ActionMenuDescription, { ActiveWhen } from '../datashape/action-menu-description';
import ActionMenu from './action-menu';

it('always ative menu.', () => {
  const fn = (md: ActionMenuDescription, e : React.SyntheticEvent) => {console.log(e)};
  const am = new ActionMenuDescription('create');
  const hello = enzyme.shallow(<ActionMenu baseUrl="/app" menuDescription={am} selectedItems={[{id: 55}]} actionBtnClicked={fn} currentUrl={"http://www.a.com"}/>);
  expect(hello.find("button").hasClass("pure-button-disabled")).toBeFalsy();
  expect(hello.find("a").text()).toEqual("新建");
});

it('function active menu always true.', () => {
  const fn = (md: ActionMenuDescription, e : React.SyntheticEvent) => {console.log(e)};
  const am = new ActionMenuDescription('create');
  am.activeOn = ((): boolean =>true);
  const hello = enzyme.shallow(<ActionMenu baseUrl="/app" menuDescription={am} selectedItems={[{id: 55}]} actionBtnClicked={fn} currentUrl={"http://www.1.com"} />);
  expect(hello.find("button").hasClass("pure-button-disabled")).toBeFalsy();
  expect(hello.find("a").text()).toEqual("新建");
});

it('function active menu conditional.', () => {
  const fn = (md: ActionMenuDescription, e : React.SyntheticEvent) => {console.log(e)};
  const am = new ActionMenuDescription('create');
  am.activeOn = function(this: ActionMenu): boolean {
    console.log(this.urlParametesMap);
    return !!this.urlParametesMap.abc;
  };
  let hello = enzyme.shallow(<ActionMenu baseUrl="/app" menuDescription={am} selectedItems={[{id: 55}]} actionBtnClicked={fn} currentUrl={"http://www.1.com?abc=abc"} />);
  expect(hello.find("button").hasClass("pure-button-disabled")).toBeFalsy();
  expect(hello.find("a").text()).toEqual("新建");

  am.activeOn = function(this: ActionMenu): boolean {
    return !!this.urlParametesMap.abc;
  };
  hello = enzyme.shallow(<ActionMenu baseUrl="/app" menuDescription={am} selectedItems={[{id: 55}]} actionBtnClicked={fn} currentUrl={"http://www.1.com?abcd=abc"}/>);
  expect(hello.find("button").hasClass("pure-button-disabled")).toBeTruthy();
  expect(hello.find("a").text()).toEqual("新建");
});

it('enum is string', () => {
  const v = ActiveWhen.ALWAYS;
  const to = typeof v;
  expect(to).toEqual('string');
  const f = typeof (():void => {console.log("abc")});
  expect(f).toEqual('function');
});