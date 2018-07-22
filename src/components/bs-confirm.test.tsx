import * as enzyme from "enzyme";
import * as React from "react";
import BsConfirm from "./bs-confirm";

it("should render modal", () => {

  const f = (yes: boolean) => {
    console.log(yes);
  };
  
  const rselect: Cheerio = enzyme.render(
    <BsConfirm container="abc" title="atitle" content="acontent" callback={f}/>
  );
  const ipt = rselect.find('.button-warning');
  expect(ipt.length).toEqual(1);
});

