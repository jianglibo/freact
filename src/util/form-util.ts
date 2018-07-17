import * as jQuery from "jquery";

function createFormInternal(
  formAttr: { action: string; method?: "POST" | "PUT" | "DELETE" },
  fields: { [key: string]: string | number | string[] | number[] },
  separator = ","
): JQuery<HTMLElement> {
  const md = formAttr.method ? formAttr.method : 'POST';
  formAttr.method = 'POST';
  const form = jQuery("<form/>", formAttr);
  if (!fields) {
    fields = {};
  }
  fields._method = md;
  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      let element = fields[key];
      if (Array.isArray(element)) {
        element = element.join(separator);
      }
      const o = { type: "hidden", name: key, value: element };
      const field = jQuery("<input/>", o);
      form.append(field);
    }
  }
  return form;
}

export let formUtil = {
  createForm: createFormInternal,
  createFormSubmit: (
    formAttr: { action: string; method: "POST" | "PUT" | "DELETE" },
    fields: { [key: string]: string | number | string[] | number[] },
    separator = ","
  ) => {
    createFormInternal(formAttr, fields, separator)
      .appendTo("body")
      .submit();
  }
};
