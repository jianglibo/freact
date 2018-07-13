import * as JQuery from "jquery";

export let pureCombo = (wrapCss: string) => {
  if (wrapCss === undefined) {
    wrapCss = ".pure-combo";
  }
  const selections = JQuery(wrapCss).find("select");

  selections.each((idx, sel) => {
    const jsel = JQuery(sel);
    const opts = jsel.find('option');
    if (opts.length === 1) {
      const ipt = jsel.siblings('input');
      const selv = jsel.val();
      if (selv !== undefined) {
        JQuery(ipt).val(selv);
      }
    }
  });

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
