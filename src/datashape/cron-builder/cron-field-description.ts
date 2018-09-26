export default class CronFieldDescription {
  public name: string
  public iname: string
  public uname: string
  public mandatory: boolean
  public allowedValues: string
  public allowedSpecialCharacters: string
  public examples: string[]
  public onFieldFocusChanged: (idx: number) => void
  public onFieldValueChanged: (idx: number, value: string) => void
  public onFieldBlur: (idx: number, value: string) => void
  public onFieldExplained: (err: boolean, idx: number) => void
  public currentCronValue: string[]
  public idx: number
  public allTemplate: string
  public specifiedTemplate: string
}
