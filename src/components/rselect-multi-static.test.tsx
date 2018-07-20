import * as enzyme from "enzyme";
import * as React from "react";
import RselectMultiStatic from "./rselect-multi-static";

it("should render multi joined rselect", () => {
  const options = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 }
  ];
  const rselect: Cheerio = enzyme.render(
    <RselectMultiStatic
      staticOptions={options}
      fieldName="my-number"
      joinValues={true}
      initSelected={[1, 2]}
    />
  );
  const ipt = rselect.find('input[name="my-number"]');
  expect(ipt.length).toEqual(1);
  expect(ipt.attr('value')).toEqual('1,2');

});

it("should render multi unjoined rselect", () => {
  const options = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 }
  ];
  const rselect: Cheerio = enzyme.render(
    <RselectMultiStatic
      staticOptions={options}
      fieldName="my-number"
      // joinValues={true}
      initSelected={[1, 2]}
    />
  );
  const ipt = rselect.find('input[name="my-number"]');
  expect(ipt.length).toEqual(2);
  expect(ipt.first().attr('value')).toEqual('1');
  expect(ipt.slice(1,2).attr('value')).toEqual('2');

});