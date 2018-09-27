// tslint:disable-next-line:interface-over-type-literal
type t = {[k: string]: Array<{code:string, message: string}>}

export default class AjaxErrorResult {
  constructor(public message: string, public errors: t){};
}
