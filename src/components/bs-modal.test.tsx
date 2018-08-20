import * as enzyme from "enzyme";
import * as React from "react";
import BsModal from "./bs-modal";


it("should render modal, no size class.", () => {
  
  const rselect: Cheerio = enzyme.render(
    <BsModal container="abc" title="atitle" content="acontent"/>
  );
  let ipt = rselect.find('.modal-dialog');
  expect(ipt.length).toEqual(1);
  ipt = rselect.find('.modal-lg');
  expect(ipt.length).toEqual(0);

  ipt = rselect.find('.modal-sm');
  expect(ipt.length).toEqual(0);
});


it("should render modal, with size class.", () => {
  
  let rselect: Cheerio = enzyme.render(
    <BsModal container="abc" title="atitle" content="acontent" size="modal-lg"/>
  );
  let ipt = rselect.find('.modal-lg');
  expect(ipt.length).toEqual(1);

  ipt = rselect.find('.modal-sm');
  expect(ipt.length).toEqual(0);

  rselect = enzyme.render(
    <BsModal container="abc" title="atitle" content="acontent" size="modal-sm"/>
  );
  ipt = rselect.find('.modal-lg');
  expect(ipt.length).toEqual(0);

  ipt = rselect.find('.modal-sm');
  expect(ipt.length).toEqual(1);
});
