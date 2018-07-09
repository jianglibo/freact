import * as JQuery from "jquery";

export let pureCombo = (wrapCss: string) => {
  if (wrapCss === undefined) {
    wrapCss = ".pure-combo";
  }
  const selections = JQuery(wrapCss).find("select");
    selections.on("change", event => {
      const target = JQuery(event.currentTarget);
      const inp = target.siblings("input");
      let selectValue = target.val();
      if (selectValue === undefined) {
        selectValue = "";
      }
      inp.val(selectValue);
    });
};
